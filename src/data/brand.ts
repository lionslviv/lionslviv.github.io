// Дані з офіційних брендбуків Lions International.
// Джерела (перевірено 26.11.2026):
//  - Lions International Brand Guidelines, V4.0 FULL, 05/23 EN
//  - Lions Clubs International Club Brand Guidelines, V1.0 CLUB, 09/19 EN
// Локальні копії PDF кладуться в public/brand/ (див. scripts/fetch-brand-assets.sh).

import type { L } from '../i18n';

export type BrandColor = { name: string; pantone: string; cmyk: string; rgb: string; hex: string; role: 'primary' | 'secondary'; use: L };

export const brandColors: BrandColor[] = [
  { name: 'Blue', pantone: 'Pantone 287', cmyk: '100 72 2 12', rgb: '0 51 141', hex: '#00338D', role: 'primary', use: { en: 'Headings, links, main buttons, large fills.', uk: 'Заголовки, посилання, основні кнопки, великі заливки.' } },
  { name: 'Yellow', pantone: 'Pantone 7406', cmyk: '0 17 100 0', rgb: '235 183 0', hex: '#EBB700', role: 'primary', use: { en: 'Action buttons, accents. Not for text on white.', uk: 'Кнопки дії, акценти. Не для тексту на білому.' } },
  { name: 'Purple', pantone: 'Pantone 2612', cmyk: '64 100 11 2', rgb: '122 38 130', hex: '#7A2582', role: 'primary', use: { en: 'Primary since V4.0. On the site: hero gradient, rare accents.', uk: 'Основний з V4.0. На сайті: градієнт hero, рідкісні акценти.' } },
  { name: 'Blue light', pantone: 'Pantone 660', cmyk: '75 47 0 0', rgb: '64 124 202', hex: '#407CCA', role: 'secondary', use: { en: 'Field focus, illustrations.', uk: 'Фокус полів, ілюстрації.' } },
  { name: 'Navy', pantone: 'Pantone 289', cmyk: '98 84 45 51', rgb: '13 34 64', hex: '#0D2240', role: 'secondary', use: { en: 'Hero, footer, dark sections.', uk: 'Hero, футер, темні секції.' } },
  { name: 'Cool Gray 11', pantone: 'Cool Gray 11', cmyk: '65 57 52 29', rgb: '85 86 90', hex: '#55565A', role: 'secondary', use: { en: 'Secondary text.', uk: 'Другорядний текст.' } },
  { name: 'Cool Gray 5', pantone: 'Cool Gray 5', cmyk: '13 9 10 27', rgb: '179 178 177', hex: '#B3B2B1', role: 'secondary', use: { en: 'Inactive elements, placeholders.', uk: 'Неактивні елементи, плейсхолдери.' } },
  { name: 'Green', pantone: 'Pantone 3405', cmyk: '100 0 82 0', rgb: '0 172 105', hex: '#00AB68', role: 'secondary', use: { en: 'Success states (sparingly).', uk: 'Статуси успіху (ощадно).' } },
  { name: 'Orange-red', pantone: 'Pantone 171', cmyk: '0 79 81 0', rgb: '255 92 53', hex: '#FF5B35', role: 'secondary', use: { en: 'Warnings (sparingly).', uk: 'Попередження (ощадно).' } },
];

