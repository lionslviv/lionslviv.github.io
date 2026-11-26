// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// BASE_PATH: '/' локально і на власному домені,
// '/<repo>/' для GitHub Pages без власного домену (виставляє workflow).
const base = process.env.BASE_PATH || '/';
const site = process.env.SITE_URL || 'https://lionslviv.github.io';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  vite: { plugins: [tailwindcss()] },
});
