import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Plugin } from 'vite';
import { siteNavigation, type SiteSection } from '../src/shared/site-navigation.js';

const root = fileURLToPath(new URL('../', import.meta.url));

/** Render the shared navigation before first paint, including without app JS. */
export function siteNavigationHtml(): Plugin {
  return {
    name: 'threetopia-site-navigation',
    transformIndexHtml: {
      order: 'pre',
      handler: html => html.replace(/<!--\s*site-navigation:(home|creators)\s*-->/g, (_, section: SiteSection) =>
        siteNavigation(section)),
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('/src/shared/site-navigation.js')) server.ws.send({ type: 'full-reload' });
    },
  };
}

/** Inline `<!-- include:path/to/partial.html -->` so sections stay static HTML. */
export function partials(development:boolean): Plugin {
  const inline = (html: string, ancestors: string[] = []): string => html.replace(/<!--\s*include:\s*([\w./-]+)\s*-->/g, (_, file: string) => {
    if (ancestors.includes(file)) throw new Error(`Circular HTML include: ${file}`);
    return inline(readFileSync(root + file, 'utf8'), [...ancestors, file]);
  });
  return {
    name: 'threetopia-partials',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => {
        const result=inline(html);
        return development?result.replaceAll('href="https://world.threetopia.com/"','href="/world/"').replaceAll('href="https://threetopia.com/"','href="/"'):result;
      },
    },
    handleHotUpdate({ file, server }) {
      if (file.includes('/src/sections/') && file.endsWith('.html')) server.ws.send({ type: 'full-reload' });
    },
  };
}

/** The landing uses r184; the connected world and its map share r186. */
export function worldSources(): Plugin {
  return {
    name: 'threetopia-world-sources',
    enforce: 'pre',
    async resolveId(source, importer) {
      if (!importer || !(/^three(?:\/|$)/.test(source))) return;
      if (!importer.includes('/packages/world-sources/') && !importer.includes('/packages/world-map/') && !importer.includes('/packages/platform/') && !importer.includes('/src/creators/') && !importer.includes('/src/explore/') && !importer.includes('/src/tiles/') && !importer.includes('/three@0.186.0/') && !importer.includes('/three-mesh-bvh@') && !importer.includes('/three-fenestra')) return;
      return this.resolve(source.replace(/^three/, 'three-world'), importer, { skipSelf: true });
    },
    transform(code, id) {
      if (!id.includes('/packages/world-sources/punk/src/')) return;
      // Scope original absolute asset paths to the package; preserve the source factories.
      return code.replace(/(["'`])\/(models|textures|libs|hdri|video)\//g, '$1/world-assets/punk/$2/')
        .replace(/(["'`])\/(custom_noise\.webp|custom_perlin\.webp)/g, '$1/world-assets/punk/$2');
    },
  };
}
