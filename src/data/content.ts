// Контент сайту двома мовами (en основна, uk). Поле demo: true = умовний приклад.
// Реальні дані позначені коментарями з джерелом.
import type { L } from '../i18n';

// src = справжнє фото з public/ (без EXIF), w/h = його розміри; без src показується плейсхолдер
export type Art = { seed: string; motif?: 'city' | 'people' | 'event' | 'nature' | 'care'; src?: string; w?: number; h?: number };
export type LList = { en: string[]; uk: string[] };

export type Post = {
  slug: string;
  type: 'news' | 'project';
  title: L;
  excerpt: L;
  date: string;
  cover: Art;
  tags: string[];
  body: LList; // абзаци; "## " = підзаголовок, "> " = цитата
  stats?: { value: string; label: L }[];
  status?: 'active' | 'done';
  demo?: boolean;
  source?: string;
};

// Проєкти клубу додамо після зустрічі 3 грудня 2026 (демо-проєкти прибрано)
export const projects: Post[] = [];

export const news: Post[] = [
  {
    // Реальний анонс від клубу (26.11.2026)
    slug: 'zustrichi-hrudnia',
    type: 'news',
    title: { en: 'Coming up in December: club meeting on 3 December and New Year gathering on 12 December', uk: 'Грудень у клубі: зустріч 3 грудня і новорічна зустріч 12 грудня' },
    excerpt: { en: 'Our next meeting is on 3 December with talks by Lars Vestbjerg and Oleksiy Druhov. On 12 December we celebrate the New Year together. Both at Hotel Leopolis.', uk: 'Наступна зустріч 3 грудня, на ній виступлять Lars Vestbjerg і Олексій Другов. 12 грудня разом святкуємо Новий рік. Обидві зустрічі в готелі Leopolis.' },
    date: '2026-11-26',
    cover: { seed: 'december-meetings', motif: 'event', src: '/gallery/persha-zustrich/02.jpg', w: 1600, h: 1200 },
    tags: ['club'],
    body: {
      en: [
        '## 3 December: third club meeting',
        'Our next meeting will feature talks by our Club President Lars Vestbjerg and Vice President Oleksiy Druhov.',
        '## 12 December: New Year gathering',
        'We will end the year together with a festive New Year gathering of club members.',
        'Both meetings take place at Hotel Leopolis, 16 Teatralna Street, Lviv. If you would like to join us as a guest, get in touch via the Contact page.',
      ],
      uk: [
        '## 3 грудня: третя зустріч клубу',
        'На наступній зустрічі виступлять президент клубу Lars Vestbjerg і віцепрезидент Олексій Другов.',
        '## 12 грудня: новорічна зустріч',
        'Завершимо рік разом святковою новорічною зустріччю членів клубу.',
        'Обидві зустрічі відбудуться в готелі Leopolis, вул. Театральна, 16, Львів. Якщо хочете долучитися як гість, напишіть нам через сторінку «Контакти».',
      ],
    },
  },
  {
    // Реальна новина: текст клубу (допис про першу зустріч), фото надав клуб
    slug: 'persha-zustrich-klubu',
    type: 'news',
    title: { en: 'A new beginning: our first club meeting', uk: 'Новий початок: перша зустріч клубу' },
    excerpt: { en: 'On 5 November, Lviv International Lions Club held its very first meeting at Hotel Leopolis.', uk: '5 листопада Lviv International Lions Club провів свою першу зустріч у готелі Leopolis.' },
    date: '2026-11-05',
    cover: { seed: 'first-meeting', motif: 'event', src: '/gallery/persha-zustrich/01.jpg', w: 1600, h: 1200 },
    tags: ['club'],
    body: {
      en: [
        'A new beginning. A shared purpose. A new Lions family in Lviv!',
        'On 5 November, Lviv International Lions Club held its very first meeting at the beautiful Hotel Leopolis, marking the beginning of an exciting journey of friendship, humanitarian service and positive change.',
        'We started with a lovely dinner, getting to know each other and building new connections. During the meeting, we introduced our members, discussed the club’s structure and future development, and presented our active humanitarian project.',
        'We were also delighted to welcome Roman Monastyrskyy from Lions Club Lviv as our special guest.',
        'Looking ahead, members shared their ideas for future humanitarian projects, giving us inspiration and direction for the work we will develop together.',
        'A special moment was presenting each member with a commemorative diploma, celebrating the beginning of our journey as a new Lions club.',
        'What made this evening truly special was the warm and friendly atmosphere, the enthusiasm and the shared desire to make a difference.',
        '> This is just the beginning. Together, we are ready to turn ideas into action and make a meaningful impact in our community. We Serve!',
      ],
      uk: [
        'Новий початок. Спільна мета. Нова родина Lions у Львові!',
        '5 листопада Lviv International Lions Club провів свою першу зустріч у чудовому готелі Leopolis. Так почалася наша подорож дружби, гуманітарного служіння і позитивних змін.',
        'Ми почали з теплої вечері: знайомилися і налагоджували нові зв’язки. На зустрічі представили членів клубу, обговорили його структуру і подальший розвиток, а також презентували наш поточний гуманітарний проєкт.',
        'Особливим гостем вечора був Роман Монастирський з Lions Club Lviv.',
        'Члени клубу поділилися ідеями майбутніх гуманітарних проєктів, і це дало нам натхнення та напрям для спільної роботи.',
        'Особливим моментом стало вручення кожному члену клубу пам’ятного диплома на честь початку нашого шляху як нового Lions клубу.',
        'Вечір був по-справжньому особливим завдяки теплій і дружній атмосфері, ентузіазму та спільному бажанню змінювати життя на краще.',
        '> Це лише початок. Разом ми готові перетворювати ідеї на дії і робити вагомий внесок у життя нашої громади. We Serve!',
      ],
    },
  },
  {
    // Реальна новина: текст клубу про другу зустріч (19.11.2026), фото надав клуб
    slug: 'druha-zustrich-klubu',
    type: 'news',
    title: { en: 'Our second club meeting: our community is growing', uk: 'Друга зустріч клубу: наша спільнота зростає' },
    excerpt: { en: 'New faces, fresh ideas and a special guest from Lions Club Kyiv Ecology.', uk: 'Нові обличчя, свіжі ідеї та особливий гість з Lions Club Kyiv Ecology.' },
    date: '2026-11-19',
    cover: { seed: 'second-meeting', motif: 'event', src: '/gallery/druha-zustrich/01.jpg', w: 1600, h: 900 },
    tags: ['club'],
    source: 'https://www.facebook.com/people/Lviv-International-Lions-Club/61595416070045/',
    body: {
      en: [
        'Our second meeting on 19 November brought new faces, fresh ideas and inspiring conversations. We were pleased to welcome Lion Serhii Denisenko, our special guest from Lions Club Kyiv Ecology, and to welcome new members to our growing community.',
        'Serhii gave us an insightful introduction to the structure, history and projects of Lions Clubs International, making the meeting both inspiring and engaging.',
        'We also had a productive discussion about new opportunities for collaboration between Lions clubs in Lviv, Kyiv and beyond.',
        '> Great conversations, new connections and shared ideas, all driven by one common purpose: We Serve.',
      ],
      uk: [
        'Наша друга зустріч 19 листопада принесла нові обличчя, свіжі ідеї та натхненні розмови. Ми раді були вітати особливого гостя, Lion Сергія Денисенка з Lions Club Kyiv Ecology, а також нових членів нашої спільноти, що зростає.',
        'Сергій змістовно розповів про структуру Lions Clubs International, її історію та проєкти, і зустріч вийшла водночас надихальною і захопливою.',
        'Ми також продуктивно обговорили нові можливості для співпраці між Lions клубами Львова, Києва та інших міст.',
        '> Чудові розмови, нові знайомства і спільні ідеї, які об’єднує одна мета: We Serve.',
      ],
    },
  },

];

