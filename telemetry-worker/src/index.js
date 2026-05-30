/**
 * Cloudflare Worker — Site Stats Backend
 *
 * Routes
 *   OPTIONS *         CORS preflight
 *   POST /hit         Record a page view; return current global metrics  (primary)
 *   GET  /stats       Return current global metrics                       (primary)
 *   POST /pageview    Alias for POST /hit  (backwards-compatible)
 *   GET  /telemetry   Alias for GET /stats (backwards-compatible)
 *
 * D1 binding: env.DB  (configure in wrangler.toml)
 *
 * Tables (defined in schema.sql):
 *   site_counters   — global key/value counters (e.g. 'total_views')
 *   path_counters   — per-path view counts
 *   unique_visitors — anonymous visitor ids with first/last seen timestamps
 *   online_sessions — anonymous session ids with last_seen timestamps
 *
 * A session is considered "online now" if its last_seen timestamp is within
 * ONLINE_WINDOW_S seconds of the current server time.
 */

// ── Configuration ──────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
  'http://localhost:4000',
  'http://127.0.0.1:4000',
  'https://axeljosephpm.github.io',
  'https://axeljoseph.es',
];

// Sessions with last_seen within this many seconds are counted as "online now".
const ONLINE_WINDOW_S = 90;

// Cleanup thresholds.
// online_sessions rows older than this are stale and can be deleted.
const SESSION_MAX_AGE_S  = 24 * 3600;              // 24 hours
// unique_visitors rows whose last_seen is older than this are deleted.
const VISITOR_MAX_AGE_S  = 25 * 30 * 24 * 3600;   // ~25 months

// Probability that any given POST request triggers cleanup.
// At 1 % the cleanup runs roughly once every 100 requests — frequent enough
// to keep the tables bounded, infrequent enough to avoid adding latency on
// most requests. Cleanup always runs via ctx.waitUntil so it does not block
// the response.
const CLEANUP_PROBABILITY = 0.01;

// ── CORS helpers ───────────────────────────────────────────────────────────────

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin':  origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age':       '86400',
  };
}

function jsonResponse(origin, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(origin),
    },
  });
}

// ── D1 helpers ─────────────────────────────────────────────────────────────────

async function incrementCounter(db, key) {
  await db
    .prepare(
      `INSERT INTO site_counters (key, value) VALUES (?, 1)
       ON CONFLICT(key) DO UPDATE SET value = value + 1`
    )
    .bind(key)
    .run();
}

async function incrementPathCounter(db, path) {
  await db
    .prepare(
      `INSERT INTO path_counters (path, views) VALUES (?, 1)
       ON CONFLICT(path) DO UPDATE SET views = views + 1`
    )
    .bind(path)
    .run();
}

async function upsertVisitor(db, visitorId, now) {
  // Inserts on first visit; updates last_seen on subsequent visits.
  await db
    .prepare(
      `INSERT INTO unique_visitors (visitor_id, first_seen, last_seen) VALUES (?, ?, ?)
       ON CONFLICT(visitor_id) DO UPDATE SET last_seen = ?`
    )
    .bind(visitorId, now, now, now)
    .run();
}

async function upsertSession(db, sessionId, visitorId, path, now) {
  // Inserts on first request in the session; updates path and last_seen
  // on subsequent requests, keeping the session "alive" in the window.
  await db
    .prepare(
      `INSERT INTO online_sessions (session_id, visitor_id, path, last_seen)
       VALUES (?, ?, ?, ?)
       ON CONFLICT(session_id) DO UPDATE SET path = ?, last_seen = ?`
    )
    .bind(sessionId, visitorId, path, now, path, now)
    .run();
}

async function getGlobalMetrics(db, now) {
  const [viewsRow, visitorsRow, onlineRow] = await Promise.all([
    db.prepare(`SELECT value FROM site_counters WHERE key = 'total_views'`).first(),
    db.prepare(`SELECT COUNT(*) AS cnt FROM unique_visitors`).first(),
    db
      .prepare(`SELECT COUNT(*) AS cnt FROM online_sessions WHERE last_seen >= ?`)
      .bind(now - ONLINE_WINDOW_S)
      .first(),
  ]);

  return {
    totalViews:     viewsRow     ? viewsRow.value    : 0,
    uniqueVisitors: visitorsRow  ? visitorsRow.cnt   : 0,
    onlineNow:      onlineRow    ? onlineRow.cnt     : 0,
  };
}

