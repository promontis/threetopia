# Registry API

Base URL: `https://creators.threetopia.com/api`. JSON endpoints return `{ "message": "…" }` on error, sometimes with a `details` array. Use the CLI unless you need a direct integration.

## Authentication

Browser authentication uses a host-only, HttpOnly, Secure, SameSite=Lax cookie. Browser mutations require the same Origin. CLI authentication uses `Authorization: Bearer TOKEN`. Never put a token in a URL or package file.

| Method and path | Purpose |
| --- | --- |
| `GET /health` | Registry version and docs |
| `POST /auth/start` | Request code: `{email}`; browser same-origin |
| `POST /auth/verify` | Verify `{challenge,code}` and set session cookie |
| `GET /me` | Current creator or null |
| `PATCH /profile` | `{handle,displayName}`; handle is permanent |
| `POST /auth/logout` | Revoke current credential |
| `POST /auth/device` | Start CLI device flow; empty JSON object |
| `POST /auth/device/poll` | `{deviceCode}`; pending returns 202 |
| `POST /auth/device/approve` | Browser only: `{userCode,approve:true}` |
| `GET /tokens` | List current creator’s CLI credentials |
| `DELETE /tokens/:id` | Revoke own CLI credential |

Device flow returns `deviceCode`, `userCode`, `verificationUri`, `expiresIn`, and `interval`. Poll at that interval; approval returns `accessToken`. The device code is confidential and is not the public user code.

## Tiles

| Method and path | Purpose |
| --- | --- |
| `GET /tiles` | Original worlds, current slots, published/reserved tiles, compatible Wang layouts and rotations |
| `POST /tiles/reserve` | `{q,r,variant}`; returns ID and canonical contract |
| `GET /tiles/:id` | Own reservation and full contract |
| `DELETE /tiles/:id` | Release own unused reservation |

Reservations are atomically unique by coordinate. World creation requires an owned reservation; upload requires its exact canonical contract.

## Packages

| Method and path | Purpose |
| --- | --- |
| `GET /packages?kind=asset&q=beacon` | Public, indexed, paginated package search with facet counts |
| `GET /packages?mine=1` | Authenticated creator’s packages and states |
| `POST /packages` | `{name,kind,title,description,tileId?,category?,tags?}` |
| `GET /packages/:id` | Metadata, versions; own page includes installers |
| `PATCH /packages/:id` | Owner-only listing metadata: `{category?,tags?}`; does not change version manifests |
| `GET /packages/creators?creatorSearch=river` | Public creator filter suggestions; also accepts catalog filters |
| `GET /resolve?name=@creator/name&version=1.0.0` | Public exact version, manifest and file hashes |
| `DELETE /packages/:id` | Delete own unpublished package |

Omit version or use `latest` to resolve the highest published numeric version. Use exact versions in dependency manifests.

## Catalog search and filters

`GET /api/packages` is public. It indexes published names, titles, descriptions, creator handles/display names and listing tags. Search is case-insensitive, accent-insensitive, matches word prefixes, and requires every search word. Punctuation is treated as a separator; FTS operators are not exposed. An input made entirely of punctuation returns no matches.

| Parameter | Values |
| --- | --- |
| `q` | Search text, up to 160 characters / 16 search terms |
| `kind` | `asset`, `world` |
| `category` | `nature`, `architecture`, `props`, `characters`, `vehicles`, `materials`, `effects`, `audio`, `tools`, `environments`, `uncategorized` |
| `creator` | Exact public handle, with or without `@` |
| `license` | Exact license string from a published manifest; use returned facets |
| `tag` | Exact normalized listing tag |
| `sort` | `relevance`, `updated`, `newest`, `popular`, `name` |
| `page` | 1-based page, default 1; out-of-range pages return the last page |
| `perPage` | Results per page, default 24, maximum 60 |

Repeat a filter parameter to select multiple values: `kind=asset&kind=world`. Values within one facet are ORed; facets and the search query are ANDed. At most 10 values are accepted for each filter. Sorting is stable with a package ID tie-breaker. Without `sort`, searches use relevance and browsing uses the most recent published update. `popular` counts distinct creators with active CLI installations, not downloads or project count.

```text
GET /api/packages?q=coastal&kind=asset&category=nature&tag=low%20poly&sort=popular&page=1&perPage=24
```

The response contains `packages`, `total`, `page`, `perPage`, `pages` and `facets`. Each facet entry has `value`, `label` and `count`. Counts respect every active filter **except their own facet**, so alternatives remain available. A selected value with no matches remains present with a zero count. Tag facets return up to 20 choices; other facets return up to 60. Selected choices take priority. Search creators beyond the initial list through `/api/packages/creators?creatorSearch=…`, including the current search/filter parameters; the response is `{creators:[{value,label,count}]}`.

Each result includes `id`, `name`, `kind`, `title`, `description`, `handle`, `display_name`, `category`, `tags` (an array), `license`, `latest_version`, `state`, `installers`, `created_at` and `updated_at`. Catalog timestamps are the first and latest publication times; they do not expose draft activity. The catalog shows the most recently published release. `/resolve?version=latest` resolves the highest semantic version.

Only non-archived packages with a published release are indexed. Draft versions, owner credentials, emails and private installation records never enter the catalog. The authenticated `mine=1` endpoint retains its owner-specific response and does not use the public catalog filters or pagination.

Listing metadata is optional and editable without a new release. `PATCH /api/packages/:id` accepts a category ID from the table above (or `""` to clear it), and an array of up to 10 tags of 1–30 letters, numbers, spaces or hyphens. Do not send `uncategorized` as a saved category; that is a search facet for the empty value. Tags are trimmed, lowercased and deduplicated. Titles, descriptions and licenses remain part of the published manifest.

## Upload lifecycle

1. `POST /packages/:id/versions` with the full [package manifest](/schema/package.json), including file paths, byte lengths and SHA-256 hashes.
2. `PUT /packages/:id/versions/:version/files?path=…` with each file’s raw bytes.
3. `POST /packages/:id/versions/:version/validate` with `{}`. The server measures uploaded geometry; a valid version becomes ready.
4. Review the owner-only preview.
5. `POST /packages/:id/versions/:version/publish` with `{}` to publish.

`GET /packages/:id/versions/:version/files?path=…` serves bytes. Ready and draft files require the owner’s credential. Published files are public and immutable. Uploaded HTML/JavaScript is served as an attachment with a restrictive CSP and is not executed by the site.

`DELETE /packages/:id/versions/:version` removes an unpublished draft. Published versions cannot be changed or deleted.

## Installations

After verifying and writing all files, the CLI calls `POST /packages/:id/install` with `{version,projectId}`. `projectId` is a random project UUID, not its name or path. `DELETE` at the same endpoint with `{projectId}` removes that active installation.

These records describe CLI-reported installations, not arbitrary downloads or proof that a package is actively rendered. Package owners see public creator handles and versions; no private project data.

## Wang tile choices

`GET /tiles` includes `choices` on each available slot. Each choice contains `variant`, `rotation` (0–5) and `legacyEdges`. Send **q, r, variant and rotation** to `POST /tiles/reserve`. The server derives the transition edges itself; do not supply a self-made contract. A 409 means the coordinate or neighborhood changed; fetch `/tiles` again. A 422 means the requested layout/rotation does not fit. New reservations use version 2 contracts; older contracts remain valid.