export type Event = {
  slug: string;
  title: L;
  start: string;
  end: string;
  location: L;
  visibility: 'public' | 'members';
  kind: 'meeting' | 'service' | 'gala';
  description: L;
  timeUnknown?: boolean;
  demo?: boolean;
};

// Усі зустрічі клубу відбуваються в готелі Leopolis
export const leopolis: L = { en: 'Hotel Leopolis, 16 Teatralna St, Lviv', uk: 'Готель Leopolis, вул. Театральна, 16, Львів' };

export const events: Event[] = [
  // Реальний розклад клубу (підтвердив клуб 26.11.2026). Час і місце, де невідомі, уточнюються.
  { slug: 'druha-zustrich', title: { en: 'Second club meeting', uk: 'Друга зустріч клубу' }, start: '2026-11-19T18:00:00+02:00', end: '2026-11-19T21:00:00+02:00', location: leopolis, visibility: 'public', kind: 'meeting', description: { en: 'Our second meeting, with special guest Lion Serhii Denisenko from Lions Club Kyiv Ecology: the structure, history and projects of Lions Clubs International, new members and collaboration between Lions clubs.', uk: 'Друга зустріч клубу з особливим гостем Lion Сергієм Денисенком з Lions Club Kyiv Ecology: структура, історія і проєкти Lions Clubs International, нові члени клубу та співпраця між Lions клубами.' }, timeUnknown: true },
  { slug: 'persha-zustrich', title: { en: 'First club meeting', uk: 'Перша зустріч клубу' }, start: '2026-11-05T18:00:00+02:00', end: '2026-11-05T21:00:00+02:00', location: leopolis, visibility: 'public', kind: 'meeting', description: { en: 'The first meeting and the start of Lviv International Lions Club: dinner, member introductions, club structure, humanitarian projects and commemorative diplomas.', uk: 'Перша зустріч і старт роботи Lviv International Lions Club: вечеря, знайомство членів клубу, структура клубу, гуманітарні проєкти і пам’ятні дипломи.' }, timeUnknown: true },
  { slug: 'tretia-zustrich', title: { en: 'Third club meeting', uk: 'Третя зустріч клубу' }, start: '2026-12-03T18:00:00+02:00', end: '2026-12-03T21:00:00+02:00', location: leopolis, visibility: 'public', kind: 'meeting', description: { en: 'Our next club meeting with talks by Club President Lars Vestbjerg and Vice President Oleksiy Druhov. Guests interested in joining are welcome: write to us for the details.', uk: 'Наступна зустріч клубу, на якій виступлять президент клубу Lars Vestbjerg і віцепрезидент Олексій Другов. Запрошуємо гостей, які думають долучитися: напишіть нам, щоб дізнатися деталі.' }, timeUnknown: true },
  { slug: 'novorichna-zustrich-2026', title: { en: 'New Year club gathering', uk: 'Новорічна зустріч клубу' }, start: '2026-12-12T18:00:00+02:00', end: '2026-12-12T22:00:00+02:00', location: leopolis, visibility: 'public', kind: 'gala', description: { en: 'A festive New Year gathering of club members to celebrate the start of our journey together.', uk: 'Святкова новорічна зустріч членів клубу, щоб разом відзначити початок нашого шляху.' }, timeUnknown: true },
];

