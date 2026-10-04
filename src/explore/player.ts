import * as THREE from 'three/webgpu';
import { clamp } from './heightfield.ts';
import { PLAYER, SPAWN, type RegionId } from './config.ts';
import { planJourney, type GuideLeg } from './journey.ts';
import type { CollisionWorld } from './collision.ts';
export class Walker {
  position=new THREE.Vector3(SPAWN.x,0,SPAWN.z);yaw=SPAWN.yaw;pitch=SPAWN.pitch;verticalVelocity=0;
  grounded=true;distance=0;active=false;keys=new Set<string>();touch={x:0,y:0};guide=false;guideDistance=0;guideDirection=1;blocked=false;
  destination:RegionId='sakura';guideLegs:GuideLeg[]=[];guideLegIndex=0;
  private events=new AbortController();private drag:{id:number;x:number;y:number}|null=null;private direction=new THREE.Vector3();private previous=new THREE.Vector3();private stuckTime=0;
  constructor(public camera:THREE.PerspectiveCamera,public canvas:HTMLCanvasElement,public collision:CollisionWorld,public changed:()=>void) {
    this.position.y=collision.floor(SPAWN.x,SPAWN.z,100);
    const signal=this.events.signal;
    window.addEventListener('keydown',e=>{if(!this.active||/INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName))return;if(e.code==='KeyQ'||e.code==='KeyE'){e.preventDefault();this.stopGuide();this.yaw+=(e.code==='KeyQ'?1:-1)*Math.PI/8;this.syncCamera();return;}if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space','ShiftLeft','ShiftRight'].includes(e.code)){e.preventDefault();this.keys.add(e.code);if(this.guide)this.stopGuide();}if(e.code==='Escape'){this.keys.clear();this.stopGuide();}},{signal});
    window.addEventListener('keyup',e=>this.keys.delete(e.code),{signal});
    window.addEventListener('blur',()=>this.clearInput(),{signal});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)this.clearInput();},{signal});
    document.addEventListener('mousemove',e=>{if(document.pointerLockElement===canvas&&this.active){this.yaw-=e.movementX*.002;this.pitch=clamp(this.pitch-e.movementY*.002,-1.42,1.42);}},{signal});
    canvas.addEventListener('pointerdown',e=>{if(!this.active)return;if(e.pointerType==='mouse'&&!this.guide){void canvas.requestPointerLock()?.catch(()=>{});}else{this.drag={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);}},{signal});
    canvas.addEventListener('pointermove',e=>{if(this.drag?.id===e.pointerId){this.yaw-=(e.clientX-this.drag.x)*.004;this.pitch=clamp(this.pitch-(e.clientY-this.drag.y)*.004,-1.42,1.42);this.drag.x=e.clientX;this.drag.y=e.clientY;}},{signal});
    const release=()=>{this.drag=null;};canvas.addEventListener('pointerup',release,{signal});canvas.addEventListener('pointercancel',release,{signal});
    this.syncCamera();
  }
  clearInput(){this.keys.clear();this.touch.x=this.touch.y=0;this.drag=null;}
  setActive(active:boolean){this.active=active;if(!active){this.clearInput();if(document.pointerLockElement===this.canvas)document.exitPointerLock();}}
  get currentTrail(){return this.guideLegs[this.guideLegIndex]?.trail??this.collision.terrain.nearest(this.position.x,this.position.z).trail!;}
  get atDestination(){if(this.destination==='lagoon')return false;const trail=this.collision.terrain.trails.get(this.destination)!,n=trail.nearest(this.position.x,this.position.z);return n.distance<5&&n.along>trail.length-3;}
  setDestination(id:RegionId){this.destination=id;this.guideLegs=[];this.guideLegIndex=0;this.stopGuide();}
  startGuide(){this.guideLegs=planJourney(this.collision.terrain,this.position.x,this.position.z,this.destination);this.guideLegIndex=0;this.guideDirection=this.guideLegs[0].direction;this.guideDistance=this.currentTrail.nearest(this.position.x,this.position.z).along;this.guide=true;this.blocked=false;this.stuckTime=0;this.changed();}
  stopGuide(){this.guide=false;this.changed();}
  update(delta:number) {
    if(!this.active)return;
    const steps=Math.ceil(delta/(1/90));for(let i=0;i<steps;i++)this.step(delta/steps);this.syncCamera();
  }
  private step(dt:number) {
    let forward=(Number(this.keys.has('KeyW')||this.keys.has('ArrowUp'))-Number(this.keys.has('KeyS')||this.keys.has('ArrowDown')))-this.touch.y;
    let strafe=Number(this.keys.has('KeyD')||this.keys.has('ArrowRight'))-Number(this.keys.has('KeyA')||this.keys.has('ArrowLeft'))+this.touch.x;
    let speed=this.keys.has('ShiftLeft')||this.keys.has('ShiftRight')?PLAYER.runSpeed:PLAYER.walkSpeed;
    this.previous.copy(this.position);
    if(this.guide) {
      const route=this.currentTrail,n=route.nearest(this.position.x,this.position.z);
      this.guideDistance=this.guideDirection>0?Math.max(this.guideDistance,n.along):Math.min(this.guideDistance,n.along);
      if(this.guideDirection>0?this.guideDistance>=route.length-1:this.guideDistance<=1){
        if(this.guideLegIndex+1<this.guideLegs.length){this.guideLegIndex++;this.guideDirection=this.guideLegs[this.guideLegIndex].direction;this.guideDistance=this.currentTrail.nearest(this.position.x,this.position.z).along;this.stuckTime=0;this.changed();return;}
        this.stopGuide();forward=0;strafe=0;
      }
      else {
        const target=route.pointAt(this.guideDistance+2.2*this.guideDirection);this.direction.set(target.x-this.position.x,0,target.z-this.position.z).normalize();
        const desired=Math.atan2(-this.direction.x,-this.direction.z);let diff=(desired-this.yaw+Math.PI*3)%(Math.PI*2)-Math.PI;this.yaw+=diff*Math.min(1,dt*4);this.pitch+=(-.08-this.pitch)*dt;
        speed=PLAYER.runSpeed;forward=1;
      }
    } else this.direction.set(-Math.sin(this.yaw)*forward+Math.cos(this.yaw)*strafe,0,-Math.cos(this.yaw)*forward-Math.sin(this.yaw)*strafe).clampLength(0,1);
    if(forward||strafe) {
      this.position.addScaledVector(this.direction,speed*dt);
      const floor=this.collision.floor(this.position.x,this.position.z,this.previous.y+PLAYER.stepHeight);
      if(floor>this.previous.y+PLAYER.stepHeight){this.position.x=this.previous.x;this.position.z=this.previous.z;}
      else if(this.grounded&&floor>this.position.y)this.position.y=floor;
    }
    if(this.grounded&&this.keys.has('Space')){this.verticalVelocity=PLAYER.jumpSpeed;this.grounded=false;this.keys.delete('Space');}
    this.verticalVelocity-=PLAYER.gravity*dt;this.position.y+=this.verticalVelocity*dt;
    const floor=this.collision.floor(this.position.x,this.position.z,Math.max(this.position.y,this.previous.y)+PLAYER.stepHeight);
    // Buoyancy lets free exploration include the actual shared water surface.
    const supporting=Math.max(-.85,floor);
    if(this.position.y<=supporting&&this.verticalVelocity<=0){this.position.y=supporting;this.verticalVelocity=0;this.grounded=true;}else this.grounded=false;
    this.collision.resolve(this.position);
    const moved=Math.hypot(this.position.x-this.previous.x,this.position.z-this.previous.z);this.distance+=moved;
    if(this.guide){this.stuckTime=moved<speed*dt*.15?this.stuckTime+dt:0;if(this.stuckTime>1.5){this.blocked=true;this.stopGuide();}}
  }
  syncCamera(){this.camera.position.copy(this.position);this.camera.position.y+=PLAYER.eyeHeight;this.camera.rotation.set(this.pitch,this.yaw,0,'YXZ');this.camera.updateMatrixWorld();}
  dispose(){this.events.abort();this.clearInput();}
}
