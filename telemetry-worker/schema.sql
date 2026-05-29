-- Site Telemetry — D1 Schema
-- Apply with: npx wrangler d1 execute site-telemetry --file=./schema.sql

-- Global key/value counters (e.g. total_views across the whole site).
CREATE TABLE IF NOT EXISTS site_counters (
  key   TEXT    PRIMARY KEY,
  value INTEGER NOT NULL DEFAULT 0
);

-- Per-path view counts for optional per-page breakdown.
CREATE TABLE IF NOT EXISTS path_counters (
  path  TEXT    PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0
);

-- Anonymous visitor ids.
-- visitor_id is a client-generated UUID stored in localStorage.
-- first_seen and last_seen are Unix timestamps (seconds).
CREATE TABLE IF NOT EXISTS unique_visitors (
  visitor_id TEXT    PRIMARY KEY,
  first_seen INTEGER NOT NULL,
  last_seen  INTEGER NOT NULL
);

-- Anonymous session ids.
-- session_id is a client-generated UUID stored in sessionStorage.
-- It expires when the browser tab closes, so rows here are naturally bounded.
-- last_seen is a Unix timestamp (seconds). Sessions with last_seen older than
-- ONLINE_WINDOW_S (90 s) are excluded from the "online now" count.
CREATE TABLE IF NOT EXISTS online_sessions (
  session_id TEXT    PRIMARY KEY,
  visitor_id TEXT    NOT NULL,
  path       TEXT    NOT NULL,
  last_seen  INTEGER NOT NULL
);

-- Initialise the global view counter so the first SELECT always returns a row.
INSERT OR IGNORE INTO site_counters (key, value) VALUES ('total_views', 0);
