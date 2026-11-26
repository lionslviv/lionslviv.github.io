// Глобальні налаштування сайту. DEMO = true вмикає банер "демо-версія"
// і позначки біля умовного контенту. Вимкнути перед релізом.
export const DEMO = true;

export const club = {
  name: 'Lions Club Lviv Leopolis',
  shortName: 'Lviv Leopolis',
  lciRecord: 'Lviv (Leopolis)',
  district: 'District 134, Україна',
  motto: 'We Serve',
  city: 'Львів',
  email: 'hello@leopolislions.org.ua',
  meetingPlace: 'Місце зустрічей уточнюється',
  meetingRule: 'Кожен другий і четвертий вівторок, 19:00',
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
  bank: {
    recipient: 'ГО "Лайонс Клуб Львів Леополіс" (назва уточнюється)',
    iban: 'UA00 0000 0000 0000 0000 0000 0000 0',
    edrpou: '00000000',
    purpose: 'Благодійний внесок на статутну діяльність',
  },
};

export const nav = [
  { href: '/about', label: 'Про клуб' },
  { href: '/projects', label: 'Проєкти' },
  { href: '/news', label: 'Новини' },
  { href: '/events', label: 'Події' },
  { href: '/gallery', label: 'Галерея' },
  { href: '/members', label: 'Учасники' },
];

export const navSecondary = [
  { href: '/reviews', label: 'Відгуки' },
  { href: '/join', label: 'Приєднатися' },
  { href: '/contacts', label: 'Контакти' },
  { href: '/privacy', label: 'Конфіденційність' },
];

// Цифри впливу редагуються в адмінці. Зараз умовні.
export const impact = [
  { value: '1 240', label: 'дітей пройшли перевірку зору', size: 'wide' },
  { value: '36', label: 'генераторів передали в громади', size: 'tall' },
  { value: '2 800', label: 'годин волонтерського служіння', size: 'base' },
  { value: '₴1,9 млн', label: 'зібрали й прозвітували', size: 'base' },
];

// Глобальні напрями служіння Lions International.
export const causes = [
  { key: 'vision', label: 'Зір', text: 'Перевірки зору, окуляри, підтримка людей з порушеннями зору.' },
  { key: 'hunger', label: 'Голод', text: 'Продуктові набори, кухні, підтримка переселенців.' },
  { key: 'environment', label: 'Довкілля', text: 'Висадка дерев, прибирання, енергонезалежність громад.' },
  { key: 'diabetes', label: 'Діабет', text: 'Скринінги та просвіта щодо профілактики.' },
  { key: 'cancer', label: 'Дитячий рак', text: 'Допомога родинам і лікарням.' },
  { key: 'humanitarian', label: 'Гуманітарна допомога', text: 'Генератори, ліки, обладнання для лікарень.' },
  { key: 'youth', label: 'Молодь', text: 'Leo-клуби, менторство, освітні програми.' },
];

export const causeLabel = (k: string) => causes.find((c) => c.key === k)?.label ?? k;
