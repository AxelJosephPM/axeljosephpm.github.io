/**
 * site-stats.js
 *
 * GLOBAL TRACKING SCRIPT — loaded on every page of the site.
 *
 * BEHAVIOUR
 * Fires on every page load. Records a hit to the Cloudflare Worker backend.
 * The visual widget (TOTAL VIEWS / UNIQUE VISITORS / ONLINE NOW) exists only
 * on the home page. On all other pages the script runs silently.
 *
 * The hit POST and the stats GET are fully independent — neither blocks the
 * other. Timeouts (AbortController) guard every request so a hanging mobile
 * connection cannot block the widget indefinitely.
 *
 * PRIVACY MODEL
 * - Anonymous visitor id: crypto.randomUUID() stored in localStorage as
 *   { id, createdAt }. Regenerated after ~13 months. Identifies a browser,
 *   not a person. No IP, UA, email, or name is collected.
 * - Anonymous session id: crypto.randomUUID() stored in sessionStorage.
 *   Expires when the tab closes.
 *
 * BACKEND API
 * POST ${STATS_ENDPOINT}/hit
 *   Body:     { "path": string, "visitorId": string, "sessionId": string }
 *   Response: { "totalViews": number, "uniqueVisitors": number, "onlineNow": number }
 *
 * GET ${STATS_ENDPOINT}/stats
 *   Response: { "totalViews": number, "uniqueVisitors": number, "onlineNow": number }
 *
 * GET ${STATS_ENDPOINT}/health   (open CORS, no D1 — liveness probe)
 *   Response: { "ok": true, "service": "site-stats", "time": number }
 *
 * DEBUG
 * Append ?stats_debug=1 or ?telemetry_debug=1 to any URL to show the
 * in-page diagnostics panel. Useful on mobile where the console is hidden.
 */

