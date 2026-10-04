import { packages } from './catalog.ts';

/** An SVG maquette keeps the preview lightweight and every package separable. */
export function xrayArtwork() {
  const grass = Array.from({ length: 105 }, (_, i) => {
    const a = ((i * 73) % 240) - 120;
    const b = ((i * 97) % 210) - 70;
    const x = 340 + a - b;
    const y = 330 + (a + b) * .47;
    return `<use href="#xr-grass" transform="translate(${x} ${y}) scale(${.7 + (i % 4) * .12})"/>`;
  }).join('');
  const birds = [[230, 315, 1], [264, 330, .8], [314, 295, 1], [361, 320, .9], [418, 294, .85], [458, 323, 1.1], [295, 355, .7]]
    .map(([x, y, s]) => `<use href="#xr-bird" transform="translate(${x} ${y}) scale(${s})"/>`).join('');
  const art: Record<string, string> = {
    meadow: `<path d="m115 332 156-77 143 65-54 48 19 80Z" fill="#adc198"/><path d="m115 332 245 116v9L115 341Z" fill="#7b946e"/>${grass}`,
    tidewater: `<path d="m301 240 164 72-161 89 42 29 211-121-189-102Z" fill="url(#xr-water)" stroke="#7fa7ac" stroke-width="1"/><g fill="none" stroke="#ecf4ef" opacity=".7"><path d="m360 242 41 18m-68 19 21 10m39 48-29 15m94-46-24 13m-107 56 27-14"/></g>
      <g stroke="#9e967f" stroke-width="1.1"><path d="m334 296 73 35-11 7-73-35Z" fill="#d5c1a1"/><path d="m338 298-10 6m24 1-10 6m24 1-10 6m24 1-10 6m24 1-10 6M327 302v17m70 18v16"/></g>
      <g transform="translate(303 279)"><path d="m-29 0 31 15 29-15-31-15Z" fill="#dfc8a3"/><path d="M-27-30V0L2 14V-16Z" fill="#708d98"/><path d="M2-16V14L28 0V-30Z" fill="#516e7a"/><path d="m-33-29 30-34 37 29-32 20Z" fill="#dad5c5"/><path d="m-3-63 5 49 32-20Z" fill="#a9b8b7"/><path d="m-18-19 10 5v13l-10-5Z" fill="#d1dcbf"/><path d="m10-12 10-5V3l-10 5Z" fill="#314951"/></g>`,
    lagoon: `<g transform="translate(435 302)"><use href="#xr-tree" transform="translate(-60 -5) scale(1.4)"/><use href="#xr-tree" transform="translate(50 32) scale(1.55)"/><path d="M-60-38Q-5 8 50 0M-60-26Q-5 20 50 12" fill="none" stroke="#ae9576" stroke-width="3"/><path d="m-37-20 0 13m21-3v12M7 6v12m21-6v13" stroke="#cfb693" stroke-width="2"/><use href="#xr-treehouse" transform="translate(-60 -35)"/><use href="#xr-treehouse" transform="translate(50 2) scale(1.15)"/></g>`,
    sakura: `<g><use href="#xr-cherry" transform="translate(260 299)"/><use href="#xr-cherry" transform="translate(411 342) scale(1.2)"/><use href="#xr-cherry" transform="translate(466 282) scale(.9)"/>
      <g transform="translate(362 284)"><path d="m-38 8 47 23 32-19-47-23Z" fill="#dec8a8"/><path d="M-25-15V11L5 26 30 11V-17L1-31Z" fill="#dad1b7"/><path d="M5-1V26L30 11V-17Z" fill="#a5a48e"/><path d="M-43-11Q-10-17-2-50 12-26 42-16L5 4Z" fill="#8e6060"/><path d="M-2-50 5 4 42-16Q12-26-2-50Z" fill="#634f55"/><path d="M-10 7v9m24-9v8" stroke="#775b58" stroke-width="6"/></g></g>`,
    punk: `<g transform="translate(400 318)"><use href="#xr-building" transform="translate(-65 0) scale(.9)"/><use href="#xr-building" transform="translate(0 -26) scale(1.25)"/><use href="#xr-building" transform="translate(66 27) scale(.8)"/><path d="m-70 25 69 35 69-35" fill="none" stroke="#b596b7" stroke-width="8"/><path d="m-70 25 69 35 69-35" fill="none" stroke="#f3cbe0" stroke-width="1"/></g>`,
    birds,
  };
  const lifts: Record<string, number> = { meadow: -12, tidewater: -78, lagoon: -85, sakura: -95, punk: -85, birds: -185 };
  const order = ['meadow', 'tidewater', 'lagoon', 'sakura', 'punk', 'birds'];
  const layers = order.map(id => {
    const item = packages.find(item => item.id === id)!;
    return `<g class="xray-layer" data-xray-layer="${id}" style="--layer-color:${item.color};--layer-lift:${lifts[id]}px" hidden>
      <g class="xray-layer-plane"><path d="m106 326 250-126 256 126-256 130Z"/><path class="xray-plane-grid" d="m189 284 250 129m-167-171 253 129m-337-1 255-129m-171 172 257-128"/></g>
      ${art[id]}
      <g class="xray-layer-tag" transform="translate(106 326)"><path d="M0 0h-42"/><circle cx="-42" r="4"/><text x="-53" y="4" text-anchor="end">${id === 'tidewater' ? 'Coast' : id === 'punk' ? 'City' : id === 'sakura' ? 'Garden' : id === 'lagoon' ? 'Village' : id === 'meadow' ? 'Grass' : 'Birds'}</text></g>
    </g>`;
  }).join('');
  return `<svg class="xray-art" viewBox="0 0 720 530" role="img" aria-labelledby="xray-art-title xray-art-description">
    <title id="xray-art-title">Package X-ray of an example location</title>
    <desc id="xray-art-description" data-xray-art-description>A riverbank separated into packages: Tidewater, Meadow grass and Little Birds.</desc>
    <defs>
      <linearGradient id="xr-water" x2="1" y2="1"><stop stop-color="#8daeb8"/><stop offset="1" stop-color="#b1d0cc"/></linearGradient>
      <linearGradient id="xr-earth" x2="0" y2="1"><stop stop-color="#c9c5b6"/><stop offset="1" stop-color="#a6ab9e"/></linearGradient>
      <g id="xr-grass"><path d="M0 0q-2-9-5-10M0 0q1-13 3-15M0 0q4-8 7-8" fill="none" stroke="#667f55" stroke-width="1.25" stroke-linecap="round"/><path d="M1-2q1-6 2-8" fill="none" stroke="#d8dfac" stroke-width="1"/></g>
      <g id="xr-bird"><ellipse cx="3" cy="7" rx="9" ry="3" fill="#50626a" opacity=".12"/><path d="M0 0v7m4-7v7" stroke="#5a6060" stroke-width="1"/><path d="M-10-6Q-5 4 5 0L9-9l-4-5-4 8Z" fill="#eae7d9" stroke="#7d8685" stroke-width=".7"/><path d="m-10-6 12 1-5 4Z" fill="#8f9999"/><circle cx="6" cy="-10" r=".9" fill="#263d47"/><path d="m9-9 5 1-5 1" fill="#a88661"/></g>
      <g id="xr-tree"><ellipse cy="4" rx="23" ry="9" fill="#9da993" opacity=".2"/><path d="M0-52V3" stroke="#897d65" stroke-width="5"/><path d="m0-19-11-20M0-35l14-17" stroke="#897d65" stroke-width="2"/><path d="M-22-53C-46-77-21-101-5-94 15-120 48-86 35-64 52-43 20-32 6-43-8-31-38-31-22-53Z" fill="#8faaa0"/><path d="M7-98C33-105 48-84 35-64 52-43 20-32 6-43 22-59 17-76 7-98Z" fill="#719087"/><path d="M-22-53C-43-74-21-97-5-88" fill="#b1c4ae"/></g>
      <g id="xr-treehouse"><path d="m-25 3 26 15 27-15-27-14Z" fill="#bda37d"/><path d="M-17-19V1L1 12 20 1V-19Z" fill="#d7be92"/><path d="M1-10V12L20 1V-19Z" fill="#b59872"/><path d="m-27-15 27-27 28 27-27 14Z" fill="#918e6e"/><path d="M0-42 1-1 28-15Z" fill="#73795f"/><path d="m-10-11 6 3v8l-6-3Zm18 4 6-3v8l-6 3Z" fill="#5a6d65"/></g>
      <g id="xr-cherry"><path d="M0-30V8m0-17-16-23M0-17l18-22" fill="none" stroke="#947b76" stroke-width="3"/><path d="M-22-32C-47-47-31-73-10-65 8-91 38-70 31-50 56-34 29-10 7-26-10-9-42-16-22-32Z" fill="#d7b9bd"/><path d="M7-74C23-76 37-65 31-50 56-34 29-10 7-26 22-41 18-55 7-74Z" fill="#bc98a5"/><g fill="#eee0d5"><circle cx="-20" cy="-51" r="4"/><circle cx="-3" cy="-59" r="3"/><circle cx="9" cy="-47" r="3"/><circle cx="-8" cy="-32" r="4"/></g></g>
      <g id="xr-building"><path d="M-22-68V2L3 16 28 2V-68L3-80Z" fill="#747484"/><path d="M3-54V16L28 2V-68Z" fill="#555f73"/><path d="m-22-68 25 14 25-14L3-80Z" fill="#9fa3a6"/><path d="m-15-54 9 5m-9 9 9 5m-9 10 9 5M11-51l9-5m-9 19 9-5m-9 20 9-5" stroke="#d1bdd2" stroke-width="3"/><path d="M-26-45v28" stroke="#e4bbd3" stroke-width="5"/><path d="m9-12 14-7" stroke="#a4d2ce" stroke-width="4"/></g>
    </defs>
    <g aria-hidden="true">
      <ellipse cx="362" cy="448" rx="252" ry="52" fill="#93a19d" opacity=".09"/>
      <path d="m90 330 270 137 270-137v20L360 490 90 350Z" fill="url(#xr-earth)"/>
      <path d="M360 467v23l270-140v-20Z" fill="#98a398"/>
      <path d="m90 330 270-141 270 141-270 137Z" fill="#dae0d5" stroke="#bec9c0"/>
      <path d="m150 330 210-109 210 109-210 107Z" fill="none" stroke="#b4c1b6" stroke-dasharray="3 5"/>
      <path d="M360 490v10m-7-4 7 4 7-4" fill="none" stroke="#9baaa3"/>
      ${layers}
    </g>
  </svg>`;
}
