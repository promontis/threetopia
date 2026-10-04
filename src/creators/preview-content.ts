export type PreviewChoice={id:string;label:string;file:string};
export type PreviewVersion={version:string;state:string;manifest:any};

export function previewChoices(manifest:any):PreviewChoice[]{
  if(manifest.kind==='world')return ['map','world','overview'].filter(role=>typeof manifest.content?.[role]==='string').map(role=>({id:role,label:role[0].toUpperCase()+role.slice(1),file:manifest.content[role]}));
  return Object.entries(manifest.exports||{}).filter((entry):entry is [string,string]=>typeof entry[1]==='string'&&/\.glb$/i.test(entry[1])).map(([id,file])=>({id,label:id.replace(/[-_]/g,' ').replace(/^./,c=>c.toUpperCase()),file}));
}
export function previewVersions(versions:PreviewVersion[]){return versions.filter(v=>['ready','published'].includes(v.state)&&previewChoices(v.manifest).length>0);}

/** Fit a bounding sphere to both dimensions, including narrow mobile canvases. */
export function assetCameraFit(radius:number,aspect:number,fov=35){
  const r=Math.max(radius,0.001),vertical=fov*Math.PI/360,horizontal=Math.atan(Math.tan(vertical)*Math.max(aspect,0.05));
  const distance=r/Math.sin(Math.min(vertical,horizontal))*1.16;
  return {distance,near:r/1000,far:distance*30,minDistance:r*.45,maxDistance:distance*4};
}
