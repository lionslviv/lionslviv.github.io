// Маніфест офіційних файлів Lions International, які використовує сайт.
// Файли не малюються і не генеруються. Оригінали з https://www.lionsclubs.org/en/logos
// лежать у docs/brand/logos/, веб-копії (PNG, обрізані лише прозорі поля) у public/brand/.
import fs from 'node:fs';
import path from 'node:path';
import type { L } from '../i18n';

export type AssetKey =
  | 'emblem' | 'emblem-blue'
  | 'signature' | 'signature-white' | 'signature-vertical' | 'signature-vertical-white'
  | 'icon-vision' | 'icon-hunger' | 'icon-environment' | 'icon-diabetes' | 'icon-cancer' | 'icon-humanitarian' | 'icon-youth';

export type BrandAssetInfo = { key: AssetKey; title: L; source: string; file?: string; where: L; dark?: boolean; group: 'emblem' | 'signature' | 'icon' };

const causesWhere: L = { en: 'Causes', uk: 'Напрями служіння' };

export const brandAssets: BrandAssetInfo[] = [
  { key: 'emblem', group: 'emblem', title: { en: 'Emblem, two colour', uk: 'Емблема, двоколірна' }, source: 'Lions Emblems → Two Color', file: 'LCI_emblem_2color_web.png', where: { en: 'Site header', uk: 'Шапка сайту' } },
  { key: 'emblem-blue', group: 'emblem', title: { en: 'Emblem, blue', uk: 'Емблема, синя' }, source: 'Lions Emblems → One Color, Blue', file: 'LCI_emblem_blue.png', where: { en: 'Documents, Brand page', uk: 'Документи, сторінка «Бренд»' } },
  { key: 'signature', group: 'signature', title: { en: 'Lions International signature, horizontal', uk: 'Підпис Lions International, горизонтальний' }, source: 'Lions International Signatures → Horizontal, Two Color, Blue Text', file: 'Logo_rgb_LI_Signature_Horz1_2C_BlueText.png', where: { en: 'About page', uk: '«Про клуб»' } },
  { key: 'signature-white', group: 'signature', title: { en: 'Lions International signature, white', uk: 'Підпис Lions International, білий' }, source: 'Lions International Signatures → Horizontal, One Color, White', file: 'Logo_rgb_LI_Signature_Horz1_1C_White.png', where: { en: 'Home hero, footer', uk: 'Hero головної, футер' }, dark: true },
  { key: 'signature-vertical', group: 'signature', title: { en: 'Lions International signature, vertical', uk: 'Підпис Lions International, вертикальний' }, source: 'Lions International Signatures → Vertical, Three Color', file: 'Logo_rgb_LI_Signature_Vert1_3C.png', where: { en: 'Brand page', uk: 'Сторінка «Бренд»' } },
  { key: 'signature-vertical-white', group: 'signature', title: { en: 'Lions International signature, vertical white', uk: 'Підпис Lions International, вертикальний білий' }, source: 'Lions International Signatures → Vertical, One Color, White', file: 'Logo_rgb_LI_Signature_Vert1_1C_White.png', where: { en: 'Social media cover', uk: 'Обкладинка для соцмереж' }, dark: true },
  { key: 'icon-vision', group: 'icon', title: { en: 'Icon: Vision', uk: 'Іконка: Зір' }, source: 'Service Icons → Vision, Full Color', where: { en: 'Causes, project tags', uk: 'Напрями служіння, теги проєктів' } },
  { key: 'icon-hunger', group: 'icon', title: { en: 'Icon: Hunger', uk: 'Іконка: Голод' }, source: 'Service Icons → Hunger, Full Color', where: causesWhere },
  { key: 'icon-environment', group: 'icon', title: { en: 'Icon: Environment', uk: 'Іконка: Довкілля' }, source: 'Service Icons → Environment, Full Color', where: causesWhere },
  { key: 'icon-diabetes', group: 'icon', title: { en: 'Icon: Diabetes', uk: 'Іконка: Діабет' }, source: 'Service Icons → Diabetes, Full Color', where: causesWhere },
  { key: 'icon-cancer', group: 'icon', title: { en: 'Icon: Childhood cancer', uk: 'Іконка: Дитячий рак' }, source: 'Service Icons → Childhood Cancer, Full Color', where: causesWhere },
  { key: 'icon-humanitarian', group: 'icon', title: { en: 'Icon: Humanitarian aid', uk: 'Іконка: Гуманітарна допомога' }, source: 'Service Icons → LCIF Humanitarian Efforts, Full Color', where: causesWhere },
  { key: 'icon-youth', group: 'icon', title: { en: 'Icon: Youth', uk: 'Іконка: Молодь' }, source: 'Service Icons → LCIF Youth, Full Color', where: causesWhere },
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
