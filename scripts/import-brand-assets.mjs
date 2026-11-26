#!/usr/bin/env node
// Імпорт офіційних файлів Lions у public/brand/ під іменами, які очікує сайт.
// 1) Завантажте файли з https://www.lionsclubs.org/en/logos (потрібен статус члена Lions).
// 2) Покладіть їх в одну папку (можна з підпапками) і запустіть:
//      node scripts/import-brand-assets.mjs ~/Downloads/lions-logos
// Скрипт лише копіює файли без змін. Нерозпізнані файли покаже окремо,
// їх можна перейменувати вручну за таблицею в docs/brand/README.md.
import fs from 'node:fs';
import path from 'node:path';

const src = process.argv[2];
if (!src || !fs.existsSync(src)) {
  console.error('Вкажіть папку з завантаженими файлами: node scripts/import-brand-assets.mjs <папка>');
  process.exit(1);
}
const out = path.resolve('public/brand');
fs.mkdirSync(out, { recursive: true });

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const files = walk(src).filter((f) => /\.(svg|png)$/i.test(f));
const norm = (f) => path.basename(f).toLowerCase().replace(/[^a-z0-9]+/g, ' ');

const has = (n, ...words) => words.every((w) => new RegExp(w).test(n));
const not = (n, ...words) => words.every((w) => !new RegExp(w).test(n));
const icon = (topic) => (n) => has(n, topic) && not(n, 'one colou?r', 'white', 'black', 'b w');

const rules = {
  'emblem-white': (n) => has(n, 'emblem', 'white') && not(n, 'signature', 'lcif', 'foundation', 'leo'),
  'emblem': (n) => has(n, 'emblem') && has(n, '(two|2) ?colou?r|2c|full colou?r') && not(n, 'white', 'black', 'b w', 'signature', 'lcif', 'leo'),
  'signature-lci-white': (n) => has(n, 'signature|lci|clubs international') && has(n, 'white') && not(n, 'lcif', 'foundation', 'vertical', 'leo'),
  'signature-lci': (n) => has(n, 'signature|lci|clubs international') && has(n, 'horizontal') && not(n, 'white', 'black', 'b w', 'lcif', 'foundation', 'leo'),
  'icon-vision': icon('vision|sight'),
  'icon-hunger': icon('hunger'),
  'icon-environment': icon('environment'),
  'icon-diabetes': icon('diabetes'),
  'icon-cancer': icon('cancer'),
  'icon-humanitarian': icon('humanitarian'),
  'icon-youth': icon('youth'),
};

const used = new Set();
for (const [key, test] of Object.entries(rules)) {
  const hits = files.filter((f) => !used.has(f) && test(norm(f)));
  const pick = hits.find((f) => /\.svg$/i.test(f)) ?? hits[0];
  if (!pick) { console.log(`  - ${key}: не знайдено`); continue; }
  used.add(pick);
  const ext = path.extname(pick).toLowerCase();
  for (const e of ['.svg', '.png']) if (e !== ext) fs.rmSync(path.join(out, key + e), { force: true });
  fs.copyFileSync(pick, path.join(out, key + ext));
  console.log(`  ✓ ${key}${ext}  ←  ${path.relative(src, pick)}`);
}
const rest = files.filter((f) => !used.has(f));
if (rest.length) console.log(`\nНе використано ${rest.length} файл(ів). За потреби перейменуйте вручну (див. docs/brand/README.md).`);
console.log('\nДалі: npm run build. Сторінка /brand покаже, які файли вже додано.');
