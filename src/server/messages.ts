export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
}

export function confirmationEmail(origin: string, token: string) {
  const confirm = `${origin}/waitlist/confirm?token=${token}`;
  const remove = `${origin}/waitlist/remove?token=${token}`;
  return {
    subject: 'Confirm your place on the Threetopia waitlist',
    text: `Thanks for joining the first Threetopia creators.\n\nConfirm your email to get an invite when the first shared world is ready:\n${confirm}\n\nThis confirmation link expires in 24 hours.\n\nDidn't sign up? You can ignore this email, or remove this signup: ${remove}`,
    html: `<div style="max-width:480px;margin:40px auto;font:16px/1.7 Arial,sans-serif;color:#292c2e"><p style="font-weight:600">threetopia</p><h1 style="font-size:28px;line-height:1.2;font-weight:500">One more step.</h1><p>Confirm your email to get an invite when the first shared world is ready.</p><p style="margin:28px 0"><a href="${escapeHtml(confirm)}" style="background:#29333a;color:#faf8f4;display:inline-block;padding:12px 20px;border-radius:6px;text-decoration:none">Confirm my email</a></p><p style="font-size:13px;color:#686b6d">This confirmation link expires in 24 hours.</p><p style="font-size:13px;color:#686b6d">Didn’t sign up? Ignore this email or <a href="${escapeHtml(remove)}" style="color:inherit">remove this signup</a>.</p></div>`,
  };
}

export function messagePage(title: string, copy: string, action?: { path: string; token: string; label: string }): Response {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)} — Threetopia</title><link rel="icon" href="/brand-mark.svg"><style>*{box-sizing:border-box}body{margin:0;background:#faf8f4;color:#292c2e;font:16px/1.75 system-ui,sans-serif;min-height:100svh;display:grid;place-items:center;padding:32px}main{width:100%;max-width:470px}a{color:inherit;text-underline-offset:4px}.brand{display:flex;gap:10px;align-items:center;text-decoration:none;font-weight:600;font-size:19px;margin-bottom:64px}.brand img{width:30px;height:30px}h1{font-size:36px;line-height:1.15;font-weight:500;letter-spacing:-1px}p{color:#686b6d}button{font:inherit;border:0;background:#29333a;color:#faf8f4;border-radius:6px;padding:12px 22px;cursor:pointer;margin:12px 0 24px}button:hover{background:#414e56}:focus-visible{outline:2px solid #728f9e;outline-offset:4px}.back{font-size:14px;display:inline-block;margin-top:24px}</style></head><body><main><a class="brand" href="/"><img src="/brand-mark.svg" alt="">threetopia</a><h1>${escapeHtml(title)}</h1><p>${escapeHtml(copy)}</p>${action ? `<form method="post" action="${escapeHtml(action.path)}"><input type="hidden" name="token" value="${escapeHtml(action.token)}"><button type="submit">${escapeHtml(action.label)}</button></form>` : ''}<a class="back" href="/#beta">Back to Threetopia</a></main></body></html>`, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store',
      'Referrer-Policy': 'strict-origin', 'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; img-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
    },
  });
}
