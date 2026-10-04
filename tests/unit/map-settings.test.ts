import {describe,it,expect,vi,afterEach} from 'vitest';
import {CREATOR_SETTINGS_KEY,DEFAULT_CREATOR_MAP_SETTINGS,DEFAULT_MAP_SETTINGS,SETTINGS_KEY,mapPixelRatio,normalizeMapSettings,readMapSettings,saveMapSettings} from '../../src/tiles/lite/settings-model';

afterEach(()=>vi.unstubAllGlobals());
describe('Map preferences',()=>{
  it('rejects corrupted values and caps expensive settings to the device',()=>{
    expect(normalizeMapSettings({renderScale:999,antiAliasing:4,shadows:'false',reflections:false,clarity:NaN,exposure:-50,clouds:false,labels:false},2)).toEqual({
      ...DEFAULT_MAP_SETTINGS,renderScale:1,antiAliasing:2,reflections:false,exposure:-1.5,clouds:false,labels:false,
    });
    expect(normalizeMapSettings({renderScale:-1,antiAliasing:32},0).renderScale).toBe(.5);
    expect(normalizeMapSettings({antiAliasing:32},0).antiAliasing).toBe(0);
    expect(normalizeMapSettings({clouds:'false'}).clouds).toBe(true);
    expect(normalizeMapSettings(null)).toEqual(DEFAULT_MAP_SETTINGS);
  });
  it('keeps the map usable when browser storage is invalid or denied',()=>{
    vi.stubGlobal('localStorage',{getItem:()=>'{broken',setItem:()=>{throw new Error('Blocked');}});
    expect(readMapSettings(4)).toEqual(DEFAULT_MAP_SETTINGS);
    expect(saveMapSettings(DEFAULT_MAP_SETTINGS)).toBe(false);
    vi.stubGlobal('localStorage',{getItem:()=>{throw new Error('Blocked');}});
    expect(readMapSettings(2).antiAliasing).toBe(2);
  });
  it('migrates existing preferences to Auto and accepts only supported DPR choices',()=>{
    expect(normalizeMapSettings({renderScale:.75}).pixelRatio).toBe(0);
    for(const pixelRatio of [0,1,1.5,2])expect(normalizeMapSettings({pixelRatio}).pixelRatio).toBe(pixelRatio);
    for(const pixelRatio of [-1,3,Infinity,NaN,'2',null])expect(normalizeMapSettings({pixelRatio}).pixelRatio).toBe(0);
    let saved='';vi.stubGlobal('localStorage',{getItem:()=>saved,setItem:(_key:string,value:string)=>{saved=value;}});
    expect(saveMapSettings({...DEFAULT_MAP_SETTINGS,pixelRatio:2})).toBe(true);
    expect(readMapSettings(4).pixelRatio).toBe(2);
  });
  it('keeps the current Auto budget but renders manual DPR 2 above that budget',()=>{
    expect(mapPixelRatio(DEFAULT_MAP_SETTINGS,390,844,3,8192)).toBe(1.6);
    expect(mapPixelRatio(DEFAULT_MAP_SETTINGS,1920,1080,2,8192)).toBeCloseTo(1.00635,5);
    for(const [width,height] of [[1440,900],[1920,1080],[2560,1440]]){
      expect(mapPixelRatio({...DEFAULT_MAP_SETTINGS,pixelRatio:2},width,height,2,8192)).toBe(2);
    }
    // Explicit modes also allow supersampling a DPR 1 display.
    expect(mapPixelRatio({...DEFAULT_MAP_SETTINGS,pixelRatio:2},1440,900,1,8192)).toBe(2);
    expect(mapPixelRatio({...DEFAULT_MAP_SETTINGS,pixelRatio:1},2560,1440,2,8192)).toBe(1);
  });
  it('starts creator maps at DPR 2, including with unavailable storage',()=>{
    vi.stubGlobal('localStorage',{getItem:()=>null});
    expect(readMapSettings(4,true)).toEqual(DEFAULT_CREATOR_MAP_SETTINGS);
    expect(readMapSettings(4)).toEqual(DEFAULT_MAP_SETTINGS);
    vi.stubGlobal('localStorage',{getItem:()=>{throw new Error('Blocked');}});
    expect(readMapSettings(2,true)).toEqual({...DEFAULT_CREATOR_MAP_SETTINGS,antiAliasing:2});
  });
  it('migrates the old creator Auto default and persists later overrides separately',()=>{
    const stored=new Map([[SETTINGS_KEY,JSON.stringify({...DEFAULT_MAP_SETTINGS,clouds:false})]]);
    vi.stubGlobal('localStorage',{getItem:(key:string)=>stored.get(key)??null,setItem:(key:string,value:string)=>stored.set(key,value)});
    expect(readMapSettings(4,true)).toEqual({...DEFAULT_CREATOR_MAP_SETTINGS,clouds:false});
    stored.set(SETTINGS_KEY,JSON.stringify({...DEFAULT_MAP_SETTINGS,pixelRatio:1.5}));
    expect(readMapSettings(4,true).pixelRatio).toBe(1.5);
    expect(saveMapSettings({...DEFAULT_CREATOR_MAP_SETTINGS,pixelRatio:0},true)).toBe(true);
    expect(stored.has(CREATOR_SETTINGS_KEY)).toBe(true);
    expect(readMapSettings(4,true).pixelRatio).toBe(0);
    expect(readMapSettings(4).pixelRatio).toBe(1.5);
    saveMapSettings(DEFAULT_CREATOR_MAP_SETTINGS,true);
    expect(readMapSettings(4,true).pixelRatio).toBe(2);
  });
  it('applies render scale and respects the GPU texture/renderbuffer dimension limit',()=>{
    expect(mapPixelRatio({...DEFAULT_MAP_SETTINGS,pixelRatio:1.5,renderScale:.5},1920,1080,2,8192)).toBe(.75);
    expect(mapPixelRatio({...DEFAULT_MAP_SETTINGS,pixelRatio:2},5120,2880,2,8192)).toBe(1.6);
    expect(mapPixelRatio({...DEFAULT_MAP_SETTINGS,pixelRatio:2},2000,5000,2,8192)).toBeCloseTo(1.6384);
  });
});
