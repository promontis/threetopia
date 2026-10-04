import {canonicalTile,tileFootprint,STYLES,TILE_VARIANTS} from '../../packages/platform/tiles.js';
/** A schematic of the actual topology, not a decorative color swatch. */
export function tileGlyph(variant:string,rotation=0){
 const tile=canonicalTile(8,0,variant,rotation),style=STYLES[tile.recipe.family],fp=tileFootprint(tile);
 const layout=({inlet:'bay',marina:'harbor',docks:'harbor',terraces:'headland',basalt:'headland',oasis:'oasis',circuit:'skyport',neon:'skyport',sky:'skyport'} as Record<string,string>)[tile.recipe.kind]||tile.recipe.layout;
 const path=(points:number[][])=>points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)},${p[p.length-1].toFixed(1)}`).join(' ');
 const hex='260,-150 260,150 0,300 -260,150 -260,-150 0,-300';
 return `<svg viewBox="-310 -310 620 620" aria-hidden="true"><polygon points="${hex}" fill="${style.land}"/><g transform="rotate(${rotation*60})">${['bay','harbor','estuary','headland'].includes(layout)?`<path d="M260,-150L260,150L0,300L58,112Q${layout==='headland'?60:-80},0 58,-112L0,-300Z" fill="#79b7bb"/>`:''}${layout==='oasis'?'<ellipse cx="134" cy="36" rx="63" ry="59" fill="#79b7bb"/>':''}${layout==='skyport'?'<polygon points="235,-135 235,135 0,272 -235,135 -235,-135 0,-272" fill="#293e49" stroke="#71e4ed" stroke-width="8"/>':''}</g>${fp.channels.map(p=>`<path d="${path(p)}" fill="none" stroke="#79b7bb" stroke-width="74"/>`).join('')}${fp.routes.map(p=>`<path d="${path(p)}" fill="none" stroke="${style.path}" stroke-width="13"/>`).join('')}${tile.slot.regions.map((r:any)=>`<circle cx="${r.x}" cy="${r.z}" r="${r.radius}" fill="none" stroke="#f2f1d9" stroke-width="7" stroke-dasharray="14 10"/>`).join('')}</svg>`;
}

/** Pre-rendered photographs of the real host kit, never generated artwork.
 * A single live preview remains responsible for the selected orientation. */
export function tileThumbnail(variant:string,rotation=0){
 return TILE_VARIANTS.some(v=>v.id===variant)?`<img src="/map/hosts/${encodeURIComponent(variant)}.png" alt="" loading="lazy" decoding="async" width="300" height="152">`:tileGlyph(variant,rotation);
}
