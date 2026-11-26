import type { APIRoute } from 'astro';
import { news } from '../data/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const link = (p: string) => new URL(`${base}${p}`, site).toString();
  const items = [...news].sort((a, b) => b.date.localeCompare(a.date)).map((n) => `
    <item><title>${esc(n.title)}</title><link>${link(`/news/${n.slug}`)}</link><guid>${link(`/news/${n.slug}`)}</guid>
    <pubDate>${new Date(n.date).toUTCString()}</pubDate><description>${esc(n.excerpt)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>
    <title>Lviv International Lions Club: новини</title><link>${link('/')}</link><language>uk</language>
    <description>Новини клубу Lions International у Львові</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
