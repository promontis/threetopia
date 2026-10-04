export const SETTINGS_KEY='threetopia.map.settings.v1';
export const CREATOR_SETTINGS_KEY='threetopia.creator.map.settings.v1';
export const DEFAULT_MAP_SETTINGS={
  pixelRatio:0,renderScale:1,antiAliasing:4,shadows:true,reflections:true,
  waveStrength:1,clarity:1,surfStrength:1,foamStrength:1,
  exposure:0,environmentLight:1,ao:.75,bloom:.12,clouds:true,labels:true,
};
export type MapSettings=typeof DEFAULT_MAP_SETTINGS;
export const DEFAULT_CREATOR_MAP_SETTINGS:MapSettings={...DEFAULT_MAP_SETTINGS,pixelRatio:2};
export type SettingKey=keyof MapSettings;
export const PIXEL_RATIOS=[0,1,1.5,2] as const;
export const SETTING_RANGES={
  renderScale:[.5,1],waveStrength:[.25,1.5],clarity:[.5,1.5],
  surfStrength:[0,2],foamStrength:[0,2],exposure:[-1.5,1.5],
  environmentLight:[.25,1.5],ao:[0,1.5],bloom:[0,.3],
} as const;

/** Storage is optional and untrusted; a stale setting must never allocate an
 * unbounded render target or silently switch a boolean to a truthy string. */
export function normalizeMapSettings(value:unknown,maxSamples=4,defaults=DEFAULT_MAP_SETTINGS):MapSettings{
  const result={...defaults};
  const source=value&&typeof value==='object'?value as Record<string,unknown>:{};
  for(const [key,[min,max]] of Object.entries(SETTING_RANGES)){
    const v=source[key];if(typeof v==='number'&&Number.isFinite(v))Object.assign(result,{[key]:Math.max(min,Math.min(max,v))});
  }
  for(const key of ['shadows','reflections','clouds','labels'] as const)if(typeof source[key]==='boolean')result[key]=source[key];
  if(PIXEL_RATIOS.includes(source.pixelRatio as typeof PIXEL_RATIOS[number]))result.pixelRatio=source.pixelRatio as number;
  const requested=[0,2,4].includes(source.antiAliasing as number)?source.antiAliasing as number:4;
  result.antiAliasing=[4,2,0].find(n=>n<=Math.max(0,maxSamples)&&n<=requested)??0;
  return result;
}

/** Auto retains the existing performance budget. An explicit DPR bypasses
 * both that budget and the device DPR, with only GPU dimension limits applied. */
export function mapPixelRatio(settings:MapSettings,width:number,height:number,deviceDPR:number,maxDimension:number){
  const w=Math.max(1,width),h=Math.max(1,height);
  const ratio=settings.pixelRatio||Math.min(deviceDPR,1.6,Math.sqrt(2_100_000/(w*h)));
  return Math.min(ratio*settings.renderScale,maxDimension/w,maxDimension/h);
}

export function readMapSettings(maxSamples:number,creator=false):MapSettings{
  const defaults=creator?DEFAULT_CREATOR_MAP_SETTINGS:DEFAULT_MAP_SETTINGS;
  try{
    let stored=JSON.parse(localStorage.getItem(creator?CREATOR_SETTINGS_KEY:SETTINGS_KEY)??'null');
    if(creator&&stored===null){
      const legacy=JSON.parse(localStorage.getItem(SETTINGS_KEY)??'null');
      // Adopt DPR 2 for the previous Auto default, retaining other preferences
      // and explicit numeric DPR choices. Future Auto choices use the new key.
      if(legacy&&typeof legacy==='object')stored={...legacy,pixelRatio:legacy.pixelRatio||2};
    }
    return normalizeMapSettings(stored,maxSamples,defaults);
  }catch{return normalizeMapSettings(null,maxSamples,defaults);}
}
export function saveMapSettings(settings:MapSettings,creator=false):boolean{
  try{localStorage.setItem(creator?CREATOR_SETTINGS_KEY:SETTINGS_KEY,JSON.stringify(settings));return true;}catch{return false;}
}
