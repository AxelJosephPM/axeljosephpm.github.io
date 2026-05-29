/**
 * site-telemetry.js
 *
 * GLOBAL TRACKING SCRIPT — loaded on every page of the site.
 *
 * BEHAVIOUR
 * This script runs on every page. On every page load it fires a pageview
 * event to the Cloudflare Worker backend, contributing to the site-wide
 * totals. The visual widget (TOTAL VIEWS / UNIQUE VISITORS / ONLINE NOW)
 * exists only on the home page. On all other pages the script runs silently.
 *
 * PRIVACY MODEL
 * - An anonymous visitor id is generated client-side with crypto.randomUUID()
 *   and stored in localStorage as { id, createdAt }. It identifies a browser,
 *   not a person, and is automatically regenerated after ~13 months.
 * - An anonymous session id is generated client-side with crypto.randomUUID()
 *   and stored in sessionStorage. It expires when the tab closes.
 * - Only the page path, visitor id, session id, and a server-side timestamp
 *   are sent to the backend. No IP address, user agent, or personal data.
 * - Unique visitor counts are approximate and anonymous.
 * - Online session counts are approximate and time-bounded (90-second window).
 * - No secrets or credentials are stored in this file.
 *
 * BACKEND API
 * POST ${TELEMETRY_ENDPOINT}/pageview
 *   Body:     { "path": string, "visitorId": string, "sessionId": string }
 *   Response: { "totalViews": number, "uniqueVisitors": number, "onlineNow": number }
 *
 * GET ${TELEMETRY_ENDPOINT}/telemetry
 *   Response: { "totalViews": number, "uniqueVisitors": number, "onlineNow": number }
 *
 * CONFIGURATION
 * Set TELEMETRY_ENDPOINT to your deployed Cloudflare Worker URL.
 * While the placeholder value is present, no network requests are made and
 * the widget displays "—".
 */

(function () {
  "use strict";

  // ── Configuration ──────────────────────────────────────────────────────────
  //
  // Replace with your deployed Cloudflare Worker URL after running:
  //   npx wrangler deploy
  //
  // Example: 'https://site-telemetry.your-account.workers.dev'
  //
  const TELEMETRY_ENDPOINT = 'https://site-telemetry.axeljosephpm.workers.dev';

  // Guard: no network calls while the placeholder value is present.
  const isConfigured = (
    typeof TELEMETRY_ENDPOINT === 'string' &&
    TELEMETRY_ENDPOINT.length > 0 &&
    !TELEMETRY_ENDPOINT.startsWith('PASTE_')
  );

  // ── Current page path ─────────────────────────────────────────────────────
  //
  // Sent with every pageview so the backend can attribute views to individual
  // pages while summing them into a single global total.
  const pagePath = window.location.pathname;

  // ── Widget elements (home page only) ──────────────────────────────────────
  //
  // These elements exist only in _layouts/inicio.html.
  // On every other page all three will be null and hasWidget will be false.
  const els = {
    totalViews:     document.getElementById('tele-pageviews'),
    uniqueVisitors: document.getElementById('tele-visitors'),
    onlineNow:      document.getElementById('tele-online'),
  };
  const hasWidget = !!(els.totalViews && els.uniqueVisitors && els.onlineNow);

  // ── Anonymous identity ─────────────────────────────────────────────────────

  // Visitor id lifetime: ~13 months in milliseconds.
  // After this period the id is regenerated so browser-level identifiers do
  // not accumulate in the database indefinitely.
  const VISITOR_ID_TTL_MS = 13 * 30 * 24 * 60 * 60 * 1000;

  function getVisitorId() {
    // Stored in localStorage as JSON: { id: string, createdAt: number }.
    // On each call the createdAt age is checked; if it exceeds VISITOR_ID_TTL_MS
    // a fresh id is generated and the stored record is replaced.
    // localStorage may be blocked in private-browsing modes or by permissions
    // policies — the try-catch returns an ephemeral id in that case.
    try {
      const raw = localStorage.getItem('_tele_vid');
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored && stored.id && stored.createdAt) {
          if (Date.now() - stored.createdAt < VISITOR_ID_TTL_MS) {
            return stored.id;
          }
          // Expired — fall through to regenerate.
        }
      }
      const id = crypto.randomUUID();
      localStorage.setItem('_tele_vid', JSON.stringify({ id, createdAt: Date.now() }));
      return id;
    } catch (_) {
      // Not persisted — this visit will not be deduplicated across page loads.
      return crypto.randomUUID();
    }
  }

  function getSessionId() {
    // Stored as a plain string in sessionStorage.
    // Expires naturally when the tab or browser window closes.
    try {
      let id = sessionStorage.getItem('_tele_sid');
      if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem('_tele_sid', id);
      }
      return id;
    } catch (_) {
      return crypto.randomUUID();
    }
  }

  // ── Formatting ────────────────────────────────────────────────────────────

  function formatMetric(value) {
    if (value === null || value === undefined) return '—';
    return new Intl.NumberFormat().format(value);
  }

  // ── Rendering (home page only) ────────────────────────────────────────────

  function render(metrics) {
    if (!hasWidget) return;
    els.totalViews.textContent     = formatMetric(metrics.totalViews);
    els.uniqueVisitors.textContent = formatMetric(metrics.uniqueVisitors);
    els.onlineNow.textContent      = formatMetric(metrics.onlineNow);
  }

  // ── Page-view tracking (every page) ───────────────────────────────────────

  async function sendPageView(visitorId, sessionId) {
    // Fires on every page load across the entire site.
    // keepalive: true ensures the request completes even if the user
    // navigates away immediately after the page loads.
    await fetch(TELEMETRY_ENDPOINT + '/pageview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: pagePath, visitorId, sessionId }),
      keepalive: true,
    });
  }

  // ── Global metrics fetch (home widget only) ────────────────────────────────

  async function fetchGlobalTelemetry() {
    // Returns site-wide aggregate metrics: { totalViews, uniqueVisitors, onlineNow }
    const r = await fetch(TELEMETRY_ENDPOINT + '/telemetry');
    if (!r.ok) throw new Error('Telemetry fetch failed: ' + r.status);
    return r.json();
  }

  // ── Initialisation ────────────────────────────────────────────────────────

  async function init() {
    if (!isConfigured) {
      // Endpoint not configured — widget stays at '—', no network requests.
      return;
    }

    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    // Always fires — counts this page load toward the global total.
    // Failure is silent so a backend error never affects page rendering.
    try {
      await sendPageView(visitorId, sessionId);
    } catch (_) {}

    // Fetch and render metrics only on the home page where the widget exists.
    if (hasWidget) {
      try {
        const metrics = await fetchGlobalTelemetry();
        render(metrics);
      } catch (_) {
        render({ totalViews: null, uniqueVisitors: null, onlineNow: null });
      }
    }
  }

  init();
})();
