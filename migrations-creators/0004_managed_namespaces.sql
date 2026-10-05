-- Explicit operator grants. Package names and the account that manages them are
-- separate, so a curated namespace can later move without breaking imports.
CREATE TABLE managed_namespaces (
  namespace TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL REFERENCES creators(id),
  reason TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX managed_namespaces_creator ON managed_namespaces(creator_id);