(function () {
  "use strict";

  // ── Configuration ──────────────────────────────────────────────────────────

  const STATS_ENDPOINT = 'https://site-stats.axeljosephpm.workers.dev';

  const isConfigured = (
    typeof STATS_ENDPOINT === 'string' &&
    STATS_ENDPOINT.length > 0 &&
    !STATS_ENDPOINT.startsWith('PASTE_')
  );

  // ── Debug mode ─────────────────────────────────────────────────────────────

  const DEBUG_STATS = (function () {
    try {
      var p = new URLSearchParams(window.location.search);
      return p.has('stats_debug') || p.has('telemetry_debug');
    } catch (_) { return false; }
  }());

  // ── Page path ──────────────────────────────────────────────────────────────

  const pagePath = window.location.pathname;

  // ── Widget elements (home page only) ──────────────────────────────────────

  const els = {
    totalViews:     document.getElementById('tele-pageviews'),
    uniqueVisitors: document.getElementById('tele-visitors'),
    onlineNow:      document.getElementById('tele-online'),
  };
  const hasWidget = !!(els.totalViews && els.uniqueVisitors && els.onlineNow);

  // ── Debug panel ────────────────────────────────────────────────────────────

  var _panelBody = null;
  var _rows      = {};

  function createDebugPanel() {
    if (!DEBUG_STATS) return;

    var panel = document.createElement('div');
    panel.id = 'tele-debug-panel';
    panel.style.cssText = [
      'font-family:ui-monospace,SFMono-Regular,monospace',
      'font-size:11px',
      'line-height:1.65',
      'background:#0d0d0d',
      'color:#ccc',
      'border:1px solid rgba(255,255,255,0.10)',
      'border-radius:10px',
      'padding:12px 14px',
      'margin-top:18px',
      'max-width:100%',
      'box-sizing:border-box',
      'overflow:visible',
      'word-break:break-word',
    ].join(';');

    var hdr = document.createElement('div');
    hdr.textContent = 'SITE STATS DEBUG';
    hdr.style.cssText = [
      'font-size:10px',
      'letter-spacing:0.2em',
      'text-transform:uppercase',
      'color:#fff',
      'opacity:0.55',
      'margin-bottom:10px',
      'padding-bottom:8px',
      'border-bottom:1px solid rgba(255,255,255,0.08)',
    ].join(';');
    panel.appendChild(hdr);

    // Clickable link to the health endpoint — lets the user tap to test Worker
    // reachability directly from a mobile browser.
    var healthLink = document.createElement('div');
    healthLink.style.cssText = 'margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.08)';
    var a = document.createElement('a');
    a.href = STATS_ENDPOINT + '/health';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = 'Tap to test Worker reachability: /health';
    a.style.cssText = 'color:#5af;font-size:10px;word-break:break-all';
    healthLink.appendChild(a);
    panel.appendChild(healthLink);

    var body = document.createElement('div');
    panel.appendChild(body);

    var anchor = document.querySelector('.home-telemetry-section');
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(panel, anchor.nextSibling);
    } else {
      document.body.appendChild(panel);
    }

    _panelBody = body;
  }

  function debug(key, value) {
    if (!DEBUG_STATS) return;

    var text = value === undefined ? ''
      : (value instanceof Error)  ? 'ERR: ' + value.message
      : (typeof value === 'object' && value !== null) ? JSON.stringify(value)
      : String(value);

    console.debug('[stats-debug]', key, '→', value);

    if (!_panelBody) return;

    if (_rows[key]) {
      _rows[key].querySelector('[data-val]').textContent = text;
    } else {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:10px;margin-bottom:2px;align-items:baseline';

      var k = document.createElement('span');
      k.style.cssText = 'color:#555;width:148px;min-width:148px;font-size:10px;flex-shrink:0';
      k.textContent = key;

      var v = document.createElement('span');
      v.setAttribute('data-val', '');
      v.style.cssText = 'color:#e2e2e2;flex:1;white-space:pre-wrap;overflow-wrap:anywhere;word-break:break-word';
      v.textContent = text;

      row.appendChild(k);
      row.appendChild(v);
      _panelBody.appendChild(row);
      _rows[key] = row;
    }
  }

  // ── Anonymous identity ─────────────────────────────────────────────────────

  var VISITOR_ID_TTL_MS = 13 * 30 * 24 * 60 * 60 * 1000;

  function getVisitorId() {
    try {
      var raw = localStorage.getItem('_tele_vid');
      if (raw) {
        var stored = JSON.parse(raw);
        if (stored && stored.id && stored.createdAt) {
          if (Date.now() - stored.createdAt < VISITOR_ID_TTL_MS) {
            debug('visitorId', stored.id.slice(0, 8) + '… (cached)');
            return stored.id;
          }
          debug('visitorId', 'expired — regenerating');
        }
      }
      var id = crypto.randomUUID();
      localStorage.setItem('_tele_vid', JSON.stringify({ id: id, createdAt: Date.now() }));
      debug('visitorId', id.slice(0, 8) + '… (new)');
      return id;
    } catch (err) {
      var ephemeral = crypto.randomUUID();
      debug('visitorId', ephemeral.slice(0, 8) + '… (ephemeral: ' + (err && err.message) + ')');
      return ephemeral;
    }
  }

  function getSessionId() {
    try {
      var id = sessionStorage.getItem('_tele_sid');
      if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem('_tele_sid', id);
        debug('sessionId', id.slice(0, 8) + '… (new)');
      } else {
        debug('sessionId', id.slice(0, 8) + '… (cached)');
      }
      return id;
    } catch (err) {
      var ephemeral = crypto.randomUUID();
      debug('sessionId', ephemeral.slice(0, 8) + '… (ephemeral: ' + (err && err.message) + ')');
      return ephemeral;
    }
  }

  function probeStorage(storage, label) {
    try { storage.getItem('_tele_probe'); debug(label, 'available'); }
    catch (_) { debug(label, 'blocked'); }
  }

  // ── Formatting ────────────────────────────────────────────────────────────

  function formatMetric(value) {
    if (typeof value !== 'number') return '—';
    return new Intl.NumberFormat().format(value);
  }

  // ── Rendering ────────────────────────────────────────────────────────────

  function render(metrics) {
    if (!hasWidget) return;

    // Validate shape — 0 is a valid count, so use typeof, not truthiness.
    var tv  = typeof metrics.totalViews     === 'number' ? metrics.totalViews     : null;
    var uv  = typeof metrics.uniqueVisitors === 'number' ? metrics.uniqueVisitors : null;
    var on  = typeof metrics.onlineNow      === 'number' ? metrics.onlineNow      : null;

    if (tv === null || uv === null || on === null) {
      debug('render warning', 'unexpected shape: ' + JSON.stringify(metrics));
    }

    els.totalViews.textContent     = formatMetric(tv);
    els.uniqueVisitors.textContent = formatMetric(uv);
    els.onlineNow.textContent      = formatMetric(on);
  }

  // ── Timeout-guarded fetch ─────────────────────────────────────────────────
  //
  // Uses AbortController with a manual then/catch cleanup instead of .finally()
  // for maximum compatibility with older mobile WebViews.
  //
  function fetchWithTimeout(url, options, timeoutMs) {
    if (typeof AbortController === 'undefined') {
      debug('timeout', 'AbortController unavailable — no timeout');
      return fetch(url, options);
    }

    var controller = new AbortController();
    var timer = window.setTimeout(function () {
      controller.abort();
    }, timeoutMs);

    var clearTimer = function () { window.clearTimeout(timer); };

    return fetch(url, Object.assign({}, options, { signal: controller.signal }))
      .then(
        function (r) { clearTimer(); return r; },
        function (e) { clearTimer(); throw e; }
      );
  }

  // ── Health check (debug only) ─────────────────────────────────────────────

  function checkHealth() {
    if (!DEBUG_STATS) return;

    debug('GET /health', 'start…');
    fetchWithTimeout(
      STATS_ENDPOINT + '/health',
      { method: 'GET', mode: 'cors', credentials: 'omit', cache: 'no-store' },
      4000
    )
      .then(function (r) {
        debug('GET /health status', r.status);
        return r.json();
      })
      .then(function (json) {
        debug('GET /health body', JSON.stringify(json));
      })
      .catch(function (err) {
        debug('GET /health error', err && err.name === 'AbortError'
          ? 'timeout after 4000ms'
          : (err && err.message ? err.message : String(err)));
      });
  }

  // ── Stats fetch ───────────────────────────────────────────────────────────

  function fetchAndRenderStats() {
    debug('GET /stats', 'start…');
    fetchWithTimeout(
      STATS_ENDPOINT + '/stats',
      { method: 'GET', mode: 'cors', credentials: 'omit', cache: 'no-store' },
      6000
    )
      .then(function (r) {
        debug('GET /stats status', r.status);
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (json) {
        debug('raw stats JSON', JSON.stringify(json));
        debug('render', 'start');
        render(json);
        debug('render', 'success');
      })
      .catch(function (err) {
        var msg = err && err.name === 'AbortError'
          ? 'timeout after 6000ms'
          : (err && err.message ? err.message : String(err));
        debug('GET /stats error', msg);
        render({ totalViews: null, uniqueVisitors: null, onlineNow: null });
      });
  }

  // ── Hit recording ─────────────────────────────────────────────────────────

  function sendHit(visitorId, sessionId) {
    debug('POST /hit', 'start…');
    fetchWithTimeout(
      STATS_ENDPOINT + '/hit',
      {
        method:      'POST',
        mode:        'cors',
        credentials: 'omit',
        cache:       'no-store',
        // keepalive intentionally omitted — some mobile browsers behave
        // unexpectedly when keepalive is combined with CORS + JSON bodies.
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({ path: pagePath, visitorId: visitorId, sessionId: sessionId }),
      },
      4000
    )
      .then(function (r) {
        debug('POST /hit status', r.status);
      })
      .catch(function (err) {
        debug('POST /hit error', err && err.name === 'AbortError'
          ? 'timeout after 4000ms'
          : (err && err.message ? err.message : String(err)));
      });
  }

  // ── Initialisation ────────────────────────────────────────────────────────

  function init() {
    createDebugPanel();

    debug('script', 'loaded');
    debug('readyState', document.readyState);
    debug('endpoint',  STATS_ENDPOINT);
    debug('path',      pagePath);
    debug('hasWidget', String(hasWidget));

    if (!isConfigured) {
      debug('status', 'endpoint not configured — no network requests');
      return;
    }

    probeStorage(localStorage,   'localStorage');
    probeStorage(sessionStorage, 'sessionStorage');

    var visitorId = getVisitorId();
    var sessionId = getSessionId();

    // Health check runs in debug mode only — independent of all other requests.
    checkHealth();

    // Stats fetch and render — only on home page where the widget exists.
    // Runs independently of the hit POST.
    if (hasWidget) {
      fetchAndRenderStats();
    } else {
      debug('no widget', 'skipping stats fetch');
    }

    // Hit POST — fire and forget, never blocks stats fetch.
    sendHit(visitorId, sessionId);
  }

  init();
})();
