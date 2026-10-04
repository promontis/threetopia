export type SiteSection = 'home' | 'creators' | 'docs' | 'map';
export function siteNavigation(current: SiteSection, options?: { actions?: string }): string;
