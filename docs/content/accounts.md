# Accounts and CLI authentication

Your creator account is shared by the website and the CLI. Use **Sign in** or **Sign up** in the header on the landing page, Creators or Docs. After signing in, the account menu contains **Profile**, **Settings**, **My packages**, **My tiles** and **Log out**. Sign in at [creators.threetopia.com](https://creators.threetopia.com) using an eight-digit email code. Codes expire after ten minutes and can be used once. There are five verification attempts per code, with delivery rate limits.

Your **display name** can change. Your **handle** cannot: it identifies your package namespace, for example `@river-maker/water-lilies`. Handles contain 3–30 lowercase letters, numbers and hyphens, beginning with a letter.

Your email is private. Your handle and display name are public when you publish a package or install one. Package owners can see which creators currently have their package installed through the CLI, including exact versions and number of installations. They cannot see your email, source code, or private project names.

## Connect a terminal

```sh
threetopia login
threetopia whoami
```

The CLI uses browser approval. Compare the eight-character code in your terminal with the browser page before approving. Browser sessions last seven days; CLI tokens last 90 days.

Credentials are stored in `~/.config/threetopia/credentials.json` with file permissions `0600`. Tokens are keyed by registry origin. Set `THREETOPIA_HOME` to choose a different configuration directory.

```sh
threetopia logout
```

Logout revokes that terminal’s token. You can also revoke connected terminals in **Settings**, opened from the account menu. Signing out of the browser does not revoke other devices.

## Development

A local registry accepts `--registry http://127.0.0.1:55020`. HTTP is accepted only on loopback hosts. Production uses HTTPS. Development sign-in codes are returned only when the server explicitly enables local auth and the request host is loopback; production never returns a code.
