import { CanvasTexture, LinearFilter, LinearMipmapLinearFilter } from 'three';

/** Local font mask: red holds the letters, green holds their soft light. */
export function createPortalLabel(label: HTMLElement) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  if (!context) return null;

  const fontSize = 160;
  const font = `500 ${fontSize}px ${getComputedStyle(label).fontFamily}`;
  const letters = Array.from((label.textContent || 'Enter').trim().toUpperCase());
  const tracking = fontSize * .22;
  const texture = new CanvasTexture(canvas);
  // Filter the fine strokes across pixels so gentle refraction cannot make them shimmer.
  texture.minFilter = LinearMipmapLinearFilter;
  texture.magFilter = LinearFilter;
  let disposed = false;

  const paint = () => {
    if (disposed) return;
    context.shadowBlur = 0;
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = font;
    context.textBaseline = 'alphabetic';
    const metrics = context.measureText(letters.join(''));
    const widths = letters.map((letter) => context.measureText(letter).width);
    const width = widths.reduce((sum, value) => sum + value, 0) + tracking * (letters.length - 1);
    const baseline = (canvas.height + metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
    const drawLetters = () => {
      let x = (canvas.width - width) / 2;
      letters.forEach((letter, index) => {
        context.fillText(letter, x, baseline);
        x += widths[index] + tracking;
      });
    };

    context.fillStyle = context.shadowColor = '#00ff00';
    context.shadowBlur = 18;
    drawLetters();
    context.fillStyle = '#ff0000';
    context.shadowBlur = 0;
    drawLetters();
    texture.needsUpdate = true;
  };
  paint();

  return {
    texture,
    widthPerEm: canvas.width / fontSize,
    heightPerEm: canvas.height / fontSize,
    // Refresh after the bundled font arrives, including in reduced-motion mode.
    ready: document.fonts.load(font, letters.join('')).then(paint).catch(() => {}),
    dispose() { disposed = true; texture.dispose(); },
  };
}
