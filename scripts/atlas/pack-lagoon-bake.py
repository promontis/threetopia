"""Pack native beauty + semantic visibility mattes into bounded map sprites.

Only deterministic image processing of the actual Three.js render. Pillow 12+.
The complete native still remains beneath animated detail, so sub-pixel leaf
refraction cannot expose empty holes or move a foreground building's silhouette.
"""
import hashlib
import json
from pathlib import Path
from io import BytesIO
from PIL import Image, ImageChops, ImageFilter, ImageStat

ROOT = Path(__file__).resolve().parents[2]
CAPTURE = ROOT / '.context/lagoon-bake'
OUT = ROOT / 'public/map/lagoon/baked'
OUT.mkdir(parents=True, exist_ok=True)
capture = json.loads((CAPTURE / 'capture.json').read_text())
assert not capture['errors'], capture['errors']
beauty = Image.open(CAPTURE / 'beauty.png').convert('RGB')
island = Image.open(CAPTURE / 'island.png').convert('L')
# The native scene has isolated particle pixels; these are not land extents.
bounds = island.filter(ImageFilter.MedianFilter(5)).point(lambda x: 255 if x > 4 else 0).getbbox()
assert bounds and bounds[2] - bounds[0] > beauty.width * .5
x0, y0, x1, y1 = bounds
padding = 8
bounds = (max(0, x0-padding), max(0, y0-padding), min(beauty.width, x1+padding), min(beauty.height, y1+padding))
crop = beauty.crop(bounds)
alpha = island.crop(bounds)
width, height = crop.size
world_width = 240
world_height = world_width * height / width
edge = island.point(lambda x: 255 if 5 < x < 40 else 0)
ocean = tuple(round(v) for v in ImageStat.Stat(beauty, edge).mean)
sources = [
    'scripts/atlas/lagoon-native-view.js',
    'scripts/atlas/lagoon-native-bake.js',
    'scripts/atlas/pack-lagoon-bake.py',
    'packages/world-sources/lagoon/original/assets/index-BjH0GYGf.js',
]
manifest = {
    'version': 1, 'id': 'lagoon', 'name': 'Lagoon Tree Village',
    'credit': {'name': 'cryptomanavan', 'url': 'https://lagoon-tree-village-creatures.netlify.app/'},
    'frame': {'width': world_width, 'height': world_height},
    'oceanColor': '#%02x%02x%02x' % ocean,
    'capture': {**capture, 'crop': bounds},
    'sourceHashes': {p: hashlib.sha256((ROOT / p).read_bytes()).hexdigest() for p in sources},
    'tiers': [],
}

# Catch a failed semantic pass before publishing assets. A single tree or the
# waterfalls must not turn into a mostly transparent copy of the whole island.
for component in capture['components']:
    if component['id'].startswith('canopy-') or component['id'] == 'falls':
        matte = Image.open(CAPTURE / f"{component['id']}.png").convert('L').crop(bounds)
        box = matte.point(lambda x: 255 if x > 2 else 0).getbbox()
        assert box and box[2]-box[0] < width*.6 and box[3]-box[1] < height*.6, component['id']

for resolution in [384, 1024, 2048]:
    scale = resolution / width
    folder = OUT / str(resolution)
    folder.mkdir(exist_ok=True)
    layers = []
    items = [{'id': 'base', 'effect': 'still'}]
    if resolution > 384:
        items += capture['components']
    for item in items:
        matte = alpha if item['id'] == 'base' else ImageChops.multiply(
            Image.open(CAPTURE / f"{item['id']}.png").convert('L').crop(bounds), alpha)
        box = matte.point(lambda x: 255 if x > 2 else 0).getbbox()
        if box is None:
            raise ValueError(f"Empty native component: {item['id']}")
        bx0, by0, bx1, by1 = box
        box = (max(0,bx0-4), max(0,by0-4), min(width,bx1+4), min(height,by1+4))
        sprite = crop.convert('RGBA')
        sprite.putalpha(matte)
        sprite = sprite.crop(box)
        size = (max(1,round(sprite.width*scale)), max(1,round(sprite.height*scale)))
        sprite = sprite.resize(size, Image.Resampling.LANCZOS)
        filename = f"{resolution}/{item['id']}.webp"
        # Same quality for base + detail avoids mismatched overlapping colour.
        encoded = BytesIO()
        sprite.save(encoded, 'WEBP', quality=92, method=6, exact=True)
        temporary = (OUT / filename).with_suffix('.webp.tmp')
        temporary.write_bytes(encoded.getvalue())
        temporary.replace(OUT / filename)
        layers.append({
            **item, 'src': filename, 'pixels': size,
            'rect': [(box[0]/width-.5)*world_width, (.5-box[1]/height)*world_height,
                     (box[2]-box[0])/width*world_width, (box[3]-box[1])/height*world_height],
            'bytes': (OUT / filename).stat().st_size,
        })
    manifest['tiers'].append({
        'resolution': resolution, 'layers': layers,
        'bytes': sum(l['bytes'] for l in layers),
        'textureBytes': sum(l['pixels'][0]*l['pixels'][1]*4*4//3 for l in layers),
    })
    print(f"{resolution}px: {len(layers)} layers, {manifest['tiers'][-1]['bytes']/1024:.0f} KiB, "
          f"{manifest['tiers'][-1]['textureBytes']/1024**2:.1f} MiB GPU incl. mipmaps")

(OUT / 'tile.json.tmp').write_text(json.dumps(manifest, indent=2) + '\n')
(OUT / 'tile.json.tmp').replace(OUT / 'tile.json')
print(f'Packed {OUT}/tile.json')
