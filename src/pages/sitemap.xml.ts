import type { APIRoute } from 'astro';
import { news, projects, events, albums, members } from '../data/content';

// Карта сайту для обох мов з hreflang-альтернативами (EN основна, UK під /uk).
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const paths = [
    '/', '/about', '/projects', '/news', '/events', '/gallery', '/members', '/support', '/join', '/reviews', '/contacts', '/privacy', '/brand',
    ...projects.map((p) => `/projects/${p.slug}`),
    ...news.map((p) => `/news/${p.slug}`),
    ...events.filter((e) => e.visibility === 'public').map((e) => `/events/${e.slug}`),
    ...albums.map((a) => `/gallery/${a.slug}`),
    ...members.filter((m) => m.board && m.real).map((m) => `/members/${m.slug}`),
  ];
  const abs = (p: string) => new URL(`${base}${p}`, site).toString();
  const en = (p: string) => abs(p);
  const uk = (p: string) => abs(p === '/' ? '/uk' : `/uk${p}`);
  const alt = (p: string) => `<xhtml:link rel="alternate" hreflang="en" href="${en(p)}"/><xhtml:link rel="alternate" hreflang="uk" href="${uk(p)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${en(p)}"/>`;
  const urls = paths.flatMap((p) => [`<url><loc>${en(p)}</loc>${alt(p)}</url>`, `<url><loc>${uk(p)}</loc>${alt(p)}</url>`]).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
