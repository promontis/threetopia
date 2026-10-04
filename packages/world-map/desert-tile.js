import {Group,BufferGeometry,Float32BufferAttribute,Mesh,MeshStandardMaterial,Color,
  IcosahedronGeometry,LineLoop,LineDashedMaterial,Vector3,Matrix4} from 'three';
import {mergeGeometries,mergeVertices} from 'three/addons/utils/BufferGeometryUtils.js';
import {DESERT_TILE,COMPACT_TILE,desertHeightAt,sampledTileHeightAt,tileCorners,tileInward,validateLandmarkMetrics} from './tile-slot.js';
import {createTileWater} from './tile-water.js';

const random=n=>{const v=Math.sin(n*127.1)*43758.5453;return v-Math.floor(v);};
/** The creator receives only `slot`. Landscape, edges and lighting stay host-owned. */
export function createDesertTile({representation='map',seed=1,surface:sourceSurface=null,waveTextures=[],time={value:0},compact=false,biome='desert',sharedEdges=[]}={}){
  const config=(compact?COMPACT_TILE:DESERT_TILE)[representation];if(!config)throw Error('Unknown tile representation.');
  const {radius,floorY}=config,root=new Group();root.name=`Threetopia / ${compact?COMPACT_TILE.id:DESERT_TILE.id} / ${representation}`;
  const corners=tileCorners(radius),positions=[],colors=[],indices=[],steps=sourceSurface?26:14,ratio=DESERT_TILE[representation].radius/12;
  if(sourceSurface&&(!Number.isInteger(sourceSurface.size)||sourceSurface.size<3||sourceSurface.size>129||sourceSurface.heights?.length!==sourceSurface.size**2||!sourceSurface.heights.every(Number.isFinite)||!Number.isFinite(sourceSurface.step)||sourceSurface.step<=0||![sourceSurface.x0,sourceSurface.z0,sourceSurface.waterLevel,sourceSurface.waveScale].every(Number.isFinite)||sourceSurface.waveScale<=0))throw Error('Invalid sampled tile surface.');
  const heightAt=(x,z)=>sourceSurface?sampledTileHeightAt(x,z,sourceSurface,representation,compact):compact?floorY:desertHeightAt(x,z,representation),waterLevel=floorY+(sourceSurface?.waterLevel??0)*ratio;
  function vertex(x,z){
    const y=heightAt(x,z);positions.push(x,y,z);
    const t=(y-floorY)/radius,c=new Color('#dcc28c').lerp(new Color('#eddda8'),Math.min(.7,Math.max(0,t*8)));
    if(sourceSurface){
      const d=.1*ratio,slope=Math.hypot(heightAt(x+d,z)-heightAt(x-d,z),heightAt(x,z+d)-heightAt(x,z-d))/(2*d);
      c.lerp(new Color('#a58d69'),Math.min(.7,Math.max(0,slope-.25)*.65));
      if(y<waterLevel+ratio*.16)c.lerp(new Color('#b8bc94'),.2);
    }
    if(biome==='valley'||biome==='city'){
      const edge=Math.min(1,Math.max(0,(tileInward(x,z,radius)/ratio-.55)/1.25));
      const tint=new Color(biome==='city'?'#626a70':'#92ae75');
      if(biome==='valley'){const d=.1*ratio,slope=Math.hypot(heightAt(x+d,z)-heightAt(x-d,z),heightAt(x,z+d)-heightAt(x,z-d))/(2*d);tint.lerp(new Color('#8e9178'),Math.min(1,slope*.6));}
      c.lerp(tint,edge*edge*(3-2*edge));
    }
    // Every compact biome uses the same colour as well as height at a join.
    // Wet sand and local steepness must not tint one side of a shared edge.
    if(compact){const t=Math.min(1,Math.max(0,(tileInward(x,z,radius)/ratio-.54)/.96));c.lerp(new Color('#dcc28c'),1-t*t*(3-2*t));}
    c.multiplyScalar(1+.013*Math.sin(x/radius*23+z/radius*17)*Math.min(1,Math.max(0,tileInward(x,z,radius)/radius/.14)));colors.push(c.r,c.g,c.b);
  }
  for(let side=0;side<6;side++){
    const a=corners[side],b=corners[(side+1)%6],rows=[];
    for(let i=0;i<=steps;i++){
      rows[i]=positions.length/3;
      for(let j=0;j<=steps-i;j++){
        vertex((a.x*i+b.x*j)/steps,(a.z*i+b.z*j)/steps);
      }
    }
    for(let i=0;i<steps;i++)for(let j=0;j<steps-i;j++){
      const a=rows[i]+j,b=rows[i+1]+j,c=a+1;indices.push(a,c,b);
      if(j<steps-i-1)indices.push(c,rows[i+1]+j+1,b);
    }
  }
  let surface=new BufferGeometry();surface.setAttribute('position',new Float32BufferAttribute(positions,3));surface.setAttribute('color',new Float32BufferAttribute(colors,3));surface.setIndex(indices);surface=mergeVertices(surface);surface.computeVertexNormals();
  const waterSurface=sourceSurface?createTileWater(surface,waterLevel,time,sourceSurface.waveScale*ratio,waveTextures):null;if(waterSurface)root.add(waterSurface);
  const geometries=[surface.toNonIndexed()];
  // A narrow sandstone skirt gives the miniature depth. Shared top edges meet
  // exactly; the skirt is beneath the surface, not a gap between tiles.
  const p=[],c=[];const rings=[[1,floorY],[.995,floorY-radius*.022],[.975,floorY-radius*.11]];
  for(let ring=0;ring<2;ring++)for(let side=0;side<6;side++){
    if(sharedEdges.includes(side))continue;
    const a=corners[side],b=corners[(side+1)%6],[s,y]=rings[ring],[s2,y2]=rings[ring+1];
    const A=[a.x*s,y,a.z*s],B=[b.x*s,y,b.z*s],C=[b.x*s2,y2,b.z*s2],D=[a.x*s2,y2,a.z*s2];
    p.push(...A,...B,...C,...A,...C,...D);
    const colour=new Color(ring?'#b58e56':'#e2c48b');for(let i=0;i<6;i++)c.push(colour.r,colour.g,colour.b);
  }
  const skirt=new BufferGeometry();skirt.setAttribute('position',new Float32BufferAttribute(p,3));skirt.setAttribute('color',new Float32BufferAttribute(c,3));skirt.computeVertexNormals();geometries.push(skirt);
  for(let i=0;!sourceSurface&&!compact&&i<8;i++){
    const angle=i*2.4+.7,r=radius*(.77+random(i+seed)*.045),x=Math.cos(angle)*r,z=Math.sin(angle)*r;
    const g=new IcosahedronGeometry(radius*(.017+random(i+8)*.023),0);g.scale(1.6,.65,1);g.rotateY(angle);g.translate(x,heightAt(x,z),z);g.deleteAttribute('uv');
    const col=new Color(i%3?'#c3a372':'#b99764'),arr=new Float32Array(g.attributes.position.count*3);for(let v=0;v<g.attributes.position.count;v++)col.toArray(arr,v*3);g.setAttribute('color',new Float32BufferAttribute(arr,3));geometries.push(g);
  }
  const geometry=mergeGeometries(geometries);geometries.forEach(g=>g.dispose());surface.dispose();
  const material=new MeshStandardMaterial({vertexColors:true,roughness:1,metalness:0});
  const terrain=new Mesh(geometry,material);terrain.name='Threetopia desert shell';terrain.receiveShadow=true;terrain.castShadow=true;root.add(terrain);
  const slot=new Group();slot.name='Creator slot';slot.position.y=floorY;root.add(slot);
  const guide=new LineLoop(new BufferGeometry().setFromPoints(Array.from({length:96},(_,i)=>new Vector3(Math.cos(i/96*Math.PI*2)*config.slotRadius,floorY+.035,Math.sin(i/96*Math.PI*2)*config.slotRadius))),new LineDashedMaterial({color:'#886738',transparent:true,opacity:.6,dashSize:radius*.027,gapSize:radius*.018}));
  guide.computeLineDistances();guide.visible=false;root.add(guide);
  return {root,terrain,slot,guide,water:waterSurface,config,representation,heightAt,
    mount(component,metrics,lod='tile'){
      if(representation!=='map')throw Error('Use the world integration for playable content.');
      if(slot.children.length)throw Error('A map tile has exactly one creator component; remove the previous one first.');
      // Re-measure at mounting time: transforms may have changed after loading.
      const measured=measureLandmark(component,metrics.bytes),errors=validateLandmarkMetrics(measured,lod);if(errors.length)throw Error(errors.join('\n'));
      slot.add(component);
    },
    dispose(){geometry.dispose();material.dispose();waterSurface?.geometry.dispose();waterSurface?.material.dispose();guide.geometry.dispose();guide.material.dispose();root.removeFromParent();},
  };
}
export function measureLandmark(root,bytes){
  root.updateWorldMatrix(true,true);
  const parentInverse=root.parent?root.parent.matrixWorld.clone().invert():new Matrix4(),matrix=new Matrix4(),v=new Vector3(),textures=new Set();
  let triangles=0,drawCalls=0,radius=0,minY=Infinity,maxY=-Infinity,forbiddenNodes=0;
  root.traverse(object=>{
    if(object.isLight||object.isCamera)forbiddenNodes++;
    if(!object.isMesh)return;
    const g=object.geometry,p=g.attributes.position,count=object.isInstancedMesh?object.count:1;
    triangles+=(g.index?.count??p.count)/3*count;drawCalls+=Array.isArray(object.material)?g.groups.length:1;
    const materials=[].concat(object.material);for(const material of materials)for(const value of Object.values(material))if(value?.isTexture)textures.add(value);
    matrix.multiplyMatrices(parentInverse,object.matrixWorld);
    for(let instance=0;instance<count;instance++){
      const transform=matrix.clone();if(object.isInstancedMesh){const im=new Matrix4();object.getMatrixAt(instance,im);transform.multiply(im);}
      for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(transform);radius=Math.max(radius,Math.hypot(v.x,v.z));minY=Math.min(minY,v.y);maxY=Math.max(maxY,v.y);}
    }
  });
  let textureBytes=0;for(const t of textures){const image=t.image;textureBytes+=(image?.width??0)*(image?.height??0)*4*4/3;}
  return {triangles,drawCalls,bytes,radius,minY,maxY,textureBytes,textures:textures.size,forbiddenNodes};
}
