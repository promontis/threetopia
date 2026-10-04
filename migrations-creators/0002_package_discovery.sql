-- Public-only catalog projection. Draft uploads must not change public search,
-- ranking, license facets or the displayed version. Rebuilds happen on writes.
ALTER TABLE packages ADD COLUMN category TEXT NOT NULL DEFAULT '';
ALTER TABLE packages ADD COLUMN tags TEXT NOT NULL DEFAULT '[]' CHECK(json_valid(tags) AND json_type(tags)='array');
CREATE INDEX versions_published_catalog ON versions(package_id, published_at DESC, created_at DESC, id DESC) WHERE state='published';

CREATE TABLE package_catalog (
  id TEXT PRIMARY KEY REFERENCES packages(id) ON DELETE CASCADE,
  name TEXT NOT NULL, kind TEXT NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL,
  handle TEXT NOT NULL, display_name TEXT NOT NULL,
  category TEXT NOT NULL, tags TEXT NOT NULL, license TEXT NOT NULL,
  latest_version TEXT NOT NULL, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL,
  installers INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX catalog_kind ON package_catalog(kind);
CREATE INDEX catalog_category ON package_catalog(category);
CREATE INDEX catalog_creator ON package_catalog(handle);
CREATE INDEX catalog_license ON package_catalog(license);
CREATE INDEX catalog_updated ON package_catalog(updated_at DESC, id);
CREATE INDEX catalog_created ON package_catalog(created_at DESC, id);
CREATE INDEX catalog_popular ON package_catalog(installers DESC, updated_at DESC, id);
CREATE INDEX catalog_title ON package_catalog(title COLLATE NOCASE, id);

CREATE TABLE package_catalog_tags (
  package_id TEXT NOT NULL REFERENCES package_catalog(id) ON DELETE CASCADE,
  tag TEXT NOT NULL,
  PRIMARY KEY(package_id, tag)
);
CREATE INDEX catalog_tag ON package_catalog_tags(tag, package_id);

CREATE VIEW package_catalog_source AS
SELECT p.id,p.name,p.kind,
  COALESCE(json_extract(v.manifest,'$.title'),p.title) AS title,
  COALESCE(json_extract(v.manifest,'$.description'),p.description) AS description,
  COALESCE(c.handle,'') AS handle,c.display_name,
  CASE WHEN p.category='' THEN 'uncategorized' ELSE p.category END AS category,
  p.tags,COALESCE(json_extract(v.manifest,'$.license'),'Unspecified') AS license,
  v.version AS latest_version,
  COALESCE((SELECT MIN(published_at) FROM versions WHERE package_id=p.id AND state='published'),v.created_at) AS created_at,
  COALESCE(v.published_at,v.created_at) AS updated_at,
  (SELECT COUNT(DISTINCT creator_id) FROM installations WHERE package_id=p.id AND removed_at IS NULL) AS installers
FROM packages p JOIN creators c ON c.id=p.creator_id
JOIN versions v ON v.id=(SELECT id FROM versions WHERE package_id=p.id AND state='published'
  ORDER BY published_at DESC,created_at DESC,id DESC LIMIT 1)
WHERE p.archived=0;

CREATE VIRTUAL TABLE package_search USING fts5(
  name,title,description,creator,tags,
  tokenize='unicode61 remove_diacritics 2',prefix='2 3 4'
);
CREATE TRIGGER catalog_search_insert AFTER INSERT ON package_catalog BEGIN
  INSERT INTO package_search(rowid,name,title,description,creator,tags)
    VALUES(NEW.rowid,NEW.name,NEW.title,NEW.description,NEW.handle || ' ' || NEW.display_name,NEW.tags);
  INSERT INTO package_catalog_tags(package_id,tag) SELECT NEW.id,value FROM json_each(NEW.tags);
END;
CREATE TRIGGER catalog_search_delete AFTER DELETE ON package_catalog BEGIN
  DELETE FROM package_search WHERE rowid=OLD.rowid;
  DELETE FROM package_catalog_tags WHERE package_id=OLD.id;
END;

CREATE TRIGGER catalog_package_update AFTER UPDATE OF name,kind,category,tags,archived ON packages BEGIN
  DELETE FROM package_catalog WHERE id=NEW.id;
  INSERT INTO package_catalog SELECT * FROM package_catalog_source WHERE id=NEW.id;
END;
CREATE TRIGGER catalog_version_insert AFTER INSERT ON versions WHEN NEW.state='published' BEGIN
  DELETE FROM package_catalog WHERE id=NEW.package_id;
  INSERT INTO package_catalog SELECT * FROM package_catalog_source WHERE id=NEW.package_id;
END;
CREATE TRIGGER catalog_version_update AFTER UPDATE OF state,manifest,published_at ON versions
WHEN NEW.state='published' OR OLD.state='published' BEGIN
  DELETE FROM package_catalog WHERE id=NEW.package_id;
  INSERT INTO package_catalog SELECT * FROM package_catalog_source WHERE id=NEW.package_id;
END;
CREATE TRIGGER catalog_version_delete AFTER DELETE ON versions WHEN OLD.state='published' BEGIN
  DELETE FROM package_catalog WHERE id=OLD.package_id;
  INSERT INTO package_catalog SELECT * FROM package_catalog_source WHERE id=OLD.package_id;
END;
CREATE TRIGGER catalog_creator_update AFTER UPDATE OF handle,display_name ON creators BEGIN
  DELETE FROM package_catalog WHERE id IN (SELECT id FROM packages WHERE creator_id=NEW.id);
  INSERT INTO package_catalog SELECT * FROM package_catalog_source WHERE id IN (SELECT id FROM packages WHERE creator_id=NEW.id);
END;

CREATE TRIGGER catalog_install_insert AFTER INSERT ON installations BEGIN
  UPDATE package_catalog SET installers=(SELECT COUNT(DISTINCT creator_id) FROM installations
    WHERE package_id=NEW.package_id AND removed_at IS NULL) WHERE id=NEW.package_id;
END;
CREATE TRIGGER catalog_install_update AFTER UPDATE ON installations BEGIN
  UPDATE package_catalog SET installers=(SELECT COUNT(DISTINCT creator_id) FROM installations
    WHERE package_id=package_catalog.id AND removed_at IS NULL) WHERE id IN (OLD.package_id,NEW.package_id);
END;
CREATE TRIGGER catalog_install_delete AFTER DELETE ON installations BEGIN
  UPDATE package_catalog SET installers=(SELECT COUNT(DISTINCT creator_id) FROM installations
    WHERE package_id=OLD.package_id AND removed_at IS NULL) WHERE id=OLD.package_id;
END;

-- Backfill existing published packages, with the same indexing path as new ones.
INSERT INTO package_catalog SELECT * FROM package_catalog_source;
