// Маніфест офіційних файлів Lions International, які використовує сайт.
// Файли не малюються і не генеруються. Оригінали з https://www.lionsclubs.org/en/logos
// лежать у docs/brand/logos/, веб-копії (PNG, обрізані лише прозорі поля) у public/brand/.
import fs from 'node:fs';
import path from 'node:path';

export type AssetKey =
  | 'emblem' | 'emblem-blue'
  | 'signature' | 'signature-white' | 'signature-vertical' | 'signature-vertical-white'
  | 'icon-vision' | 'icon-hunger' | 'icon-environment' | 'icon-diabetes' | 'icon-cancer' | 'icon-humanitarian' | 'icon-youth';

export type BrandAssetInfo = { key: AssetKey; title: string; source: string; file?: string; where: string; dark?: boolean; group: 'emblem' | 'signature' | 'icon' };

export const brandAssets: BrandAssetInfo[] = [
  { key: 'emblem', group: 'emblem', title: 'Емблема, двоколірна', source: 'Lions Emblems → Two Color', file: 'LCI_emblem_2color_web.png', where: 'Шапка сайту' },
  { key: 'emblem-blue', group: 'emblem', title: 'Емблема, синя', source: 'Lions Emblems → One Color, Blue', file: 'LCI_emblem_blue.png', where: 'Документи, сторінка «Бренд»' },
  { key: 'signature', group: 'signature', title: 'Підпис Lions International, горизонтальний', source: 'Lions International Signatures → Horizontal, Two Color, Blue Text', file: 'Logo_rgb_LI_Signature_Horz1_2C_BlueText.png', where: '«Про клуб»' },
  { key: 'signature-white', group: 'signature', title: 'Підпис Lions International, білий', source: 'Lions International Signatures → Horizontal, One Color, White', file: 'Logo_rgb_LI_Signature_Horz1_1C_White.png', where: 'Hero головної, футер', dark: true },
  { key: 'signature-vertical', group: 'signature', title: 'Підпис Lions International, вертикальний', source: 'Lions International Signatures → Vertical, Three Color', file: 'Logo_rgb_LI_Signature_Vert1_3C.png', where: 'Сторінка «Бренд»' },
  { key: 'signature-vertical-white', group: 'signature', title: 'Підпис Lions International, вертикальний білий', source: 'Lions International Signatures → Vertical, One Color, White', file: 'Logo_rgb_LI_Signature_Vert1_1C_White.png', where: 'Обкладинка для соцмереж', dark: true },
  { key: 'icon-vision', group: 'icon', title: 'Іконка: Зір', source: 'Service Icons → Vision, Full Color', where: 'Напрями служіння, теги проєктів' },
  { key: 'icon-hunger', group: 'icon', title: 'Іконка: Голод', source: 'Service Icons → Hunger, Full Color', where: 'Напрями служіння' },
  { key: 'icon-environment', group: 'icon', title: 'Іконка: Довкілля', source: 'Service Icons → Environment, Full Color', where: 'Напрями служіння' },
  { key: 'icon-diabetes', group: 'icon', title: 'Іконка: Діабет', source: 'Service Icons → Diabetes, Full Color', where: 'Напрями служіння' },
  { key: 'icon-cancer', group: 'icon', title: 'Іконка: Дитячий рак', source: 'Service Icons → Childhood Cancer, Full Color', where: 'Напрями служіння' },
  { key: 'icon-humanitarian', group: 'icon', title: 'Іконка: Гуманітарна допомога', source: 'Service Icons → LCIF Humanitarian Efforts, Full Color', where: 'Напрями служіння' },
  { key: 'icon-youth', group: 'icon', title: 'Іконка: Молодь', source: 'Service Icons → LCIF Youth, Full Color', where: 'Напрями служіння' },
];

const PUBLIC = path.join(process.cwd(), 'public');

/** Повертає шлях від кореня сайту ('/brand/emblem.png') або null, якщо файлу ще немає. */
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