export const brandDocs = [
  {
    title: { en: 'Lions International Brand Guidelines', uk: 'Lions International Brand Guidelines' } as L,
    version: { en: 'V4.0, May 2023', uk: 'V4.0, травень 2023' } as L,
    about: { en: 'Full brand book: name, emblem and signatures, palette, gradients, fonts, photography, global cause brands.', uk: 'Повний брендбук: назва, емблема і підписи, палітра, градієнти, шрифти, фото, бренди глобальних напрямів служіння.' } as L,
    official: 'https://www.lionsclubs.org/en/resources-for-members/brand-guidelines',
    local: '/brand/lions-international-brand-guidelines-v4.pdf',
  },
  {
    title: { en: 'Club Brand Guidelines', uk: 'Club Brand Guidelines' } as L,
    version: { en: 'V1.0, September 2019', uk: 'V1.0, вересень 2019' } as L,
    about: { en: 'Short version for clubs: how to write the name, emblem rules, palette, photography, brand team contacts.', uk: 'Скорочена версія для клубів: як писати назву, правила емблеми, палітра, фото, контакти бренд-команди.' } as L,
    official: 'https://cdn2.webdamdb.com/md_wCNDBjM1EE12.jpg.pdf?v=1',
    local: '/brand/lions-club-brand-guidelines-v1.pdf',
  },
  {
    title: { en: 'Logos and emblems', uk: 'Логотипи та емблеми' } as L,
    version: { en: 'official files', uk: 'офіційні файли' } as L,
    about: { en: 'Emblem, Lions International and Lions Clubs International signatures, service icons. Downloadable by Lions members.', uk: 'Емблема, підписи Lions International і Lions Clubs International, іконки напрямів служіння. Завантажують члени Lions.' } as L,
    official: 'https://www.lionsclubs.org/en/logos',
    local: '',
  },
];

export const nameRules: [L, L][] = [
  [{ en: 'First mention of the organisation', uk: 'Перша згадка організації' }, { en: 'Lions Clubs International', uk: 'Lions Clubs International' }],
  [{ en: 'Second and later mentions', uk: 'Друга і наступні згадки' }, { en: 'Lions International', uk: 'Lions International' }],
  [{ en: 'Clubs in general', uk: 'Клуби загалом' }, { en: 'Lions club, Lions clubs (lower-case c)', uk: 'Lions club, Lions clubs (мала літера c)' }],
  [{ en: 'Members of the organisation', uk: 'Члени організації' }, { en: 'Lions, always capitalised', uk: 'Lions, завжди з великої' }],
  [{ en: 'Our club', uk: 'Наш клуб' }, { en: 'Lviv International Lions Club', uk: 'Lviv International Lions Club' }],
  [{ en: 'LCI registry record', uk: 'Запис у реєстрі LCI' }, { en: 'to be confirmed with District 134', uk: 'уточнюється з District 134' }],
  [{ en: 'Motto', uk: 'Девіз' }, { en: 'We Serve™, a trademark, not translated in the logo', uk: 'We Serve™, торговельна марка, не перекладаємо в логотипі' }],
];

export const emblemDonts: L[] = [
  { en: 'Do not redraw or generate the emblem: official files only', uk: 'Не перемальовувати і не генерувати емблему: лише офіційні файли' },
  { en: 'Do not stretch or squash', uk: 'Не розтягувати і не стискати' },
  { en: 'Do not crop the signature', uk: 'Не обрізати підпис' },
  { en: 'Do not tilt', uk: 'Не нахиляти' },
  { en: 'Do not place on a pattern', uk: 'Не ставити на візерунок' },
  { en: 'Do not rearrange elements', uk: 'Не переставляти елементи' },
  { en: 'Do not change colours or make it transparent', uk: 'Не змінювати кольори і не робити напівпрозорою' },
  { en: 'Do not change the name typeface', uk: 'Не змінювати шрифт назви' },
];

export const photoRules: { do: L[]; dont: L[] } = {
  do: [
    { en: 'Natural light, no flash', uk: 'Природне світло, без спалаху' },
    { en: 'Candid shots of Lions in action', uk: 'Відверті кадри Lions у дії' },
    { en: 'Focus on the people we help', uk: 'Фокус на людях, яким допомагаємо' },
    { en: 'Different ages and different people', uk: 'Різний вік і різні люди' },
    { en: 'Bright but natural colours', uk: 'Яскраві, але природні кольори' },
    { en: 'Room for text in the frame', uk: 'Вільне місце для тексту в кадрі' },
  ],
  dont: [
    { en: 'Staged photos that do not show service', uk: 'Постановочні фото, що не показують служіння' },
    { en: 'Too dark or overexposed shots', uk: 'Занадто темні або пересвічені кадри' },
    { en: 'Photos from search engines without a checked licence', uk: 'Фото з пошуковиків без перевірки ліцензії' },
    { en: 'Children’s faces without parental consent', uk: 'Обличчя дітей без згоди батьків' },
  ],
};

export const brandContact = 'lionsbrand@lionsclubs.org';
export const trademarkContact = 'trademarkuse@lionsclubs.org';
