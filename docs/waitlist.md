# Waitlist on Cloudflare

The landing page collects an email address, an optional project URL and an
optional X handle. Only confirmed addresses appear in the export. There are no
accounts or payments. `https://world.threetopia.com/` shows the map preview;
the playable world is still in local development.

The creators section above the FAQ shows the number of email-confirmed signups.
`GET /api/creators/count` returns only `{ count }`, with no personal details and
no cached response. Pending and removed signups do not count. The section fetches
the count when it comes into view and refreshes once a minute while visible.
If the count cannot load, it shows a dash instead of a made-up zero.

## Local development

Use Node 22.13+ and `corepack pnpm dev`. The command applies D1 migrations locally
before starting Vite. The Cloudflare Vite plugin runs the Worker and D1 emulator
on the same origin as the site. Local data lives in gitignored `.wrangler/state`.

On localhost, submit the form and follow **Preview confirmation email**. No
external email is sent and no Turnstile widget is needed. The email preview links
to the real confirmation and removal routes, so both can be tested locally.
The local bypass requires both `WAITLIST_LOCAL=true` and a loopback hostname.
The flag is enabled by Vite only during development; production defaults to false.

## Production

The site uses `https://threetopia.com`, with `www.threetopia.com` redirecting to
the canonical origin. The marketing domains are attached to the `threetopia`
Worker; `world.threetopia.com` belongs to the separate `threetopia-world-wip`
Worker. Landing-page deployments must not reattach the world domain. See
[the world deployment notes](connected-world.md#world-domain). Waitlist endpoints
are restricted to the marketing site.
The D1 database is `threetopia-waitlist` in WEUR. Turnstile is managed, limited
to the site's domain, and validates tokens on the server. Confirmation emails
are sent directly through Cloudflare Email Sending as `Threetopia
<hello@threetopia.com>`; no Resend account or API key is needed.

Cloudflare Email Sending is enabled for `threetopia.com`. Its SPF, DKIM, DMARC
and bounce records are managed by Cloudflare. This uses the account's existing
Workers Paid plan. The Worker binding only permits the configured sender.
Local development still uses the preview; the email binding is never configured
as a remote binding locally.

## Deploying again

Run `corepack pnpm build && corepack pnpm exec wrangler deploy` (or
`corepack pnpm deploy`). The Turnstile secret is stored in Cloudflare and is
preserved by later deployments. Apply any new D1 migrations with
`corepack pnpm exec wrangler d1 migrations apply WAITLIST_DB --remote --config wrangler.jsonc`
before deploying code that depends on them.

## Setting up another account or domain

1. Authenticate Wrangler with your Cloudflare account. Create the database:
   `corepack pnpm exec wrangler d1 create threetopia-waitlist`.
2. Copy the returned database ID and your account ID into `wrangler.jsonc`.
   Set `SITE_URL` and the custom domain routes to your canonical HTTPS origin.
   Preview domains cannot accept signups unless separately configured.
3. Create a managed Turnstile widget for that hostname. Put the public key in
   `TURNSTILE_SITE_KEY`; add the private key with
   `corepack pnpm exec wrangler secret put TURNSTILE_SECRET_KEY`.
4. Enable Cloudflare Email Sending for the domain using the dashboard or
   `wrangler email sending enable your-domain.com`. Verify the generated DNS
   records. Set `WAITLIST_FROM` to a plain email address on that domain and
   update `send_email.allowed_sender_addresses`. Sending to arbitrary recipients
   requires Workers Paid. Keep `remote` unset on the email binding so local
   development cannot send real messages.
5. Apply the production migration:
   `corepack pnpm exec wrangler d1 migrations apply WAITLIST_DB --remote --config wrangler.jsonc`.
6. Run `corepack pnpm build`, then `corepack pnpm exec wrangler deploy`. Or use
   `corepack pnpm deploy`, which does both. Vite writes the Worker to
   `dist/threetopia` and static assets to `dist/client`; Wrangler uses the
   generated deployment configuration automatically.
7. Test on the configured domain using your own email: confirm receipt, confirm
   the signup, export the list, then remove the test signup using its email link.

Missing production configuration leaves the form visibly unavailable; it never
claims to have sent an email. Cloudflare's dummy Turnstile keys are rejected in
production. Keys belong in Worker secrets, never in `VITE_*` variables. A
gitignored `.dev.vars` can override local variables for integration fixtures;
see `.dev.vars.example`. Local development works without that file or an account.

The rate limiter namespace in `wrangler.jsonc` should be unique within your
Cloudflare account. The Worker must receive the Cloudflare-provided
`CF-Connecting-IP` header in production. The limit is intentionally approximate;
Turnstile and the database-level email cooldown also protect the form.

## Signup and confirmation

- `GET /api/waitlist/config` exposes only availability and the public site key.
- `POST /api/waitlist` validates the email, project URL and X handle, verifies
  the Turnstile token (including hostname and action), and stores a pending row.
  Project links are stored, not fetched. X accepts a handle, `@handle` or profile URL.
- D1 has one case-insensitive email key. Repeated requests do not create duplicate
  rows or change confirmed details. Pending addresses can request another email
  once per minute, up to five times per 24-hour window. A new email
  replaces the previous confirmation token. Provider failures allow a retry.
- Cloudflare Email Sending receives one confirmation message. Production responses never include
  the token or a preview link, and never reveal whether an email is registered.
- A token has 256 bits of randomness; only its SHA-256 hash is stored. Confirmation
  expires after 24 hours. Opening a link displays a page; an explicit POST confirms
  or removes the signup, so email scanners cannot change its status through GET.
- The removal link in the email deletes the entire row, including project and X
  details. It continues to work after confirmation. No invite campaign or automatic
  bulk sender is included.

## Export confirmed creators

```sh
corepack pnpm waitlist:export                  # local database
corepack pnpm waitlist:export --remote         # production database
corepack pnpm waitlist:export --remote --out .context/first-creators.csv
```

This is an authenticated Wrangler read, not a public API. It exports email,
project URL, X handle and UTC signup/confirmation dates. Tokens and pending rows
are excluded. The default destination is a timestamped CSV inside `.context`.
Files use owner-only permissions, escape spreadsheet formulas and are never
overwritten. Keep exports out of Git and share them only with people handling
creator invitations.

Pending rows are retained until removed; expiration only disables confirmation.
For periodic housekeeping, delete unconfirmed records older than 30 days through
D1 with `DELETE FROM waitlist WHERE confirmed_at IS NULL AND created_at <
(unixepoch() - 30 * 86400) * 1000`. Do not delete confirmed creators through that job.

## Verification

`pnpm test` exercises validation, SQLite constraints, deduplication, confirmation,
removal, expiry, cooldowns, Turnstile verification and email failure recovery.
All provider calls are mocked. `pnpm test:e2e` tests the form, optional fields,
keyboard/mobile use, retry states and confirmation against the local D1 emulator,
alongside the existing hero and world navigation tests. No real mail is sent.

References: [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/get-started/),
[D1 migrations](https://developers.cloudflare.com/d1/reference/migrations/),
[Turnstile server validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/),
[Cloudflare email Workers API](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).
