import type { APIRoute } from 'astro';
import { news, projects, events, albums, members } from '../data/content';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const paths = [
    '/', '/about', '/projects', '/news', '/events', '/gallery', '/members', '/support', '/join', '/reviews', '/contacts', '/privacy', '/en',
    ...projects.map((p) => `/projects/${p.slug}`),
    ...news.map((p) => `/news/${p.slug}`),
    ...events.filter((e) => e.visibility === 'public').map((e) => `/events/${e.slug}`),
    ...albums.map((a) => `/gallery/${a.slug}`),
    ...members.filter((m) => m.board).map((m) => `/members/${m.slug}`),
  ];
  const urls = paths.map((p) => `<url><loc>${new URL(`${base}${p}`, site)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
