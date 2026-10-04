import {mountAtlas} from './atlas-ui.ts';
const root=document.querySelector<HTMLElement>('[data-atlas-page]')!;
void mountAtlas(root).catch(error=>{root.querySelector('[data-atlas-status]')!.textContent=error.message;});