// ── Cleanup ────────────────────────────────────────────────────────────────────
//
// Deletes rows that are no longer useful:
//   - online_sessions older than 24 hours (well past the 90-second online window)
//   - unique_visitors whose last_seen is older than ~25 months
//
// Called via ctx.waitUntil so it runs after the response is returned to the
// client and does not add latency to the POST routes.
//
async function runCleanup(db, now) {
  const sessionCutoff = now - SESSION_MAX_AGE_S;
  const visitorCutoff = now - VISITOR_MAX_AGE_S;

  await Promise.allSettled([
    db.prepare(`DELETE FROM online_sessions WHERE last_seen < ?`).bind(sessionCutoff).run(),
    db.prepare(`DELETE FROM unique_visitors  WHERE last_seen < ?`).bind(visitorCutoff).run(),
  ]);
}

// ── Normalise path ─────────────────────────────────────────────────────────────
//
// Strips query strings and fragments, enforces a leading slash, and collapses
// multiple leading slashes. This keeps path_counters consistent regardless of
// how the browser sends the path.
//
function normalizePath(raw) {
  const stripped = raw
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+/g, '/');
  return stripped.startsWith('/') ? stripped : '/' + stripped;
}

// ── Route handlers ─────────────────────────────────────────────────────────────

async function handleHit(request, env, origin, ctx) {
  let body;
  try {
    body = await request.json();
  } catch (_) {
    return jsonResponse(origin, { error: 'Invalid JSON body' }, 400);
  }

  const { path, visitorId, sessionId } = body;

  if (!path || typeof path !== 'string') {
    return jsonResponse(origin, { error: '"path" is required and must be a string' }, 400);
  }
  if (!visitorId || typeof visitorId !== 'string') {
    return jsonResponse(origin, { error: '"visitorId" is required and must be a string' }, 400);
  }
  if (!sessionId || typeof sessionId !== 'string') {
    return jsonResponse(origin, { error: '"sessionId" is required and must be a string' }, 400);
  }

  const cleanPath = normalizePath(path);
  const now       = Math.floor(Date.now() / 1000);
  const db        = env.DB;

  // Run all writes concurrently — D1 handles the serialisation.
  await Promise.all([
    incrementCounter(db, 'total_views'),
    incrementPathCounter(db, cleanPath),
    upsertVisitor(db, visitorId, now),
    upsertSession(db, sessionId, visitorId, cleanPath, now),
  ]);

  // Schedule lightweight cleanup on ~1 % of requests.
  // ctx.waitUntil runs the promise after the response is returned so cleanup
  // never adds latency to the client-facing POST.
  if (Math.random() < CLEANUP_PROBABILITY) {
    ctx.waitUntil(runCleanup(db, now));
  }

  const metrics = await getGlobalMetrics(db, now);
  return jsonResponse(origin, metrics);
}

async function handleGetStats(env, origin) {
  const now     = Math.floor(Date.now() / 1000);
  const metrics = await getGlobalMetrics(env.DB, now);
  return jsonResponse(origin, metrics);
}

// ── Main fetch handler ─────────────────────────────────────────────────────────

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const method = request.method.toUpperCase();
    const url    = new URL(request.url);

    // CORS preflight — respond to any origin but only grant headers to allowed ones.
    if (method === 'OPTIONS') {
      if (ALLOWED_ORIGINS.includes(origin)) {
        return new Response(null, { status: 204, headers: corsHeaders(origin) });
      }
      return new Response(null, { status: 403 });
    }

    // Reject requests from disallowed origins.
    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Primary routes.
    if (method === 'POST' && url.pathname === '/hit') {
      return handleHit(request, env, origin, ctx);
    }

    if (method === 'GET' && url.pathname === '/stats') {
      return handleGetStats(env, origin);
    }

    // Backwards-compatible aliases — kept so any cached or queued requests
    // from the old frontend continue to work during the transition.
    if (method === 'POST' && url.pathname === '/pageview') {
      return handleHit(request, env, origin, ctx);
    }

    if (method === 'GET' && url.pathname === '/telemetry') {
      return handleGetStats(env, origin);
    }

    return jsonResponse(origin, { error: 'Not found' }, 404);
  },
};
