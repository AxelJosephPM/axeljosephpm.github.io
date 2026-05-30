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
 *
 * DEBUG
 * Append ?telemetry_debug=1 to any page URL to activate the in-page
 * diagnostics panel. Useful on mobile where the browser console is not
 * easily accessible.
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

  // ── Debug mode ─────────────────────────────────────────────────────────────
  //
  // Activated by visiting any page with ?telemetry_debug=1 in the URL.
  // Adds an in-page diagnostics panel and mirrors all events to console.debug.
  //
  const DEBUG_TELEMETRY = (function () {
    try {
      return new URLSearchParams(window.location.search).has('telemetry_debug');
    } catch (_) {
      return false;
    }
  }());

  // ── Current page path ──────────────────────────────────────────────────────
  const pagePath = window.location.pathname;

  // ── Widget elements (home page only) ──────────────────────────────────────
  //
  // These elements exist only in _layouts/inicio.html.
  // On every other page all three will be null and hasWidget will be false.
  //
  const els = {
    totalViews:     document.getElementById('tele-pageviews'),
    uniqueVisitors: document.getElementById('tele-visitors'),
    onlineNow:      document.getElementById('tele-online'),
  };
  const hasWidget = !!(els.totalViews && els.uniqueVisitors && els.onlineNow);

  // ── Debug panel ────────────────────────────────────────────────────────────

  var _panel    = null;
  var _panelBody = null;
  var _rows     = {};

  function createDebugPanel() {
    if (!DEBUG_TELEMETRY) return;

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
      'overflow-x:auto',
      'word-break:break-all',
    ].join(';');

    var hdr = document.createElement('div');
    hdr.textContent = 'TELEMETRY DEBUG';
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

    var body = document.createElement('div');
    panel.appendChild(body);

    // Insert after .home-telemetry-section if present, else append to <body>.
    var anchor = document.querySelector('.home-telemetry-section');
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(panel, anchor.nextSibling);
    } else {
      document.body.appendChild(panel);
    }

    _panel    = panel;
    _panelBody = body;
  }

  function debug(key, value) {
    if (!DEBUG_TELEMETRY) return;

    var text = value === undefined ? ''
      : (value instanceof Error)
        ? 'Error: ' + value.message
        : (typeof value === 'object' && value !== null)
          ? JSON.stringify(value)
          : String(value);

    console.debug('[tele-debug]', key, '→', value);

    if (!_panelBody) return;

    if (_rows[key]) {
      _rows[key].querySelector('[data-val]').textContent = text;
    } else {
      var row = document.createElement('div');
      row.style.cssText = 'display:flex;gap:10px;margin-bottom:2px;align-items:baseline';

      var k = document.createElement('span');
      k.style.cssText = 'color:#555;width:148px;min-width:148px;font-size:10px';
      k.textContent = key;

      var v = document.createElement('span');
      v.setAttribute('data-val', '');
      v.style.cssText = 'color:#e2e2e2;flex:1;white-space:pre-wrap';
      v.textContent = text;

      row.appendChild(k);
      row.appendChild(v);
      _panelBody.appendChild(row);
      _rows[key] = row;
    }
  }

  // ── Anonymous identity ─────────────────────────────────────────────────────

  // Visitor id lifetime: ~13 months in milliseconds.
  var VISITOR_ID_TTL_MS = 13 * 30 * 24 * 60 * 60 * 1000;

  function getVisitorId() {
    // Stored in localStorage as JSON: { id: string, createdAt: number }.
    // Regenerated automatically when the record is older than VISITOR_ID_TTL_MS.
    // Returns an ephemeral in-memory id if localStorage is blocked.
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
      debug('visitorId', ephemeral.slice(0, 8) + '… (ephemeral — localStorage blocked: ' + (err && err.message) + ')');
      return ephemeral;
    }
  }

  function getSessionId() {
    // Stored as a plain string in sessionStorage.
    // Expires naturally when the tab or browser window closes.
    // Returns an ephemeral in-memory id if sessionStorage is blocked.
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
      debug('sessionId', ephemeral.slice(0, 8) + '… (ephemeral — sessionStorage blocked: ' + (err && err.message) + ')');
      return ephemeral;
    }
  }

  function probeStorage(storage, label) {
    try {
      storage.getItem('_tele_probe');
      debug(label, 'available');
    } catch (_) {
      debug(label, 'blocked');
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
    // navigates away immediately. mode/credentials/cache are explicit for
    // cross-origin correctness on mobile browsers.
    debug('POST /pageview', 'pending…');
    var r = await fetch(TELEMETRY_ENDPOINT + '/pageview', {
      method:      'POST',
      mode:        'cors',
      credentials: 'omit',
      cache:       'no-store',
      keepalive:   true,
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({ path: pagePath, visitorId: visitorId, sessionId: sessionId }),
    });
    debug('POST /pageview', r.status + ' ' + r.statusText);
  }

  // ── Global metrics fetch (home widget only) ───────────────────────────────

  async function fetchGlobalTelemetry() {
    // Returns site-wide aggregate metrics: { totalViews, uniqueVisitors, onlineNow }
    // mode/credentials/cache are explicit for cross-origin correctness on mobile.
    debug('GET /telemetry', 'pending…');
    var r = await fetch(TELEMETRY_ENDPOINT + '/telemetry', {
      method:      'GET',
      mode:        'cors',
      credentials: 'omit',
      cache:       'no-store',
    });
    debug('GET /telemetry', r.status + ' ' + r.statusText);
    if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + r.statusText);
    var data = await r.json();
    debug('response', JSON.stringify(data));
    return data;
  }

  // ── Initialisation ────────────────────────────────────────────────────────

  async function init() {
    // Panel is created first so every subsequent debug() call updates it.
    createDebugPanel();

    debug('endpoint', TELEMETRY_ENDPOINT);
    debug('path',     pagePath);
    debug('hasWidget', String(hasWidget));

    if (!isConfigured) {
      debug('status', 'endpoint not configured — no network requests');
      return;
    }

    probeStorage(localStorage,   'localStorage');
    probeStorage(sessionStorage, 'sessionStorage');

    var visitorId = getVisitorId();
    var sessionId = getSessionId();

    // sendPageView is decoupled: its failure (network error or HTTP error)
    // is caught and logged here so the GET /telemetry call always runs.
    await sendPageView(visitorId, sessionId).catch(function (err) {
      debug('POST /pageview', 'ERROR: ' + (err && err.message ? err.message : String(err)));
    });

    // Metric fetch and render runs only on the home page where the widget exists.
    if (!hasWidget) return;

    try {
      var metrics = await fetchGlobalTelemetry();
      render(metrics);
      debug('render', 'success — totalViews=' + metrics.totalViews
        + ' uniqueVisitors=' + metrics.uniqueVisitors
        + ' onlineNow=' + metrics.onlineNow);
    } catch (err) {
      debug('render', 'failed — ' + (err && err.message ? err.message : String(err)));
      render({ totalViews: null, uniqueVisitors: null, onlineNow: null });
    }
  }

  init();
})();
