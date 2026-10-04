-- The outbox is changed in the same transaction as the tile/package mutation.
-- A failed job keeps the last successful picture. No page visit runs WebGL.
CREATE TABLE tile_thumbnails(
  tile_id TEXT NOT NULL REFERENCES tiles(id) ON DELETE CASCADE,
  audience TEXT NOT NULL CHECK(audience IN ('public','owner')),
  generation INTEGER NOT NULL DEFAULT 1,
  rendered_generation INTEGER NOT NULL DEFAULT 0,
  renderer_revision TEXT NOT NULL DEFAULT '',
  object_key TEXT,
  etag TEXT,
  bytes INTEGER,
  rendered_at INTEGER,
  state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','queued','rendering','ready','failed')),
  attempts INTEGER NOT NULL DEFAULT 0,
  retry_at INTEGER NOT NULL DEFAULT 0,
  queued_until INTEGER NOT NULL DEFAULT 0,
  lease_token TEXT,
  lease_until INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  PRIMARY KEY(tile_id,audience)
);
CREATE INDEX tile_thumbnails_pending ON tile_thumbnails(retry_at,queued_until,lease_until);
INSERT INTO tile_thumbnails(tile_id,audience) SELECT id,'public' FROM tiles;
INSERT INTO tile_thumbnails(tile_id,audience) SELECT id,'owner' FROM tiles;

CREATE TRIGGER thumbnail_tile_insert AFTER INSERT ON tiles BEGIN
  INSERT INTO tile_thumbnails(tile_id,audience) VALUES(NEW.id,'public'),(NEW.id,'owner');
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0 WHERE tile_id!=NEW.id AND tile_id IN
    (SELECT t.id FROM tiles t WHERE MAX(ABS(t.q-NEW.q),ABS(t.r-NEW.r),ABS(t.q+t.r-NEW.q-NEW.r))<=2);
END;
CREATE TRIGGER thumbnail_tile_update AFTER UPDATE OF q,r,variant,contract ON tiles
WHEN OLD.q!=NEW.q OR OLD.r!=NEW.r OR OLD.variant!=NEW.variant OR OLD.contract!=NEW.contract BEGIN
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0 WHERE tile_id IN
    (SELECT t.id FROM tiles t WHERE MAX(ABS(t.q-NEW.q),ABS(t.r-NEW.r),ABS(t.q+t.r-NEW.q-NEW.r))<=2 OR MAX(ABS(t.q-OLD.q),ABS(t.r-OLD.r),ABS(t.q+t.r-OLD.q-OLD.r))<=2);
END;
CREATE TRIGGER thumbnail_tile_delete AFTER DELETE ON tiles BEGIN
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0 WHERE tile_id IN
    (SELECT t.id FROM tiles t WHERE MAX(ABS(t.q-OLD.q),ABS(t.r-OLD.r),ABS(t.q+t.r-OLD.q-OLD.r))<=2);
END;
CREATE TRIGGER thumbnail_package_insert AFTER INSERT ON packages WHEN NEW.tile_id IS NOT NULL BEGIN
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0 WHERE tile_id=NEW.tile_id AND audience='owner';
END;
CREATE TRIGGER thumbnail_package_delete AFTER DELETE ON packages WHEN OLD.tile_id IS NOT NULL BEGIN
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0 WHERE tile_id=OLD.tile_id AND audience='owner';
END;
CREATE TRIGGER thumbnail_package_tile AFTER UPDATE OF tile_id ON packages WHEN OLD.tile_id IS NOT NEW.tile_id BEGIN
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0 WHERE tile_id IN (OLD.tile_id,NEW.tile_id);
END;
CREATE TRIGGER thumbnail_version_insert AFTER INSERT ON versions WHEN NEW.state IN ('ready','published') BEGIN
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0
  WHERE tile_id IN (SELECT t.id FROM tiles t JOIN packages p ON p.id=NEW.package_id JOIN tiles changed ON changed.id=p.tile_id
    WHERE (t.id=changed.id AND tile_thumbnails.audience='owner')
       OR (NEW.state='published' AND MAX(ABS(t.q-changed.q),ABS(t.r-changed.r),ABS(t.q+t.r-changed.q-changed.r))<=2));
END;
CREATE TRIGGER thumbnail_version_update AFTER UPDATE OF state,manifest ON versions
WHEN (NEW.state IN ('ready','published') OR OLD.state IN ('ready','published'))
 AND (OLD.state!=NEW.state OR OLD.manifest!=NEW.manifest) BEGIN
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0
  WHERE tile_id IN (SELECT t.id FROM tiles t JOIN packages p ON p.id=NEW.package_id JOIN tiles changed ON changed.id=p.tile_id
    WHERE (t.id=changed.id AND tile_thumbnails.audience='owner')
       OR ((NEW.state='published' OR OLD.state='published') AND MAX(ABS(t.q-changed.q),ABS(t.r-changed.r),ABS(t.q+t.r-changed.q-changed.r))<=2));
END;
CREATE TRIGGER thumbnail_version_delete BEFORE DELETE ON versions WHEN OLD.state IN ('ready','published') BEGIN
  UPDATE tile_thumbnails SET generation=generation+1,state='pending',attempts=0,retry_at=0,queued_until=0
  WHERE tile_id IN (SELECT t.id FROM tiles t JOIN packages p ON p.id=OLD.package_id JOIN tiles changed ON changed.id=p.tile_id
    WHERE (t.id=changed.id AND tile_thumbnails.audience='owner')
       OR (OLD.state='published' AND MAX(ABS(t.q-changed.q),ABS(t.r-changed.r),ABS(t.q+t.r-changed.q-changed.r))<=2));
END;
