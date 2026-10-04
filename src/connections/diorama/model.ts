import {
  BoxGeometry, BufferGeometry, CatmullRomCurve3, ConeGeometry,
  CylinderGeometry, ExtrudeGeometry, Float32BufferAttribute, Group,
  IcosahedronGeometry, InstancedMesh, Mesh, MeshStandardMaterial,
  Object3D, Shape, SphereGeometry, TubeGeometry, Vector3,
} from 'three';

export type Landscape = 'forest' | 'village' | 'garden';
const R = 1.45, A = Math.sqrt(3) * R / 2;
const v = (x: number, z: number, y = .025) => new Vector3(x, y, z);

/** A deliberately small illustration: one fixed ground plane, river and path. */
export function createHexModel() {
  const root = new Group();
  const land = new Group();
  root.add(land);
  const materials = new Map<string, MeshStandardMaterial>();
  const material = (colour: string, roughness = .9) => {
    const key = `${colour}:${roughness}`;
    if (!materials.has(key)) materials.set(key, new MeshStandardMaterial({ color: colour, roughness, flatShading: true }));
    return materials.get(key)!;
  };
  const box = new BoxGeometry(1, 1, 1);
  const cone = new ConeGeometry(1, 1, 7);
  const cylinder = new CylinderGeometry(1, 1, 1, 7);
  const crown = new IcosahedronGeometry(1, 1);
  const rock = new IcosahedronGeometry(1, 0);
  const sphere = new SphereGeometry(1, 7, 5);
  const geometries = new Set<BufferGeometry>([box, cone, cylinder, crown, rock, sphere]);
  const mesh = (parent: Group, geometry: BufferGeometry, colour: string, pos: number[], size: number[], shadow = true) => {
    const object = new Mesh(geometry, material(colour));
    object.position.set(pos[0], pos[1], pos[2]);
    object.scale.set(size[0], size[1], size[2]);
    object.castShadow = shadow;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  };
  const groupAt = (parent: Group, x: number, z: number, scale = 1) => {
    const group = new Group(); group.position.set(x, 0, z); group.scale.setScalar(scale); parent.add(group); return group;
  };
  let seed = 7243;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

  const pine = (parent: Group, x: number, z: number, scale = 1) => {
    const tree = groupAt(parent, x, z, scale);
    mesh(tree, cylinder, '#837f70', [0, .19, 0], [.042, .38, .042]);
    ['#45675c', '#5e7e6f', '#7e9785'].forEach((colour, i) => {
      const canopy = mesh(tree, cone, colour, [0, .37 + i * .19, 0], [.3 - i * .065, .49 - i * .06, .3 - i * .065]);
      canopy.rotation.y = i * .55 + x;
    });
  };
  const oak = (parent: Group, x: number, z: number, scale = 1, colour = '#8fa48a') => {
    const tree = groupAt(parent, x, z, scale);
    mesh(tree, cylinder, '#918976', [0, .27, 0], [.046, .54, .046]);
    mesh(tree, crown, colour, [0, .62, 0], [.35, .38, .32]);
    mesh(tree, crown, colour, [.17, .5, .06], [.22, .25, .23]);
    mesh(tree, crown, '#809b88', [-.16, .52, -.04], [.24, .27, .23]);
  };
  const boulder = (parent: Group, x: number, z: number, scale: number) => {
    const object = mesh(parent, rock, '#9da9a2', [x, scale * .35, z], [scale, scale * .7, scale * .8]);
    object.rotation.y = random() * 4;
  };
  const roof = new BufferGeometry();
  roof.setAttribute('position', new Float32BufferAttribute([
    -.5,0,.5, .5,0,.5, 0,.45,.5,
    .5,0,-.5, -.5,0,-.5, 0,.45,-.5,
    -.5,0,-.5, -.5,0,.5, 0,.45,.5, -.5,0,-.5, 0,.45,.5, 0,.45,-.5,
    .5,0,.5, .5,0,-.5, 0,.45,-.5, .5,0,.5, 0,.45,-.5, 0,.45,.5,
  ], 3));
  roof.computeVertexNormals(); geometries.add(roof);
  const house = (parent: Group, x: number, z: number, scale = 1, rotation = 0) => {
    const home = groupAt(parent, x, z, scale); home.rotation.y = rotation;
    mesh(home, box, '#e0dfd2', [0, .19, 0], [.46, .38, .4]);
    mesh(home, roof, '#9e8c80', [0, .38, 0], [.6, .6, .53]);
    mesh(home, box, '#87776e', [.15, .57, -.06], [.065, .24, .08]);
    mesh(home, box, '#5e746c', [.04, .115, .204], [.09, .23, .018], false);
    mesh(home, box, '#b6c9ca', [-.125, .245, .206], [.085, .095, .018], false);
    mesh(home, box, '#a2b9bc', [.235, .23, .065], [.018, .1, .095], false);
    mesh(home, box, '#c2c0ad', [.04, .025, .26], [.17, .05, .11]);
  };
  const flowers = (parent: Group, x: number, z: number, scale = 1) => {
    mesh(parent, box, '#b5ad99', [x, .04, z], [.48 * scale, .08, .23 * scale]);
    for (let i = 0; i < 9; i++) {
      const fx = x + (random() - .5) * .37 * scale, fz = z + (random() - .5) * .16 * scale;
      mesh(parent, cylinder, '#809580', [fx, .11, fz], [.012, .18, .012], false);
      mesh(parent, sphere, i % 3 ? '#d4bbbf' : '#e0d6b6', [fx, .21 + random() * .03, fz], [.038, .026, .038], false);
    }
  };

  const hex = new Shape();
  const corners = Array.from({ length: 7 }, (_, i) => v(Math.cos(i * Math.PI / 3 - Math.PI / 6) * R, Math.sin(i * Math.PI / 3 - Math.PI / 6) * R, .035));
  corners.forEach((point, i) => i ? hex.lineTo(point.x, point.z) : hex.moveTo(point.x, point.z));
  // Extrusion points up after rotation; each top finishes at exactly y=0.
  const ground = new ExtrudeGeometry(hex, { depth: .28, bevelEnabled: false, curveSegments: 1 });
  ground.rotateX(-Math.PI / 2); geometries.add(ground);
  const colours = ['#b7bbaa', '#adbea7', '#96b4aa', '#91a997', '#afb5ad', '#9daf9e'];
  const centres = [[2*A,0], [A,1.5*R], [-A,1.5*R], [-2*A,0], [-A,-1.5*R], [A,-1.5*R]];
  const tile = (x: number, z: number, colour: string, central = false) => {
    const object = new Mesh(ground, [central ? new MeshStandardMaterial({ color: colour, roughness: 1 }) : material(colour), material('#93978b')]);
    object.position.set(x, -.28, z); object.receiveShadow = true; land.add(object);
    if (central) materials.set('centre', object.material[0]);
    const points = corners.map((point) => point.clone().add(v(x,z,0)));
    const seamGeometry = new TubeGeometry(new CatmullRomCurve3(points, false, 'catmullrom', 0), 72, central ? .014 : .005, 4, false);
    geometries.add(seamGeometry);
    const seam = new Mesh(seamGeometry, material(central ? '#f0efe3' : '#bccab9'));
    land.add(seam);
  };
  centres.forEach(([x,z], i) => tile(x,z,colours[i]));
  tile(0,0,'#a9bca3',true);

  const river = new CatmullRomCurve3([v(1.7,-3.03), v(1.27,-2.17), v(A/2,-.75*R), v(.15,-.3), v(-.16,.28), v(-A/2,.75*R), v(-1.32,2.32)]);
  const path = new CatmullRomCurve3([v(-A,-2.2,.043), v(-A/2,-.75*R,.043), v(-.2,-.05,.043), v(.55,0,.043), v(2*A,0,.043)]);
  const ribbon = (curve: CatmullRomCurve3, width: number, colour: string, yOffset = 0, roughness = 1) => {
    const vertices: number[] = [], indices: number[] = [];
    for (let i = 0; i <= 100; i++) {
      const p = curve.getPointAt(i/100), tangent = curve.getTangentAt(i/100);
      const normal = new Vector3(tangent.z,0,-tangent.x).normalize().multiplyScalar(width / 2);
      vertices.push(p.x+normal.x,p.y+yOffset,p.z+normal.z,p.x-normal.x,p.y+yOffset,p.z-normal.z);
      if (i<100) { const a=i*2; indices.push(a,a+1,a+2,a+1,a+3,a+2); }
    }
    const geometry = new BufferGeometry().setAttribute('position',new Float32BufferAttribute(vertices,3));
    geometry.setIndex(indices); geometry.computeVertexNormals(); geometries.add(geometry);
    const object = new Mesh(geometry,material(colour,roughness)); object.receiveShadow = true; land.add(object);
    return object;
  };
  ribbon(river,.36,'#c9d1bf',-.006);
  ribbon(river,.25,'#82a9b5',0,.22);
  ribbon(path,.19,'#bcbdaa',-.007);
  ribbon(path,.15,'#dfd9c5');
  const pond = mesh(land,cylinder,'#82a9b5',[-1.38,.019,2.46],[.49,.04,.41],false);
  pond.material = material('#82a9b5',.22);
  const spring = mesh(land,cylinder,'#82a9b5',[1.7,.018,-3.01],[.24,.038,.2],false);
  spring.material = material('#82a9b5',.22);

  // One little bridge spans the same river for every central scene.
  for (let i=0;i<10;i++) mesh(land,box,'#bbb09a',[-.29+i*.065,.105-Math.abs(i-4.5)*.009,0],[.06,.035,.22]);
  for (const z of [-.12,.12]) {
    for(const x of [-.3,.3]) mesh(land,box,'#978b78',[x,.16,z],[.022,.24,.025]);
    mesh(land,box,'#d2c7b0',[0,.24,z],[.68,.028,.025]);
  }

  const neighbour = centres.map(([x,z])=>groupAt(land,x,z));
  [[-.6,-.43,1.1],[.26,-.55,.94],[.5,.39,.82],[-.24,.52,.9]].forEach(([x,z,s])=>house(neighbour[0],x,z,s,-.12));
  oak(neighbour[0],.65,-.07,.7);
  oak(neighbour[1],.3,-.32,.8); boulder(neighbour[1],-.4,.23,.15);
  for(let i=0;i<28;i++) {
    const x=(random()-.5)*1.6,z=(random()-.5)*1.6;
    if(Math.hypot(x,z)<.95) pine(neighbour[3],x,z,.5+random()*.52);
  }
  [[-.43,-.32,.8],[.37,.22,.6],[-.52,.33,.62],[.61,-.32,.7]].forEach(([x,z,s])=>pine(neighbour[5],x,z,s));
  [[-.34,-.35,1.18],[.37,-.45,.91]].forEach(([x,z,s])=>{
    const mountain = mesh(neighbour[4],cone,'#9ba8a6',[x,s*.55,z],[s*.53,s*1.1,s*.53]); mountain.rotation.y=.4;
    const snow = mesh(neighbour[4],cone,'#e4e8e0',[x,s*.96,z],[s*.145,s*.3,s*.145]); snow.rotation.y=.4;
  });
  house(neighbour[4],-.03,.29,.72,.16); pine(neighbour[4],-.71,.19,.53); pine(neighbour[4],.61,.14,.59);
  for(const [x,z,s] of [[-.8,2.63,.16],[-1.97,2.3,.14],[1.95,-2.86,.19],[1.3,-3.27,.14]]) boulder(land,x,z,s);

  const grassGeometry = new BufferGeometry().setAttribute('position', new Float32BufferAttribute([-.025,0,0,.025,0,0,.018,.16,-.025, 0,0,-.025,0,0,.025,-.015,.12,.01],3));
  grassGeometry.computeVertexNormals(); geometries.add(grassGeometry);
  const routes = [...river.getSpacedPoints(90),...path.getSpacedPoints(90)];
  const safeGround = (x: number,z: number) => routes.every(p=>(p.x-x)**2+(p.z-z)**2>.045) && (x+1.38)**2+(z-2.46)**2>.28;
  const grass = (parent: Group, x: number,z: number, count: number, extent: number, colour: string) => {
    const instances = new InstancedMesh(grassGeometry, material(colour), count);
    const dummy = new Object3D();
    let used=0;
    for(let tries=0;used<count&&tries<count*8;tries++) {
      const px=(random()-.5)*extent, pz=(random()-.5)*extent;
      if(Math.hypot(px,pz)>extent*.49||!safeGround(x+px,z+pz))continue;
      dummy.position.set(px,.022,pz); dummy.rotation.y=random()*6.28; dummy.scale.setScalar(.5+random()*.6); dummy.updateMatrix(); instances.setMatrixAt(used++,dummy.matrix);
    }
    instances.count=used; instances.position.set(x,0,z); instances.receiveShadow=true; parent.add(instances);
  };
  centres.forEach(([x,z],i)=>grass(land,x,z,i===0?60:145,2.3,i===2?'#b7c5b4':'#a9b99d'));

  const variants = { forest:new Group(), village:new Group(), garden:new Group() };
  [[-.72,-.35,.86],[-.84,.12,.8],[-.42,.37,.73],[.68,.39,.92],[.34,.74,.71],[.83,-.38,.66],[-.05,-.83,.66]].forEach(([x,z,s])=>pine(variants.forest,x,z,s));
  oak(variants.forest,-.2,.81,.62); grass(variants.forest,0,0,180,2.45,'#b1c3a7');
  [[-.7,-.34,1],[.68,-.48,.88],[.57,.58,1.05],[-.25,.78,.78]].forEach(([x,z,s])=>house(variants.village,x,z,s,.2));
  oak(variants.village,-.79,.38,.63); grass(variants.village,0,0,65,2.35,'#bdc6af');
  flowers(variants.garden,-.68,-.32,1.1); flowers(variants.garden,-.7,.13,.92); flowers(variants.garden,.55,.57,1.2); flowers(variants.garden,-.16,.85,.85);
  oak(variants.garden,-.52,.64,.75,'#c4b4b9'); oak(variants.garden,.59,-.48,.95,'#c4b2b4'); oak(variants.garden,.86,.09,.59);
  grass(variants.garden,0,0,95,2.4,'#bacbbb');

  // Repeated foliage/building pieces share instanced draw calls and geometry.
  const batch = (group: Group) => {
    group.updateMatrixWorld(true);
    const buckets = new Map<string, Mesh[]>();
    group.traverse(object=>{
      if(!(object instanceof Mesh)||object instanceof InstancedMesh||Array.isArray(object.material))return;
      const key=`${object.geometry.uuid}:${object.material.uuid}:${object.castShadow}`;
      if(!buckets.has(key))buckets.set(key,[]); buckets.get(key)!.push(object);
    });
    for(const objects of buckets.values()) {
      if(objects.length<2)continue;
      const instanced = new InstancedMesh(objects[0].geometry,objects[0].material,objects.length);
      instanced.castShadow=objects[0].castShadow; instanced.receiveShadow=true;
      objects.forEach((object,i)=>{instanced.setMatrixAt(i,object.matrixWorld);object.removeFromParent();});
      group.add(instanced);
    }
  };
  batch(land);
  Object.values(variants).forEach(group=>{batch(group);root.add(group);});
  const streaks = new InstancedMesh(box,material('#d1e2e0'),9);
  root.add(streaks);
  const dummy = new Object3D();
  return {
    root,
    framingPoints: [...centres, [0,0]].flatMap(([x,z]) => corners.map(point => v(x+point.x,z+point.z,-.28))).concat([
      v(-A-.34,-1.5*R-.35,1.35), v(-A+.37,-1.5*R-.45,1.1),
    ]),
    select(scene: Landscape) {
      Object.entries(variants).forEach(([key,group])=>{group.visible=key===scene;});
      materials.get('centre')!.color.set({forest:'#a9bca3',village:'#bfc3af',garden:'#a7bdb1'}[scene]);
    },
    animate(time: number) {
      for(let i=0;i<streaks.count;i++) {
        const t=(i/streaks.count+time*.025)%1;
        const point=river.getPointAt(t), tangent=river.getTangentAt(t);
        dummy.position.copy(point); dummy.position.y+=.007; dummy.position.x+=Math.sin(i*17)*.055;
        dummy.rotation.y=Math.atan2(tangent.x,tangent.z);
        dummy.scale.set(.011,.004,.07+Math.sin(i*3)*.025); dummy.updateMatrix(); streaks.setMatrixAt(i,dummy.matrix);
      }
      streaks.instanceMatrix.needsUpdate=true;
    },
    dispose() {
      root.traverse(object=>{if(object instanceof InstancedMesh)object.dispose();});
      geometries.forEach(geometry=>geometry.dispose()); materials.forEach(mat=>mat.dispose());
    },
  };
}
