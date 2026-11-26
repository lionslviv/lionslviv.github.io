// Маніфест офіційних файлів Lions International, які використовує сайт.
// Файли не малюються і не генеруються: їх завантажує член клубу з
// https://www.lionsclubs.org/en/logos і кладе в public/brand/ під іменами нижче.
// Формат: SVG бажано, PNG з прозорим фоном теж підходить.
import fs from 'node:fs';
import path from 'node:path';

export type AssetKey =
  | 'emblem' | 'emblem-white'
  | 'signature-lci' | 'signature-lci-white'
  | 'icon-vision' | 'icon-hunger' | 'icon-environment' | 'icon-diabetes' | 'icon-cancer' | 'icon-humanitarian' | 'icon-youth';

export const brandAssets: { key: AssetKey; title: string; source: string; where: string }[] = [
  { key: 'emblem', title: 'Емблема, двоколірна', source: 'Lions Emblems → Two Color', where: 'Шапка сайту, сторінка «Бренд»' },
  { key: 'emblem-white', title: 'Емблема, біла', source: 'Lions Emblems → One Color, White', where: 'Hero, футер, обкладинка для соцмереж' },
  { key: 'signature-lci', title: 'Підпис Lions Clubs International', source: 'Lions Clubs International Signatures → Horizontal, Two Color', where: 'Сторінка «Про клуб»' },
  { key: 'signature-lci-white', title: 'Підпис Lions Clubs International, білий', source: 'Lions Clubs International Signatures → Horizontal, One Color, White', where: 'Футер' },
  { key: 'icon-vision', title: 'Іконка: Зір', source: 'Service Icons → Vision, Full Color', where: 'Напрями служіння, теги проєктів' },
  { key: 'icon-hunger', title: 'Іконка: Голод', source: 'Service Icons → Hunger, Full Color', where: 'Напрями служіння' },
  { key: 'icon-environment', title: 'Іконка: Довкілля', source: 'Service Icons → Environment, Full Color', where: 'Напрями служіння' },
  { key: 'icon-diabetes', title: 'Іконка: Діабет', source: 'Service Icons → Diabetes, Full Color', where: 'Напрями служіння' },
  { key: 'icon-cancer', title: 'Іконка: Дитячий рак', source: 'Service Icons → Childhood Cancer, Full Color', where: 'Напрями служіння' },
  { key: 'icon-humanitarian', title: 'Іконка: Гуманітарна допомога', source: 'Service Icons → LCIF Humanitarian Efforts, Full Color', where: 'Напрями служіння' },
  { key: 'icon-youth', title: 'Іконка: Молодь', source: 'Service Icons → LCIF Youth, Full Color', where: 'Напрями служіння' },
];

const PUBLIC = path.join(process.cwd(), 'public');

/** Повертає шлях від кореня сайту ('/brand/emblem.svg') або null, якщо файлу ще немає. */
export function assetPath(key: AssetKey): string | null {
  for (const ext of ['svg', 'png', 'webp']) {
    const rel = `/brand/${key}.${ext}`;
    if (fs.existsSync(path.join(PUBLIC, rel))) return rel;
  }
  return null;
}

export const causeIcon: Record<string, AssetKey> = {
  vision: 'icon-vision', hunger: 'icon-hunger', environment: 'icon-environment', diabetes: 'icon-diabetes',
  cancer: 'icon-cancer', humanitarian: 'icon-humanitarian', youth: 'icon-youth',
};
