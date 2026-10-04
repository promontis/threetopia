import { mountConnections } from './sections/connections.ts';
import { mountCli } from './sections/cli.ts';
import { mountHeroCredits } from './sections/hero-credits.ts';
import { mountCreators } from './sections/creators.ts';
import { mountWaitlist } from './sections/waitlist.ts';
import { mountPackageTools } from './sections/package-tools.ts';
import type { PortalControls } from './portal/PortalScene.ts';
import { mountSiteAccount } from './shared/site-account';

mountSiteAccount();

function wirePage() {
  const targets = document.querySelectorAll<HTMLElement>('.intro-layout, .connection-heading, .contribution-heading, .cli-heading, .invitation-layout');
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  targets.forEach((el, i) => { el.dataset.reveal = ''; el.style.transitionDelay = `${(i % 4) * 70}ms`; observer.observe(el); });
  const connections = mountConnections(document.querySelector<HTMLElement>('[data-connection-lab]')!);
  const cli = mountCli(document.querySelector<HTMLElement>('#cli')!);
  mountHeroCredits(document.querySelector<HTMLElement>('.hero')!);
  mountPackageTools(document.querySelector<HTMLElement>('[data-package-explorer]')!, document.querySelector<HTMLElement>('[data-package-xray]')!);
  mountCreators(document.querySelector<HTMLElement>('[data-creators]')!);
  mountWaitlist(document.querySelector<HTMLElement>('[data-waitlist]')!);
  const entry = document.querySelector<HTMLAnchorElement>('.hero-entry')!;
  let portal: PortalControls | undefined;
  const setActive=(active:boolean)=>{cli?.setActive(active);connections.setActive(active);portal?.setActive(active);};
  void import('./portal/PortalScene.ts').then(({mountPortal})=>{
    portal=mountPortal(entry);portal?.setActive(!document.hidden);
  }).catch(()=>{entry.dataset.portalState='fallback';});
  entry.addEventListener('click',()=>portal?.approach());
  window.addEventListener('pagehide',()=>setActive(false));
  window.addEventListener('pageshow',()=>setActive(!document.hidden));
  document.addEventListener('visibilitychange',()=>setActive(!document.hidden));
}

wirePage();