export const kindLabel: Record<Event['kind'], L> = {
  meeting: { en: 'Meeting', uk: 'Збори' },
  service: { en: 'Service', uk: 'Служіння' },
  gala: { en: 'Celebration', uk: 'Свято' },
};

export type Album = { slug: string; title: L; date: string; eventSlug?: string; photos: Art[]; note?: L };

const real = (dir: string, files: [string, number, number][]): Art[] =>
  files.map(([f, w, h]) => ({ seed: `${dir}-${f}`, motif: 'event', src: `/gallery/${dir}/${f}`, w, h }));

export const albums: Album[] = [
  // Реальні альбоми: фото надав клуб (метадані й геолокацію прибрано)
  { slug: 'druha-zustrich', title: { en: 'Second club meeting', uk: 'Друга зустріч клубу' }, date: '2026-11-19', eventSlug: 'druha-zustrich', photos: real('druha-zustrich', [['01.jpg', 1600, 900], ['02.jpg', 1200, 1600], ['03.jpg', 900, 1600], ['04.jpg', 1200, 1600], ['05.jpg', 1200, 1600]]) },
  { slug: 'persha-zustrich', title: { en: 'First club meeting', uk: 'Перша зустріч клубу' }, date: '2026-11-05', eventSlug: 'persha-zustrich', photos: real('persha-zustrich', [['01.jpg', 1600, 1200], ['02.jpg', 1600, 1200], ['03.jpg', 900, 1600], ['04.jpg', 900, 1600], ['05.jpg', 900, 1600], ['06.jpg', 900, 1600]]) },
];

// birthday: 'MM-DD' без року; показується в календарі подій і в ICS-фіді.
export type Member = { slug: string; name: L; role: L; since: number; field?: L; bio?: L; board: boolean; real?: boolean; photo?: string; birthday?: string };


