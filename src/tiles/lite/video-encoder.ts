import {avcCodecString,VIDEO_FPS} from './video-path';

/** Imported only when a take is stopped. Encoding never runs during live capture. */
export async function encodeMapVideo(options:{canvas:HTMLCanvasElement;width:number;height:number;frames:number;signal:AbortSignal;
  prepare:()=>void;renderFrame:(frame:number)=>void;progress:(frames:number)=>void}){
  const {canvas,width,height,frames,signal}=options;
  if(typeof VideoEncoder==='undefined')throw new Error('Video export needs a browser with WebCodecs, such as Chrome or Edge.');
  const {Output,Mp4OutputFormat,BufferTarget,CanvasSource,Quality,getFirstEncodableVideoCodec}=await import('mediabunny');
  signal.throwIfAborted();
  const bitrate=Math.min(80e6,Math.round(width*height*VIDEO_FPS*.15)),quality=new Quality({bitrate});
  const fullCodecString=avcCodecString(width,height);
  const exact=await VideoEncoder.isConfigSupported({codec:fullCodecString,width,height,bitrate,framerate:VIDEO_FPS}).then(s=>s.supported===true,()=>false);
  const codec=exact?'avc':await getFirstEncodableVideoCodec(['avc','hevc','vp9','av1'],{width,height,quality});
  if(!codec)throw new Error(`This browser cannot encode ${width} × ${height}. Try a smaller video size.`);
  signal.throwIfAborted();
  options.prepare();
  const target=new BufferTarget(),output=new Output({format:new Mp4OutputFormat({fastStart:'in-memory'}),target});
  const source=new CanvasSource(canvas,{codec,quality,keyFrameInterval:1,latencyMode:'quality',...(exact?{fullCodecString}:{})});
  output.addVideoTrack(source,{frameRate:VIDEO_FPS});
  try{
    await output.start();signal.throwIfAborted();
    await new Promise<void>((resolve,reject)=>{
      let frame=-30,raf=0,settled=false;
      const finish=(error?:unknown)=>{
        if(settled)return;settled=true;cancelAnimationFrame(raf);signal.removeEventListener('abort',abort);
        if(error===undefined)resolve();else reject(error);
      };
      const abort=()=>finish(signal.reason);
      signal.addEventListener('abort',abort,{once:true});
      const next=async()=>{
        try{
          signal.throwIfAborted();
          if(frame>=frames){finish();return;}
          // Warm up temporal shadows at the initial pose. Capture in the SAME task
          // as the render: the WebGL drawing buffer is discarded after presentation.
          options.renderFrame(Math.max(0,frame));
          if(frame>=0){await source.add(frame/VIDEO_FPS,1/VIDEO_FPS);signal.throwIfAborted();options.progress(frame+1);}
          frame++;
          if(!settled)raf=requestAnimationFrame(next);
        }catch(error){finish(error);}
      };
      if(signal.aborted)abort();else raf=requestAnimationFrame(next);
    });
    source.close();signal.throwIfAborted();await output.finalize();signal.throwIfAborted();
  }catch(error){await output.cancel().catch(()=>{});throw error;}
  return {blob:new Blob([target.buffer!],{type:'video/mp4'}),codec};
}
