// Усі внутрішні посилання проходять через u(), щоб сайт працював
// і на власному домені, і в підпапці GitHub Pages (/<repo>/).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function u(path = '/'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}` || '/';
}

export function isActive(current: string, href: string): boolean {
  const c = current.replace(BASE, '').replace(/\/$/, '') || '/';
  const h = href.replace(/\/$/, '') || '/';
  return h === '/' ? c === '/' : c === h || c.startsWith(`${h}/`);
}