// Реальні профілі: відкриті професійні дані з Facebook (26.11.2026), фото надав клуб.
// Остаточні тексти погоджують самі члени правління.
export const members: Member[] = [
  {
    slug: 'lars-vestbjerg',
    name: { en: 'Lars Vestbjerg', uk: 'Lars Vestbjerg' },
    role: { en: 'Club President', uk: 'Президент клубу' },
    since: 2026,
    field: { en: 'Danish Business Association, Vestbjerg Invest ApS', uk: 'Danish Business Association, Vestbjerg Invest ApS' },
    bio: {
      en: 'Danish entrepreneur based in Lviv. Founder and CEO of Vestbjerg Invest ApS, works with the Danish Business Association. Former Chairman of the Board of the European Business Association in Ukraine (2004-2007, 2009).',
      uk: 'Данський підприємець, який живе у Львові. Засновник і CEO Vestbjerg Invest ApS, працює в Danish Business Association. Очолював правління European Business Association в Україні (2004-2007, 2009).',
    },
    board: true, real: true, photo: '/members/lars-vestbjerg.jpg', birthday: '01-31',
  },
  {
    slug: 'oleksiy-druhov',
    name: { en: 'Oleksiy Druhov', uk: 'Олексій Другов' },
    role: { en: 'Vice President', uk: 'Віцепрезидент клубу' },
    since: 2026,
    field: { en: 'Academy for Heroes, Lviv Polytechnic', uk: 'Академія для Героїв, Львівська політехніка' },
    bio: {
      en: 'CEO of the Academy for Heroes in Lviv and a member of staff at Lviv Polytechnic National University. Vice-rector of the University of Banking from 2001 to 2019.',
      uk: 'CEO Академії для Героїв у Львові, працює в Національному університеті «Львівська політехніка». У 2001-2019 роках проректор Університету банківської справи.',
    },
    board: true, real: true, photo: '/members/oleksiy-druhov.jpg', birthday: '01-04',
  },
  {
    slug: 'iryna-melnyk',
    name: { en: 'Iryna Melnyk', uk: 'Ірина Мельник' },
    role: { en: 'Club Secretary', uk: 'Секретар клубу' },
    since: 2026,
    field: { en: 'International relations, Ivan Franko National University of Lviv', uk: 'Міжнародні відносини, ЛНУ імені Івана Франка' },
    bio: {
      en: 'Club secretary. Graduate in International Relations from Ivan Franko National University of Lviv.',
      uk: 'Секретар клубу. За освітою фахівчиня з міжнародних відносин, випускниця Львівського національного університету імені Івана Франка.',
    },
    board: true, real: true, photo: '/members/iryna-melnyk.jpg', birthday: '01-09',
  },
  {
    slug: 'viktor-kloba',
    name: { en: 'Viktor Kloba', uk: 'Віктор Кльоба' },
    role: { en: 'Club member', uk: 'Член клубу' },
    since: 2026,
    field: { en: 'AI transformation, Raiffeisen Bank Ukraine', uk: 'AI-трансформація, Райффайзен Банк' },
    bio: {
      en: 'Senior Innovation Implementation Manager at Raiffeisen Bank Ukraine, where he leads the bank’s AI transformation and founded an AI community of more than 250 colleagues. Holds a PhD and an MBA with distinction. Volunteers as an AI instructor for children at the Academy for Heroes, runs a student AI club at IT Step University and gives guest lectures at Ukrainian universities.',
      uk: 'Senior Innovation Implementation Manager у Райффайзен Банку, де очолює AI-трансформацію банку і заснував AI-спільноту з понад 250 колег. Має ступінь PhD і MBA з відзнакою. Волонтерить як AI-інструктор для дітей в Академії для Героїв, веде студентський AI-клуб в IT Step University і читає гостьові лекції в українських університетах.',
    },
    board: false, real: true, photo: '/members/viktor-kloba.jpg', birthday: '06-14',
  },
  // Вільні місця: ролі розподіляються на зустрічі 3 грудня 2026
  ...Array.from({ length: 4 }, (_, i) => ({ slug: `member-${i + 1}`, name: { en: 'Club member', uk: 'Член клубу' }, role: { en: 'Club member', uk: 'Член клубу' }, since: 2026, board: false })),
];

export type Review = { id: string; author: L; kind: 'partner' | 'beneficiary' | 'volunteer' | 'guest'; text: L; date: string };

export const reviews: Review[] = [
  { id: 'r1', author: { en: 'Sample partner review', uk: 'Приклад відгуку партнера' }, kind: 'partner', text: { en: 'A real partner review will appear here after moderation and the author’s consent to publish.', uk: 'Тут буде справжній відгук партнера після модерації та згоди автора на публікацію.' }, date: '2026-11-10' },
  { id: 'r2', author: { en: 'Sample volunteer review', uk: 'Приклад відгуку волонтера' }, kind: 'volunteer', text: { en: 'Reviews are moderated in the admin panel. Critical ones go privately to the board.', uk: 'Відгуки проходять модерацію в адмінці. Негативні отримує правління приватно.' }, date: '2026-11-08' },
  { id: 'r3', author: { en: 'Sample parent review', uk: 'Приклад відгуку батьків' }, kind: 'beneficiary', text: { en: 'The form on this page works in demo mode: your review will appear in the admin panel for moderation.', uk: 'Форма на цій сторінці працює в демо-режимі: відгук з’явиться в адмінці на модерації.' }, date: '2026-11-05' },
];

export const reviewKindLabel: Record<Review['kind'], L> = {
  partner: { en: 'Partner', uk: 'Партнер' },
  beneficiary: { en: 'Beneficiary', uk: 'Отримувач допомоги' },
  volunteer: { en: 'Volunteer', uk: 'Волонтер' },
  guest: { en: 'Guest', uk: 'Гість' },
};

export const allPosts = [...news, ...projects].sort((a, b) => b.date.localeCompare(a.date));
