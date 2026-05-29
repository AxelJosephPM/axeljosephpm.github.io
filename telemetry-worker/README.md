# Site Telemetry Worker

Cloudflare Worker + D1 backend for the site-wide telemetry widget.

## What it does

- Records an anonymous page view on every page load across the Jekyll site.
- Tracks approximate unique visitors via a client-side UUID stored in `localStorage`.
- Tracks approximate online sessions via a client-side UUID stored in `sessionStorage`.
- Returns aggregate site-wide metrics to the home page widget.

## Privacy model

**Anonymous visitor ids**
A random UUID is generated in the browser with `crypto.randomUUID()` and stored in `localStorage` as `{ id, createdAt }`. It identifies a browser, not a person. No name, email, IP address, or user agent is stored anywhere. The id is regenerated automatically after ~13 months so the database does not accumulate identifiers indefinitely.

**Approximate unique visitors**
The unique-visitor count is the number of distinct anonymous visitor ids seen in the database. Because the same person can use multiple browsers or devices, and because the id expires after 13 months, this count is an approximation. Visitor rows with a `last_seen` timestamp older than ~25 months are deleted during background cleanup.

**Approximate online sessions**
A random UUID is generated in the browser with `crypto.randomUUID()` and stored in `sessionStorage`. It disappears when the tab closes. The worker counts sessions whose `last_seen` is within a 90-second sliding window, giving a coarse real-time approximation of active users. Session rows older than 24 hours are deleted during background cleanup.

**Data retention summary**

| Data | Client storage | Server retention |
|---|---|---|
| Visitor id | localStorage, ~13-month TTL | Deleted server-side after ~25 months of inactivity |
| Session id | sessionStorage, tab lifetime | Deleted server-side after 24 hours |
| Page path | Not stored client-side | Stored in `path_counters` indefinitely (aggregate only) |

No IP addresses, user agents, emails, names, or personal data are collected at any point.

## Prerequisites

- A Cloudflare account (free tier is sufficient).
- Node.js installed locally.

---

## Setup steps

### 1. Install Wrangler

```bash
npm install -g wrangler
# or use npx for every command below
```

### 2. Log in to Cloudflare

```bash
npx wrangler login
```

### 3. Create the D1 database

```bash
npx wrangler d1 create site-telemetry
```

Copy the `database_id` printed in the output. You will need it in step 5.

### 4. Apply the schema

```bash
npx wrangler d1 execute site-telemetry --file=./schema.sql
```

To apply to the remote database:

```bash
npx wrangler d1 execute site-telemetry --file=./schema.sql --remote
```

### 5. Configure the Worker

```bash
cp wrangler.toml.example wrangler.toml
```

Open `wrangler.toml` and replace `PASTE_D1_DATABASE_ID_HERE` with the database
id from step 3.

### 6. Set allowed origins

Open `src/index.js` and update `ALLOWED_ORIGINS` with your actual domains:

```js
const ALLOWED_ORIGINS = [
  'http://localhost:4000',
  'http://127.0.0.1:4000',
  'https://axeljosephpm.github.io',  // your GitHub Pages domain
  'https://your-custom-domain.com',  // your custom domain if configured
];
```

### 7. Deploy the Worker

```bash
npx wrangler deploy
```

Wrangler prints the Worker URL after a successful deploy, for example:

```
https://site-telemetry.your-account.workers.dev
```

### 8. Connect the frontend

Open `assets/js/site-telemetry.js` in the Jekyll repository and replace the
placeholder with your Worker URL:

```js
const TELEMETRY_ENDPOINT = 'https://site-telemetry.your-account.workers.dev';
```

Commit and push to GitHub Pages. The widget on the home page will start
displaying live data on the next page load.

---

## API reference

### POST /pageview

Records a page view.

Request body:

```json
{
  "path": "/current/path/",
  "visitorId": "anonymous-uuid-from-localstorage",
  "sessionId": "anonymous-uuid-from-sessionstorage"
}
```

Response:

```json
{
  "totalViews": 1234,
  "uniqueVisitors": 321,
  "onlineNow": 4
}
```

### GET /telemetry

Returns current global metrics.

Response:

```json
{
  "totalViews": 1234,
  "uniqueVisitors": 321,
  "onlineNow": 4
}
```

---

## Local development

```bash
npx wrangler dev
```

The Worker runs at `http://localhost:8787` by default. Add that origin to
`ALLOWED_ORIGINS` in `src/index.js` during development.

---

## D1 tables

| Table | Purpose |
|---|---|
| `site_counters` | Global key/value counters (`total_views`) |
| `path_counters` | Per-path view counts |
| `unique_visitors` | Anonymous visitor UUIDs with timestamps |
| `online_sessions` | Anonymous session UUIDs with last-seen timestamps |

Sessions older than 90 seconds are excluded from the `onlineNow` count by the
`WHERE last_seen >= now - 90` filter, so stale rows do not affect correctness.

**Built-in background cleanup**

The Worker runs a lightweight cleanup on approximately 1 % of `POST /pageview`
requests via `ctx.waitUntil`, so the cleanup executes after the response is
returned and adds no latency. It deletes:

- `online_sessions` with `last_seen` older than 24 hours.
- `unique_visitors` with `last_seen` older than ~25 months.

No manual cron job or additional configuration is required.
