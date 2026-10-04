export const packages = [
  {
    id: 'meadow', name: 'Meadow grass', author: 'Michel van den Berg', kind: 'Component', category: 'Vegetation',
    image: '/creators/michel-meadow-preview.webp', avatar: '/creators/michel-avatar.jpg', color: '#92aa80',
    description: 'Dense grass with soft lighting and moving tree shadows.',
    source: 'https://x.com/promontis/status/2102724225710838097',
  },
  {
    id: 'birds', name: 'Little Birds', author: 'Brian Gruber', kind: 'Component', category: 'Wildlife',
    image: '/creators/gruber-preview.webp', avatar: '/creators/gruber-avatar.jpg', color: '#c3a477',
    description: 'Shorebirds gathering at the water’s edge, with gulls and reflections.',
    source: 'https://x.com/gruberbuilds/status/2102932664634249399',
  },
  {
    id: 'tidewater', name: 'Tidewater', author: 'Dan Greenheck', kind: 'Scene', category: 'Coastline',
    image: '/creators/dan-tidewater-preview.webp', avatar: '/creators/dan-greenheck-avatar.jpg', color: '#7caab9',
    description: 'A coastal world of fishing huts, wooden piers and open water.',
    source: 'https://dgreenheck.github.io/tidewater/',
  },
  {
    id: 'lagoon', name: 'Lagoon Tree Village', author: 'cryptomanavan', kind: 'Scene', category: 'Village',
    image: '/creators/manavan-preview.webp', avatar: '/creators/manavan-avatar.jpg', color: '#97b3a9',
    description: 'Treehouses and suspended bridges above a turquoise lagoon.',
    source: 'https://lagoon-tree-village-creatures.netlify.app/',
  },
  {
    id: 'sakura', name: 'Sakura River Valley', author: 'Meng To', kind: 'Scene', category: 'Landscape',
    image: '/creators/meng-to-preview.webp', avatar: '/creators/meng-to-avatar.png', color: '#c69fab',
    description: 'Cherry blossoms, a red bridge and a boat journey through a Japanese valley.',
    source: 'https://valley.mengto.here.now/',
  },
  {
    id: 'punk', name: 'Threejs-Punk', author: 'Anderson Mancini & Sunag', kind: 'Scene', category: 'City',
    image: '/creators/anderson-punk-drive-preview.webp', avatar: '/creators/anderson-mancini-avatar.jpg', color: '#aa97b9',
    description: 'A neon-lit street with rain, wet surfaces and reflections.',
    source: 'https://www.threejspunk.com/',
  },
] as const;

export type PackageId = typeof packages[number]['id'];
export type Package = typeof packages[number];
export const packageById = (id: PackageId) => packages.find(item => item.id === id)!;

// Illustrative compositions for the landing-page prototype. These are not
// dependency claims about the original demos, or live world coordinates.
export interface Location { id: string; name: string; position: string; tile: string; packages: PackageId[] }
export const locations: Location[] = [
  { id: 'riverbank', name: 'Riverbank', position: '24, 2, 18', tile: '0, 0', packages: ['tidewater', 'meadow', 'birds'] },
  { id: 'village', name: 'Tree village', position: '68, 4, 32', tile: '1, 0', packages: ['lagoon', 'meadow', 'birds'] },
  { id: 'garden', name: 'Sakura garden', position: '42, 3, 86', tile: '0, 1', packages: ['sakura', 'tidewater', 'meadow', 'birds'] },
  { id: 'city', name: 'City canal', position: '112, 1, 46', tile: '2, 0', packages: ['punk', 'tidewater', 'birds'] },
];
