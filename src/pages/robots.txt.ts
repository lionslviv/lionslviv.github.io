import type { APIRoute } from 'astro';

// robots.txt з урахуванням домену і BASE_PATH (GitHub Pages або власний домен)
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const hidden = ['/admin', '/account', '/login', '/news/post', '/styleguide', '/og-card'];
  const lines = ['User-agent: *', ...hidden.flatMap((p) => [`Disallow: ${base}${p}`, `Disallow: ${base}/uk${p}`]), 'Allow: /', '', `Sitemap: ${new URL(`${base}/sitemap.xml`, site)}`];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
