// Дані з офіційних брендбуків Lions International.
// Джерела (перевірено 26.11.2026):
//  - Lions International Brand Guidelines, V4.0 FULL, 05/23 EN
//  - Lions Clubs International Club Brand Guidelines, V1.0 CLUB, 09/19 EN
// Локальні копії PDF кладуться в public/brand/ (див. scripts/fetch-brand-assets.sh).

export type BrandColor = { name: string; pantone: string; cmyk: string; rgb: string; hex: string; role: 'primary' | 'secondary'; use: string };

export const brandColors: BrandColor[] = [
  { name: 'Blue', pantone: 'Pantone 287', cmyk: '100 72 2 12', rgb: '0 51 141', hex: '#00338D', role: 'primary', use: 'Заголовки, посилання, основні кнопки, великі заливки.' },
  { name: 'Yellow', pantone: 'Pantone 7406', cmyk: '0 17 100 0', rgb: '235 183 0', hex: '#EBB700', role: 'primary', use: 'Кнопки дії, акценти. Не для тексту на білому.' },
  { name: 'Purple', pantone: 'Pantone 2612', cmyk: '64 100 11 2', rgb: '122 38 130', hex: '#7A2582', role: 'primary', use: 'Основний з V4.0. На сайті: градієнт hero, рідкісні акценти.' },
  { name: 'Blue light', pantone: 'Pantone 660', cmyk: '75 47 0 0', rgb: '64 124 202', hex: '#407CCA', role: 'secondary', use: 'Фокус полів, ілюстрації.' },
  { name: 'Navy', pantone: 'Pantone 289', cmyk: '98 84 45 51', rgb: '13 34 64', hex: '#0D2240', role: 'secondary', use: 'Hero, футер, темні секції.' },
  { name: 'Cool Gray 11', pantone: 'Cool Gray 11', cmyk: '65 57 52 29', rgb: '85 86 90', hex: '#55565A', role: 'secondary', use: 'Другорядний текст.' },
  { name: 'Cool Gray 5', pantone: 'Cool Gray 5', cmyk: '13 9 10 27', rgb: '179 178 177', hex: '#B3B2B1', role: 'secondary', use: 'Неактивні елементи, плейсхолдери.' },
  { name: 'Green', pantone: 'Pantone 3405', cmyk: '100 0 82 0', rgb: '0 172 105', hex: '#00AB68', role: 'secondary', use: 'Статуси успіху (ощадно).' },
  { name: 'Orange-red', pantone: 'Pantone 171', cmyk: '0 79 81 0', rgb: '255 92 53', hex: '#FF5B35', role: 'secondary', use: 'Попередження (ощадно).' },
];

export const brandDocs = [
  {
    title: 'Lions International Brand Guidelines',
    version: 'V4.0, травень 2023',
    about: 'Повний брендбук: назва, емблема і підписи, палітра, градієнти, шрифти, фото, бренди глобальних напрямів служіння.',
    official: 'https://www.lionsclubs.org/en/resources-for-members/brand-guidelines',
    local: '/brand/lions-international-brand-guidelines-v4.pdf',
  },
  {
    title: 'Club Brand Guidelines',
    version: 'V1.0, вересень 2019',
    about: 'Скорочена версія для клубів: як писати назву, правила емблеми, палітра, фото, контакти бренд-команди.',
    official: 'https://cdn2.webdamdb.com/md_wCNDBjM1EE12.jpg.pdf?v=1',
    local: '/brand/lions-club-brand-guidelines-v1.pdf',
  },
  {
    title: 'Логотипи та емблеми',
    version: 'офіційні файли',
    about: 'Емблема, підписи Lions International і Lions Clubs International, іконки напрямів служіння. Завантажують члени Lions.',
    official: 'https://www.lionsclubs.org/en/logos',
    local: '',
  },
];

export const nameRules = [
  ['Перша згадка організації', 'Lions Clubs International'],
  ['Друга і наступні згадки', 'Lions International'],
  ['Клуби загалом', 'Lions club, Lions clubs (мала літера c)'],
  ['Члени організації', 'Lions, завжди з великої'],
  ['Наш клуб', 'Lviv International Lions Club'],
  ['Запис у реєстрі LCI', 'уточнюється з District 134'],
  ['Девіз', 'We Serve™, торговельна марка, не перекладаємо в логотипі'],
];

export const emblemDonts = [
  'Не перемальовувати і не генерувати емблему: лише офіційні файли',
  'Не розтягувати і не стискати',
  'Не обрізати підпис',
  'Не нахиляти',
  'Не ставити на візерунок',
  'Не переставляти елементи',
  'Не змінювати кольори і не робити напівпрозорою',
  'Не змінювати шрифт назви',
];

export const photoRules = {
  do: ['Природне світло, без спалаху', 'Відверті кадри Lions у дії', 'Фокус на людях, яким допомагаємо', 'Різний вік і різні люди', 'Яскраві, але природні кольори', 'Вільне місце для тексту в кадрі'],
  dont: ['Постановочні фото, що не показують служіння', 'Занадто темні або пересвічені кадри', 'Фото з пошуковиків без перевірки ліцензії', 'Обличчя дітей без згоди батьків'],
};

export const brandContact = 'lionsbrand@lionsclubs.org';
export const trademarkContact = 'trademarkuse@lionsclubs.org';
