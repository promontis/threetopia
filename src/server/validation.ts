export type Signup = { email: string; projectUrl: string | null; xHandle: string | null };
export type FieldErrors = Partial<Record<keyof Signup, string>>;

export function validateSignup(value: unknown): { data?: Signup; errors: FieldErrors } {
  const body = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const text = (key: string) => typeof body[key] === 'string' ? body[key].trim() : '';
  const email = text('email').toLowerCase();
  const project = text('projectUrl');
  let xHandle = text('xHandle').replace(/^@/, '');
  // Accept a pasted profile as well as a bare handle.
  const profile = xHandle.match(/^https:\/\/(?:www\.)?(?:x|twitter)\.com\/([a-zA-Z0-9_]{1,15})\/?$/i);
  if (profile) xHandle = profile[1];
  const errors: FieldErrors = {};
  if (email.length > 254 || !/^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?\.[a-z]{2,}$/i.test(email)) {
    errors.email = 'Enter a valid email address.';
  }
  let projectUrl: string | null = null;
  if (body.projectUrl != null && typeof body.projectUrl !== 'string') errors.projectUrl = 'Enter a link to your demo, repo or website.';
  if (project) {
    try {
      const url = new URL(project);
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || project.length > 2048) throw new Error();
      projectUrl = url.href;
    } catch { errors.projectUrl = 'Use a full link starting with https:// or http://.'; }
  }
  if ((body.xHandle != null && typeof body.xHandle !== 'string') || (xHandle && !/^[a-zA-Z0-9_]{1,15}$/.test(xHandle))) {
    errors.xHandle = 'Use your X handle, for example @yourname.';
  }
  return { errors, ...(Object.keys(errors).length ? {} : { data: { email, projectUrl, xHandle: xHandle || null } }) };
}

export async function hashToken(token: string): Promise<string> {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
}

export function newToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)), byte => byte.toString(16).padStart(2, '0')).join('');
}
