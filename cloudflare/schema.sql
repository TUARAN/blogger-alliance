CREATE TABLE IF NOT EXISTS commercial_deals (
  id TEXT PRIMARY KEY,
  brand TEXT NOT NULL,
  service TEXT NOT NULL,
  progress TEXT NOT NULL,
  remark TEXT DEFAULT '',
  category TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  updated_at TEXT DEFAULT '',
  muted INTEGER NOT NULL DEFAULT 0,
  report_cooperation_id TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_commercial_deals_updated_at
  ON commercial_deals(updated_at DESC);

CREATE TABLE IF NOT EXISTS promotion_reports (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  article_title TEXT DEFAULT '',
  project TEXT NOT NULL,
  author TEXT NOT NULL,
  period TEXT DEFAULT '',
  published_at TEXT DEFAULT '',
  cooperation_id TEXT DEFAULT '',
  platforms_json TEXT NOT NULL,
  stats_json TEXT NOT NULL,
  platform_stats_json TEXT NOT NULL,
  author_sections_json TEXT NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_promotion_reports_published_at
  ON promotion_reports(published_at DESC);

CREATE INDEX IF NOT EXISTS idx_promotion_reports_cooperation_id
  ON promotion_reports(cooperation_id);

CREATE TABLE IF NOT EXISTS internal_access_attempts (
  client_key TEXT PRIMARY KEY,
  failure_count INTEGER NOT NULL DEFAULT 0,
  first_failed_at INTEGER NOT NULL DEFAULT 0,
  last_failed_at INTEGER NOT NULL DEFAULT 0,
  locked_until INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_internal_access_attempts_locked_until
  ON internal_access_attempts(locked_until DESC);
