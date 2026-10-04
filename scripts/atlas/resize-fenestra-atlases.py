"""Map-sized versions of the actual MIT-licensed three-fenestra starter atlases."""
from pathlib import Path
from PIL import Image

for name, size in [('rooms', 512), ('overlay', 256)]:
    image = Image.open(Path('node_modules/three-fenestra/starter') / f'{name}.webp')
    image.resize((size, size), Image.Resampling.LANCZOS).save(
        Path('public/map/lite/punk') / f'{name}.webp', quality=90)
