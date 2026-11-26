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
const files = walk(src).filter((f) => /\.(svg|png)$/i.test(f)); // JPG/EPS лишаються для друку
const norm = (f) => path.basename(f).toLowerCase().replace(/[^a-z0-9]+/g, ' ');

const has = (n, ...words) => words.every((w) => new RegExp(w).test(n));
const not = (n, ...words) => words.every((w) => !new RegExp(w).test(n));
const icon = (topic) => (n) => has(n, topic) && not(n, 'one colou?r', 'white', 'black', 'b w');

const rules = {
  'emblem': (n) => has(n, 'emblem') && has(n, '(two|2) ?colou?r|2c|2color') && not(n, 'white', 'black', 'b w', 'signature', 'lcif', 'leo'),
  'emblem-blue': (n) => has(n, 'emblem') && has(n, 'blue') && not(n, 'signature', 'lcif', 'leo'),
  'signature-white': (n) => has(n, 'signature') && has(n, 'horz|horizontal') && has(n, 'white') && not(n, 'lcif', 'leo'),
  'signature': (n) => has(n, 'signature') && has(n, 'horz|horizontal') && has(n, '2c|two colou?r|3c|three colou?r') && not(n, 'white', 'black', 'lcif', 'leo', 'cmyk'),
  'signature-vertical-white': (n) => has(n, 'signature') && has(n, 'vert') && has(n, 'white') && not(n, 'lcif', 'leo'),
  'signature-vertical': (n) => has(n, 'signature') && has(n, 'vert') && has(n, '3c|three colou?r') && not(n, 'white', 'black', 'lcif', 'leo', 'cmyk'),
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
