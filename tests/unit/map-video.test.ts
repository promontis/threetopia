import {describe,it,expect} from 'vitest';
import {resampleVideoPath,videoDimensions,avcCodecString,type VideoSample} from '../../src/tiles/lite/video-path';
import type {VideoUIFrame} from '../../src/tiles/lite/video-ui';

const sample=(time:number,overrides:Partial<VideoSample>={}):VideoSample=>({time,target:[0,1,0],azimuth:0,polar:.9,radius:130,height:40,aspect:16/9,worldTime:time/1000,...overrides});
describe('Map video path',()=>{
  it('reconstructs 60 fps camera and animation frames from an irregular live take',()=>{
    const path=[sample(0),sample(130,{target:[1.3,1,0],height:38.7}),sample(540,{target:[5.4,1,0],height:34.6}),sample(1000,{target:[10,1,0],height:30})];
    const poses=resampleVideoPath(path);
    expect(poses).toHaveLength(61);
    expect(poses[30].target[0]).toBeCloseTo(5);expect(poses[30].height).toBeCloseTo(35);expect(poses[30].worldTime).toBeCloseTo(.5);
    expect(poses.at(-1)!.target).toEqual([10,1,0]);
  });
  it('crosses the orbit seam without a full spin or shortening the camera radius',()=>{
    const poses=resampleVideoPath([sample(0,{azimuth:Math.PI-.1}),sample(1000,{azimuth:-Math.PI+.1})],60,.2);
    expect(poses[30].azimuth).toBeCloseTo(Math.PI);expect(poses[30].radius).toBeCloseTo(130);
    expect(poses.every((p,i)=>!i||Math.abs(p.azimuth-poses[i-1].azimuth)<.01)).toBe(true);
  });
  it('smooths camera jolts while leaving pauses and world time intact',()=>{
    const path=[sample(0,{worldTime:12}),sample(400,{target:[8,1,0],worldTime:12.4}),sample(600,{target:[-2,1,0],worldTime:12.4}),sample(1000,{worldTime:12.4})];
    const raw=resampleVideoPath(path),smooth=resampleVideoPath(path,60,.2);
    expect(smooth[24].target[0]).toBeLessThan(raw[24].target[0]);
    expect(smooth.map(p=>p.worldTime)).toEqual(raw.map(p=>p.worldTime));
    expect(smooth.at(-1)!.worldTime).toBe(12.4);
    expect(()=>resampleVideoPath([sample(0),sample(0)])).toThrow('increasing');
  });
  it('keeps window capture even and bounded, with valid 60 fps H.264 levels',()=>{
    expect(videoDimensions('window',1441,945)).toEqual({width:1440,height:944});
    const big=videoDimensions('window',10000,6000);expect(big.width%2).toBe(0);expect(big.height%2).toBe(0);expect(big.width*big.height).toBeLessThanOrEqual(3840*2160);
    expect(videoDimensions('2160p',390,844)).toEqual({width:3840,height:2160});
    expect(avcCodecString(1920,1080)).toBe('avc1.64002a');
    expect(avcCodecString(2560,1440)).toBe('avc1.640033');
    expect(avcCodecString(3840,2160)).toBe('avc1.640034');
  });
  it('preserves card open/close timing and scrolling independently of camera smoothing',()=>{
    const closed:VideoUIFrame={width:1000,height:700,layers:[],labels:[]};
    const opened:VideoUIFrame={...closed,dialog:{skin:'skin',body:'body',close:'close',scroll:0,closeX:0,closeY:0,backdrop:'#0004',blur:'none'}};
    const scrolled:VideoUIFrame={...opened,dialog:{...opened.dialog!,scroll:100}};
    const path=[sample(0,{ui:closed}),sample(250,{ui:opened,target:[10,1,0]}),sample(750,{ui:scrolled}),sample(1000,{ui:closed})];
    for(const smoothing of [0,.05,.2]){
      const poses=resampleVideoPath(path,60,smoothing);
      expect(poses[14].ui?.dialog).toBeUndefined();expect(poses[15].ui?.dialog?.scroll).toBe(0);
      expect(poses[30].ui?.dialog?.scroll).toBeCloseTo(50);expect(poses[45].ui?.dialog?.scroll).toBe(100);
      expect(poses[59].ui?.dialog).toBeDefined();expect(poses[60].ui?.dialog).toBeUndefined();
    }
  });
});
