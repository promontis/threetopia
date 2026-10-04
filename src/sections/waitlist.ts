type Turnstile = {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
};
declare global { interface Window { turnstile?: Turnstile } }
type Config = { enabled: boolean; local: boolean; siteKey: string };
class FormError extends Error {}

let script: Promise<void> | undefined;
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!script) script = new Promise<void>((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    tag.async = true;
    const timer = window.setTimeout(() => fail(), 12_000);
    const fail = () => { clearTimeout(timer); tag.remove(); script = undefined; reject(new FormError('The security check couldn’t load. Please try again.')); };
    tag.onload = () => { clearTimeout(timer); window.turnstile ? resolve() : fail(); };
    tag.onerror = fail;
    document.head.append(tag);
  });
  return script;
}

export function mountWaitlist(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('form')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const message = root.querySelector<HTMLElement>('[data-waitlist-message]')!;
  const success = root.querySelector<HTMLElement>('[data-waitlist-success]')!;
  const fields = ['email', 'projectUrl', 'xHandle'] as const;
  const input = (name: string) => form.elements.namedItem(name) as HTMLInputElement;
  let config: Config | undefined;
  let preparing: Promise<void> | undefined;
  let widget: string | undefined;
  let token = '';
  let busy = false;

  function setButton() { button.disabled = busy || (!!config?.enabled && !config.local && !token); }
  function prepare(): Promise<void> {
    if (preparing) return preparing;
    preparing = (async () => {
      const response = await fetch('/api/waitlist/config', { signal: AbortSignal.timeout(12_000) });
      if (!response.ok) throw new FormError('The form couldn’t load. Please try again.');
      config = await response.json() as Config;
      if (!config.enabled) throw new FormError('The waitlist is not open yet. Please try again soon.');
      if (!config.local && !widget) {
        await loadTurnstile();
        widget = window.turnstile!.render(root.querySelector<HTMLElement>('[data-waitlist-challenge]')!, {
          sitekey: config.siteKey, action: 'waitlist', theme: 'light', size: 'flexible',
          'response-field': false,
          callback: (value: string) => { token = value; message.textContent = ''; setButton(); },
          'expired-callback': () => { token = ''; setButton(); },
          'error-callback': () => { token = ''; message.textContent = 'The security check couldn’t finish. Please try again.'; button.disabled = false; },
        });
      }
      setButton();
    })().catch((error: Error) => {
      preparing = undefined;
      button.disabled = false;
      throw error instanceof FormError ? error : new FormError('The form couldn’t load. Please try again.');
    });
    return preparing;
  }
  const warm = () => { void prepare().catch((error: Error) => { message.textContent = error.message; }); };
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); warm(); }
  }, { rootMargin: '150px' });
  observer.observe(root);
  form.addEventListener('focusin', warm, { once: true });

  form.addEventListener('input', event => {
    const field = event.target as HTMLInputElement;
    if (!fields.includes(field.name as typeof fields[number])) return;
    field.removeAttribute('aria-invalid');
    const error = document.getElementById(field.getAttribute('aria-describedby')!);
    if (error) { error.hidden = true; error.textContent = ''; }
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    busy = true;
    button.disabled = true;
    button.textContent = 'Joining…';
    form.setAttribute('aria-busy', 'true');
    message.textContent = '';
    try {
      await prepare();
      if (!config?.local && !token) {
        if (widget) window.turnstile?.reset(widget);
        throw new FormError('Please complete the security check.');
      }
      const response = await fetch('/api/waitlist', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(25_000),
        body: JSON.stringify({ email: input('email').value, projectUrl: input('projectUrl').value, xHandle: input('xHandle').value, company: input('company').value, turnstileToken: token }),
      });
      const result = await response.json() as { message?: string; errors?: Record<string, string>; previewUrl?: string };
      if (!response.ok) {
        for (const name of fields) {
          if (!result.errors?.[name]) continue;
          const field = input(name);
          field.setAttribute('aria-invalid', 'true');
          const error = document.getElementById(field.getAttribute('aria-describedby')!)!;
          error.textContent = result.errors[name]; error.hidden = false;
        }
        form.querySelector<HTMLInputElement>('[aria-invalid="true"]')?.focus();
        throw new FormError(result.message || 'We couldn’t save your signup. Please try again.');
      }
      root.querySelector<HTMLElement>('[data-waitlist-result]')!.textContent = result.message || 'Check your inbox to confirm your email.';
      const preview = root.querySelector<HTMLElement>('[data-waitlist-local]')!;
      preview.hidden = !config?.local || !result.previewUrl;
      if (!preview.hidden && result.previewUrl?.startsWith('/waitlist/preview?token=')) {
        root.querySelector<HTMLAnchorElement>('[data-waitlist-preview]')!.href = result.previewUrl;
      }
      form.hidden = true;
      success.hidden = false;
      success.querySelector<HTMLElement>('h3')!.focus({ preventScroll: true });
    } catch (error) {
      message.textContent = error instanceof FormError
        ? error.message : 'Couldn’t connect. Please try again in a moment.';
    } finally {
      busy = false;
      form.removeAttribute('aria-busy');
      button.innerHTML = 'Join the waitlist <span aria-hidden="true">↗</span>';
      token = '';
      if (widget) window.turnstile?.reset(widget);
      setButton();
      if (!preparing) button.disabled = false;
    }
  });
  root.querySelector('[data-waitlist-back]')!.addEventListener('click', () => {
    success.hidden = true; form.hidden = false;
    message.textContent = '';
    input('email').focus();
  });
}
