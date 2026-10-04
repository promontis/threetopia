"""Pack original GPU captures into deduplicated, quantized, gzip shards (<16 MiB).
Regenerate from the build-time capture with: python3 scripts/world/pack-capture.py
"""
import gzip, hashlib, json
from pathlib import Path
import numpy as np
ROOT=Path(__file__).resolve().parents[2]
def raw_bytes(base,file):
    path=base/file
    if not path.exists():path=ROOT/'.context/capture-raw'/base.name/file
    return gzip.decompress(path.read_bytes())
for project in ['lagoon','sakura']:
    base=ROOT/'public/world-assets'/project
    archive=ROOT/'packages/world-sources'/project/'captured-manifest.json'
    manifest=json.loads((base/'scene.json').read_text())
    if 'buffers' in manifest or 'buffer' in manifest:manifest=json.loads(archive.read_text())
    else:archive.write_text(json.dumps(manifest))
    manifest['meshes']=[m for m in manifest['meshes'] if 'terrain' not in m['name'] and not m['parent'].startswith('terrain')]
    used={m['geometry'] for m in manifest['meshes']}
    if 'collision'in manifest:used.add(manifest['collision'])
    geos=manifest['geometries']; mapping={old:new for new,old in enumerate(sorted(used))}
    manifest['geometries']=[geos[i] for i in sorted(used)]
    for m in manifest['meshes']:m['geometry']=mapping[m['geometry']]
    if 'collision'in manifest:manifest['collision']=mapping[manifest['collision']]
    overrides={}
    for g in manifest['geometries']:
        if project!='lagoon' or not (g['name'].startswith('rocks-') or g['name']=='original-collision'):continue
        a=g['attributes']['position'];points=np.frombuffer(raw_bytes(base,a['file']),dtype='<f4').reshape(-1,3)
        idx=g.get('index');indices=np.frombuffer(raw_bytes(base,idx['file']),dtype='<u4' if idx['type']=='Uint32Array' else '<u2') if idx else np.arange(len(points),dtype=np.uint32)
        triangles=indices.reshape(-1,3);centers=points[triangles].mean(axis=1);b=manifest['bounds']
        keep=(centers[:,0]>=b[0]-2)&(centers[:,0]<=b[2]+2)&(centers[:,2]>=b[1]-2)&(centers[:,2]<=b[3]+2)
        selected=triangles[keep];verts,inv=np.unique(selected,return_inverse=True)
        for name,attribute in g['attributes'].items():
            dt={'Float32Array':'<f4','Uint8Array':'u1','Uint16Array':'<u2'}[attribute['type']]
            arr=np.frombuffer(raw_bytes(base,attribute['file']),dtype=dt).reshape(-1,attribute['itemSize'])[verts].copy()
            overrides[attribute['file']]=arr.tobytes();attribute['length']=arr.size
        if idx:
            index=inv.astype('<u4');overrides[idx['file']]=index.tobytes();idx['length']=index.size;idx['type']='Uint32Array'
        else:
            index=inv.astype('<u4');file='cropped-collision-index.bin.gz';g['index']={'file':file,'length':index.size,'type':'Uint32Array','itemSize':1};overrides[file]=index.tobytes()
        g['bounds']=[*points[verts].min(axis=0).tolist(),*points[verts].max(axis=0).tolist()];g['groups']=[]
    chunks=[bytearray()];seen={}
    def visit(value):
        if isinstance(value,dict):
            if 'file' in value and 'type' in value and 'length' in value:
                raw=overrides[value['file']] if value['file'] in overrides else raw_bytes(base,value['file'])
                if value['type']=='Float32Array':
                    width=value.get('itemSize',16 if 'instances'in value['file'] else 1)
                    data=np.frombuffer(raw,dtype='<f4').reshape(-1,width)
                    if np.isfinite(data).all():
                        lo=data.min(axis=0);hi=data.max(axis=0);scale=(hi-lo)/65535;scale[scale==0]=1
                        q=np.rint((data-lo)/scale).clip(0,65535).astype('<u2');raw=q.tobytes()
                        value['decode']={'min':lo.tolist(),'scale':scale.tolist()};value['type']='Uint16Array'
                digest=hashlib.sha256(raw).hexdigest()
                if digest not in seen:
                    if len(chunks[-1])+len(raw)>16*1024*1024:chunks.append(bytearray())
                    blob=chunks[-1];blob.extend(b'\0'*((-len(blob))%8))
                    seen[digest]=(len(chunks)-1,len(blob));blob.extend(raw)
                value['buffer'],value['offset']=seen[digest];value['bytes']=len(raw);del value['file']
            else:
                for v in value.values():visit(v)
        elif isinstance(value,list):
            for v in value:visit(v)
    visit(manifest)
    for m in manifest['materials']:m.pop('vertexShader',None);m.pop('fragmentShader',None)
    manifest['buffers']=[];total=0
    for i,blob in enumerate(chunks):
        filename=f'geometry-{i}.bin.gz';packed=gzip.compress(bytes(blob),9,mtime=0);(base/filename).write_bytes(packed);total+=len(packed);manifest['buffers'].append(filename)
    (base/'scene.json').write_text(json.dumps(manifest,separators=(',',':')))
    print(project, total//1024,'KiB in',len(chunks),'shards',flush=True)
