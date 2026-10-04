export const MY_PACKAGES_PATH = '/packages/my';
export const EXPLORE_PACKAGES_PATH = '/packages';
export const MY_TILES_PATH = '/tiles/my';

/** Keep old links and sign-in return URLs on the canonical creator pages. */
export function canonicalCreatorPath(path: string): string {
  if (path === '/tiles/mine' || path === '/tiles/mine/' || path === `${MY_TILES_PATH}/`) return MY_TILES_PATH;
  if (path === '/catalog' || path === '/catalog/' || path === `${EXPLORE_PACKAGES_PATH}/`) return EXPLORE_PACKAGES_PATH;
  return path === '/' || path === '/index.html' || path === `${MY_PACKAGES_PATH}/`
    ? MY_PACKAGES_PATH
    : path;
}
