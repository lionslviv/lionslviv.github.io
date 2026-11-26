import type { APIRoute } from 'astro';
import { news } from '../../data/content';
import { club } from '../../data/site';
import { langPaths, langOf, tr } from '../../i18n';
export const getStaticPaths = langPaths;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// RSS: /news.xml англійською, /uk/news.xml українською
export const GET: APIRoute = ({ site, params }) => {
  const lang = langOf(params.lang);
  const base = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${lang === 'uk' ? '/uk' : ''}`;
  const link = (p: string) => new URL(`${base}${p}`, site).toString();
  const items = [...news].sort((a, b) => b.date.localeCompare(a.date)).map((n) => `
    <item><title>${esc(tr(lang, n.title))}</title><link>${link(`/news/${n.slug}`)}</link><guid>${link(`/news/${n.slug}`)}</guid>
    <pubDate>${new Date(n.date).toUTCString()}</pubDate><description>${esc(tr(lang, n.excerpt))}</description></item>`).join('');
  const title = lang === 'uk' ? `${club.name}: новини` : `${club.name}: news`;
  const desc = lang === 'uk' ? 'Новини клубу Lions International у Львові' : 'News from the Lions International club in Lviv';
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>
    <title>${esc(title)}</title><link>${link('/')}</link><language>${lang === 'uk' ? 'uk' : 'en'}</language>
    <description>${desc}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
