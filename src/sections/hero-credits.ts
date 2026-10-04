/** Keep the desktop markers attached to their points in the cropped artwork. */
export function mountHeroCredits(hero: HTMLElement) {
  const image = hero.querySelector<HTMLImageElement>('.hero-figure img')!;
  const credits = [...hero.querySelectorAll<HTMLElement>('[data-world-x]')];
  const buttons = [...hero.querySelectorAll<HTMLButtonElement>('[data-credit-dialog]')];

  const positionCredits = () => {
    if (window.innerWidth < 1200 || !image.naturalWidth) return;
    const { width, height } = image.getBoundingClientRect();
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const renderedWidth = image.naturalWidth * scale;
    const renderedHeight = image.naturalHeight * scale;
    const [xPosition, yPosition] = getComputedStyle(image).objectPosition.split(' ').map(parseFloat);

    for (const credit of credits) {
      const x = Number(credit.dataset.worldX) * renderedWidth + (width - renderedWidth) * xPosition / 100;
      const y = Number(credit.dataset.worldY) * renderedHeight + (height - renderedHeight) * yPosition / 100;
      credit.style.setProperty('--anchor-x', `${x}px`);
      credit.style.setProperty('--anchor-y', `${y}px`);
    }
  };

  new ResizeObserver(positionCredits).observe(image);
  image.addEventListener('load', positionCredits);
  positionCredits();

  for (const button of buttons) {
    const dialog = document.getElementById(button.dataset.creditDialog!) as HTMLDialogElement;
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      dialog.showModal();
      button.setAttribute('aria-expanded', 'true');
    });
    dialog.addEventListener('close', () => button.setAttribute('aria-expanded', 'false'));
    // Backdrop dismissal also works in browsers without the closedby attribute.
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => dialog.close());
    });
  }
}
