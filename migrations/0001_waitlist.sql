CREATE TABLE waitlist (
  email TEXT PRIMARY KEY COLLATE NOCASE,
  project_url TEXT,
  x_handle TEXT,
  created_at INTEGER NOT NULL,
  confirmed_at INTEGER,
  token_hash TEXT NOT NULL UNIQUE,
  token_expires_at INTEGER NOT NULL,
  last_sent_at INTEGER NOT NULL,
  send_window_at INTEGER NOT NULL,
  send_count INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX waitlist_confirmed_at ON waitlist (confirmed_at);
