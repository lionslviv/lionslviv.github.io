// Глобальні налаштування сайту. DEMO = true вмикає банер "демо-версія"
// і позначки біля умовного контенту. Вимкнути перед релізом.
import type { L, Lang } from '../i18n';
import { tr } from '../i18n';
export const DEMO = true;

// Реальні дані: сторінка клубу у Facebook (перевірено 26.11.2026)
// https://www.facebook.com/people/Lviv-International-Lions-Club/61595416070045/
export const club = {
  name: 'Lviv International Lions Club',
  // Назва для демонстрації членам клубу; остаточну погоджуємо після обговорення
  // і з District 134. Змінюється тут: name, shortName, heroWord.
  shortName: 'Lviv International',
  heroWord: 'Lviv', // велике слово в hero між шарами силуету міста (було: 'Leopolis')
  lciRecord: { en: 'to be confirmed with District 134', uk: 'уточнюється з District 134' } as L,
  facebookName: 'Lviv International Lions Club',
  district: { en: 'District 134, Ukraine', uk: 'District 134, Україна' } as L,
  motto: 'We Serve',
  about: {
    en: 'English-speaking Lions community in Lviv, Ukraine, focusing on healthcare and humanitarian service.',
    uk: 'Англомовна спільнота Lions у Львові, що служить через охорону здоров’я та гуманітарну допомогу.',
  } as L,
  email: 'lv@dba-Ukraine.com',
  phone: '+380 67 674 6866',
  phoneDisplay: '067 674 6866',
  meetingPlace: { en: 'Hotel Leopolis, 16 Teatralna St, Lviv', uk: 'Готель Leopolis, вул. Театральна, 16, Львів' } as L,
  meetingRule: { en: 'Meetings in English, schedule in Events', uk: 'Зустрічі англійською, розклад публікуємо в «Подіях»' } as L,
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/people/Lviv-International-Lions-Club/61595416070045/' },
  ],
  bank: {
    recipient: { en: 'NGO "Lviv International Lions Club" (name to be confirmed)', uk: 'ГО "Львівський міжнародний Лайонс клуб" (назва уточнюється)' } as L,
    iban: 'UA00 0000 0000 0000 0000 0000 0000 0',
    edrpou: '00000000',
    purpose: { en: 'Charitable donation for statutory activities', uk: 'Благодійний внесок на статутну діяльність' } as L,
  },
};

export const nav = [
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/news', key: 'news' },
  { href: '/events', key: 'events' },
  { href: '/gallery', key: 'gallery' },
  { href: '/members', key: 'members' },
] as const;

export const navSecondary = [
  { href: '/reviews', key: 'reviews' },
  { href: '/join', key: 'join' },
  { href: '/contacts', key: 'contacts' },
  { href: '/brand', key: 'brand' },
  { href: '/privacy', key: 'privacy' },
] as const;

// Цифри впливу редагуються в адмінці. Зараз умовні (демо).
export const impact: { value: L; label: L }[] = [
  { value: { en: '1,240', uk: '1 240' }, label: { en: 'children had their eyesight checked', uk: 'дітей пройшли перевірку зору' } },
  { value: { en: '36', uk: '36' }, label: { en: 'generators delivered to communities', uk: 'генераторів передали в громади' } },
  { value: { en: '2,800', uk: '2 800' }, label: { en: 'hours of volunteer service', uk: 'годин волонтерського служіння' } },
  { value: { en: '₴1.9M', uk: '₴1,9 млн' }, label: { en: 'raised and reported', uk: 'зібрали й прозвітували' } },
];

// Глобальні напрями служіння Lions International.
export const causes: { key: string; label: L; text: L }[] = [
  { key: 'vision', label: { en: 'Vision', uk: 'Зір' }, text: { en: 'Eye screenings, glasses, support for people with visual impairments.', uk: 'Перевірки зору, окуляри, підтримка людей з порушеннями зору.' } },
  { key: 'hunger', label: { en: 'Hunger', uk: 'Голод' }, text: { en: 'Food packages, kitchens, support for displaced people.', uk: 'Продуктові набори, кухні, підтримка переселенців.' } },
  { key: 'environment', label: { en: 'Environment', uk: 'Довкілля' }, text: { en: 'Tree planting, clean-ups, energy independence for communities.', uk: 'Висадка дерев, прибирання, енергонезалежність громад.' } },
  { key: 'diabetes', label: { en: 'Diabetes', uk: 'Діабет' }, text: { en: 'Screenings and prevention awareness.', uk: 'Скринінги та просвіта щодо профілактики.' } },
  { key: 'cancer', label: { en: 'Childhood cancer', uk: 'Дитячий рак' }, text: { en: 'Support for families and hospitals.', uk: 'Допомога родинам і лікарням.' } },
  { key: 'humanitarian', label: { en: 'Humanitarian aid', uk: 'Гуманітарна допомога' }, text: { en: 'Generators, medicines, hospital equipment.', uk: 'Генератори, ліки, обладнання для лікарень.' } },
  { key: 'youth', label: { en: 'Youth', uk: 'Молодь' }, text: { en: 'Leo clubs, mentoring, education programmes.', uk: 'Leo-клуби, менторство, освітні програми.' } },
];

export const causeLabel = (k: string, lang: Lang = 'en') => tr(lang, causes.find((c) => c.key === k)?.label) || k;
