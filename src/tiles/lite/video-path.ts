// Adapted from Meadow's camera-path recorder for the map's orthographic orbit camera.
import type {VideoUIFrame} from './video-ui';
export const VIDEO_FPS=60;
export const VIDEO_MAX_SECONDS=120;
export const VIDEO_SIZES=['window','1080p','1440p','2160p'] as const;
export const VIDEO_SMOOTHING={off:0,light:.05,cinematic:.2} as const;
export type VideoSize=typeof VIDEO_SIZES[number];
export type VideoSmoothing=keyof typeof VIDEO_SMOOTHING;
export type VideoPose={target:[number,number,number];azimuth:number;polar:number;radius:number;height:number;aspect:number;worldTime:number;ui?:VideoUIFrame};
export type VideoSample=VideoPose&{time:number};

/** Window capture retains its aspect; H.264 dimensions must be even. */
export function videoDimensions(size:VideoSize,width:number,height:number){
  if(size!=='window')return {width:{'1080p':1920,'1440p':2560,'2160p':3840}[size],height:{'1080p':1080,'1440p':1440,'2160p':2160}[size]};
  const scale=Math.min(1,Math.sqrt(3840*2160/(width*height)),4096/width,4096/height);
  return {width:Math.max(2,Math.floor(width*scale/2)*2),height:Math.max(2,Math.floor(height*scale/2)*2)};
}

/** Resample irregular live frames without smoothing animation time or changing its speed. */
export function resampleVideoPath(samples:readonly VideoSample[],fps=VIDEO_FPS,smoothing=0):VideoPose[]{
  if(samples.length<2)throw new Error('A recording needs at least two frames.');
  const path=samples.map(p=>({...p}));
  for(let i=1;i<path.length;i++){
    if(path[i].time<=path[i-1].time)throw new Error('Video frames must have increasing timestamps.');
    const delta=path[i].azimuth-path[i-1].azimuth;
    path[i].azimuth=path[i-1].azimuth+delta-Math.PI*2*Math.round(delta/(Math.PI*2));
  }
  const start=path[0].time,count=Math.floor((path.at(-1)!.time-start)*fps/1000+1e-6)+1,poses:VideoPose[]=[];
  for(let i=0,j=0;i<count;i++){
    const time=start+i*1000/fps;
    while(j<path.length-2&&path[j+1].time<=time)j++;
    const a=path[j],b=path[j+1],t=Math.min(1,(time-a.time)/(b.time-a.time)),mix=(x:number,y:number)=>x+(y-x)*t;
    // UI events use their recorded time, independently of camera smoothing.
    // Interpolate scrolling only while the same dialog remains open.
    let ui=t>=1?b.ui:a.ui;
    if(a.ui?.dialog&&b.ui?.dialog&&a.ui.dialog.body===b.ui.dialog.body&&ui){
      ui={...ui,dialog:{...a.ui.dialog,scroll:mix(a.ui.dialog.scroll,b.ui.dialog.scroll)}};
    }
    poses.push({target:[mix(a.target[0],b.target[0]),mix(a.target[1],b.target[1]),mix(a.target[2],b.target[2])],
      azimuth:mix(a.azimuth,b.azimuth),polar:mix(a.polar,b.polar),radius:mix(a.radius,b.radius),height:mix(a.height,b.height),aspect:mix(a.aspect,b.aspect),worldTime:mix(a.worldTime,b.worldTime),ui});
  }
  if(smoothing<=0)return poses;
  const sigma=smoothing*fps,radius=Math.ceil(sigma*3),weights=Array.from({length:radius*2+1},(_,i)=>Math.exp(-((i-radius)**2)/(2*sigma*sigma))),total=weights.reduce((a,b)=>a+b,0);
  return poses.map((p,index)=>{
    const smooth:VideoPose={target:[0,0,0],azimuth:0,polar:0,radius:0,height:0,aspect:p.aspect,worldTime:p.worldTime,ui:p.ui};
    for(let offset=-radius;offset<=radius;offset++){
      const source=poses[Math.max(0,Math.min(poses.length-1,index+offset))],weight=weights[offset+radius]/total;
      for(let axis=0;axis<3;axis++)smooth.target[axis]+=source.target[axis]*weight;
      for(const key of ['azimuth','polar','radius','height'] as const)smooth[key]+=source[key]*weight;
    }
    return smooth;
  });
}

// H.264 level limits: macroblocks per second AND per frame, including 4K at 60 fps.
export function avcCodecString(width:number,height:number,fps=VIDEO_FPS){
  const levels=[[0x28,245760,8192],[0x2a,522240,8704],[0x32,589824,22080],[0x33,983040,36864],[0x34,2073600,36864],[0x3c,4177920,139264],[0x3d,8355840,139264],[0x3e,16711680,139264]];
  const blocks=Math.ceil(width/16)*Math.ceil(height/16),level=levels.find(([,rate,frame])=>blocks<=frame&&blocks*fps<=rate)?.[0]??0x3e;
  return 'avc1.6400'+level.toString(16);
}
