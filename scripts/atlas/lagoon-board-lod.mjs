import * as T from 'three-world';

// At overview size, several adjacent native boards occupy one pixel. Combine
// only coplanar, parallel neighbours into one front face. The original boards
// supply the footprint, plane, normals and colours; never discard alternating
// boards (which would leave holes in the decks and bridge spans).
export function joinBoardFaces(g,faces,maxBoards=4){
  const p=g.attributes.position,n=g.attributes.normal,c=g.attributes.color;
  const boards=faces.map(ids=>{
    const points=ids.map(i=>new T.Vector3().fromBufferAttribute(p,i));
    const unique=points.filter((v,i)=>points.findIndex(w=>v.distanceToSquared(w)<1e-12)===i);
    const centre=unique.reduce((a,b)=>a.add(b),new T.Vector3()).divideScalar(unique.length);
    const normal=new T.Vector3().fromBufferAttribute(n,ids[0]).normalize();
    // First triangle contains two rectangular edges and its diagonal. Choose
    // the longer rectangular edge, not the diagonal, as the board direction.
    const edges=[points[1].clone().sub(points[0]),points[2].clone().sub(points[1]),points[0].clone().sub(points[2])].sort((a,b)=>a.lengthSq()-b.lengthSq());
    const along=edges[1].clone().normalize(),across=new T.Vector3().crossVectors(normal,along).normalize();
    const colour=ids.reduce((a,i)=>a.add(new T.Vector3().fromBufferAttribute(c,i)),new T.Vector3()).divideScalar(ids.length);
    const bounds=project(unique,centre,along,across);
    return {ids,points:unique,centre,normal,along,across,colour,area:(bounds[1]-bounds[0])*(bounds[3]-bounds[2]),used:false};
  });
  function project(points,origin,u,v){
    const values=points.map(p=>p.clone().sub(origin));
    return [Math.min(...values.map(p=>p.dot(u))),Math.max(...values.map(p=>p.dot(u))),Math.min(...values.map(p=>p.dot(v))),Math.max(...values.map(p=>p.dot(v)))];
  }
  const positions=[],normals=[],colours=[],indices=[];let groups=0,joined=0;
  function vertex(point,normal,colour){positions.push(...point.toArray());normals.push(...normal.toArray());colours.push(...colour.toArray());}
  for(const first of boards){
    if(first.used)continue;first.used=true;
    const members=[first];let points=[...first.points],area=first.area,bounds=project(points,first.centre,first.along,first.across);
    while(members.length<maxBoards){
      let chosen=null,best=Infinity,nextBounds=null;
      for(const b of boards){
        if(b.used||Math.abs(b.along.dot(first.along))<.99||b.normal.dot(first.normal)<.995)continue;
        if(Math.abs(b.centre.clone().sub(first.centre).dot(first.normal))>.065)continue;
        const q=project(b.points,first.centre,first.along,first.across),gap=Math.max(q[2]-bounds[3],bounds[2]-q[3]);
        if(gap<-.09||gap>.10)continue;
        const overlap=Math.min(q[1],bounds[1])-Math.max(q[0],bounds[0]);
        if(overlap<.7*Math.min(q[1]-q[0],bounds[1]-bounds[0]))continue;
        const combined=[Math.min(q[0],bounds[0]),Math.max(q[1],bounds[1]),Math.min(q[2],bounds[2]),Math.max(q[3],bounds[3])];
        const newArea=(combined[1]-combined[0])*(combined[3]-combined[2]);
        if(newArea>1.3*(area+b.area))continue;
        const distance=b.centre.distanceToSquared(first.centre);
        if(distance<best){best=distance;chosen=b;nextBounds=combined;}
      }
      if(!chosen)break;
      chosen.used=true;members.push(chosen);points.push(...chosen.points);area+=chosen.area;bounds=nextBounds;
    }
    const start=positions.length/3;
    if(members.length===1){
      // Keep the exact source face when there is no suitable neighbour.
      for(const id of first.ids)vertex(new T.Vector3().fromBufferAttribute(p,id),new T.Vector3().fromBufferAttribute(n,id),new T.Vector3().fromBufferAttribute(c,id));
      indices.push(...Array.from({length:6},(_,i)=>start+i));
    }else{
      const normal=members.reduce((a,b)=>a.add(b.normal),new T.Vector3()).normalize(),colour=members.reduce((a,b)=>a.addScaledVector(b.colour,b.area),new T.Vector3()).divideScalar(area);
      const offset=members.reduce((a,b)=>a+b.centre.clone().sub(first.centre).dot(first.normal),0)/members.length;
      for(const [u,v] of [[bounds[0],bounds[2]],[bounds[1],bounds[2]],[bounds[1],bounds[3]],[bounds[0],bounds[3]]])vertex(first.centre.clone().addScaledVector(first.along,u).addScaledVector(first.across,v).addScaledVector(first.normal,offset),normal,colour);
      indices.push(start,start+1,start+2,start,start+2,start+3);joined+=members.length;
    }
    groups++;
  }
  const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(positions,3));geometry.setAttribute('normal',new T.Float32BufferAttribute(normals,3));geometry.setAttribute('color',new T.Float32BufferAttribute(colours,3));geometry.setIndex(indices);
  return {g:geometry,groups,joined};
}
