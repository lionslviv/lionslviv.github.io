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

export const projects: Post[] = [
  {
    slug: 'zir-dlia-ditei',
    demo: true,
    type: 'project',
    title: { en: 'Clear vision for every child', uk: 'Чіткий зір для кожної дитини' },
    excerpt: { en: 'Free eye screenings in Lviv schools and glasses for the children who need them.', uk: 'Безкоштовні перевірки зору в школах Львова і окуляри для дітей, яким вони потрібні.' },
    date: '2026-09-15',
    cover: { seed: 'vision-kids', motif: 'people' },
    tags: ['vision', 'youth'],
    status: 'active',
    stats: [
      { value: '1,240', label: { en: 'children screened', uk: 'дітей перевірили' } },
      { value: '186', label: { en: 'pairs of glasses', uk: 'пар окулярів' } },
      { value: '9', label: { en: 'schools', uk: 'шкіл' } },
    ],
    body: {
      en: [
        'Many children who struggle to see the board simply do not know it. We bring a team of optometrists to a school and screen whole year groups in a single day.',
        '## How it works',
        'A school applies, and we agree the date with the administration and parents. A screening takes 5-7 minutes per child. If glasses are needed, the club pays for them in full.',
        '> Vision has been the first Lions cause since 1925. For us it is not history but everyday work.',
        '## What is next',
        'In 2027 we plan to reach 12 more schools in the Lviv community and start mobile screenings in villages of the region.',
      ],
      uk: [
        'Багато дітей, які погано бачать дошку, просто не знають про це. Ми привозимо до школи команду оптометристів і за один день перевіряємо зір цілих паралелей.',
        '## Як це працює',
        'Школа подає заявку, ми погоджуємо дату з адміністрацією та батьками. Перевірка триває 5-7 хвилин на дитину. Якщо потрібні окуляри, клуб оплачує їх повністю.',
        '> Зір це перший напрям служіння Lions з 1925 року. Для нас це не історія, а щоденна робота.',
        '## Що далі',
        'У 2027 році плануємо охопити ще 12 шкіл Львівської громади і запустити виїзні перевірки в селах області.',
      ],
    },
  },
  {
    slug: 'svitlo-dlia-hromad',
    demo: true,
    type: 'project',
    title: { en: 'Light for communities', uk: 'Світло для громад' },
    excerpt: { en: 'Generators for schools, clinics and warming points, together with Lions from across Europe.', uk: 'Генератори для шкіл, амбулаторій і пунктів незламності разом із Lions з Європи.' },
    date: '2026-10-20',
    cover: { seed: 'generators', motif: 'care' },
    tags: ['humanitarian', 'environment'],
    status: 'active',
    stats: [
      { value: '36', label: { en: 'generators', uk: 'генераторів' } },
      { value: '14', label: { en: 'communities', uk: 'громад' } },
    ],
    body: {
      en: [
        'After attacks on the power grid, schools and clinics are left without electricity. Together with District 134 clubs and partners from Europe, we deliver generators where they are needed most.',
        '## Transparency',
        'Every generator comes with a handover record, photos and a responsible contact in the community. Reports are published on the Donate page.',
      ],
      uk: [
        'Після атак на енергосистему школи й амбулаторії лишаються без світла. Разом із клубами District 134 і партнерами з Європи ми передаємо генератори туди, де вони потрібні найбільше.',
        '## Прозорість',
        'Кожен генератор має акт передачі, фото та контакт відповідальної людини в громаді. Звіти публікуємо в розділі "Підтримати".',
      ],
    },
  },
  {
    slug: 'derevo-za-kozhnoho',
    demo: true,
    type: 'project',
    title: { en: 'A tree for every defender', uk: 'Дерево за кожного' },
    excerpt: { en: 'A memorial alley in a Sykhiv park: one tree for every defender from the district.', uk: 'Висаджуємо алею пам’яті у парку на Сихові: одне дерево за кожного захисника з району.' },
    date: '2026-04-12',
    cover: { seed: 'trees', motif: 'nature' },
    tags: ['environment'],
    status: 'done',
    stats: [{ value: '120', label: { en: 'trees planted', uk: 'дерев висаджено' } }],
    body: {
      en: ['The project was started by local residents. The club provided the saplings, two years of care and a plaque with a QR code linking to people’s stories.'],
      uk: ['Проєкт ініціювали мешканці району. Клуб узяв на себе саджанці, догляд протягом двох років і табличку з QR-кодом до історій людей.'],
    },
  },
  {
    slug: 'mentory-leo',
    demo: true,
    type: 'project',
    title: { en: 'Mentors for young people', uk: 'Ментори для молоді' },
    excerpt: { en: 'Preparing to launch a Leo club: members mentor students in careers and volunteering.', uk: 'Готуємо до запуску Leo-клуб: члени клубу менторять студентів у кар’єрі та волонтерстві.' },
    date: '2026-11-02',
    cover: { seed: 'leo-mentors', motif: 'people' },
    tags: ['youth'],
    status: 'active',
    body: {
      en: ['Leo clubs are the Lions International youth programme for people aged 12-30. We are looking for a partner university and the first 15 participants.'],
      uk: ['Leo-клуби це молодіжна програма Lions International для людей 12-30 років. Ми шукаємо університет-партнера і перших 15 учасників.'],
    },
  },
];

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
        'We will end our first year together with a festive New Year gathering of club members.',
        'Both meetings take place at Hotel Leopolis, 16 Teatralna Street, Lviv. If you would like to join us as a guest, get in touch via the Contact page.',
      ],
      uk: [
        '## 3 грудня: третя зустріч клубу',
        'На наступній зустрічі виступлять президент клубу Lars Vestbjerg і віцепрезидент Олексій Другов.',
        '## 12 грудня: новорічна зустріч',
        'Завершимо наш перший рік разом святковою новорічною зустріччю членів клубу.',
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
        'We started with a lovely dinner, getting to know each other and building new connections. During the meeting, we introduced our members, discussed the Club’s structure and future development, and presented our active humanitarian project.',
        'We were also delighted to welcome Roman Monastyrskyy from Lions Club Lviv as our special guest.',
        'Looking ahead, members shared their ideas for future humanitarian projects, giving us inspiration and direction for the work we will develop together.',
        'A special moment was presenting each member with a commemorative diploma, celebrating the beginning of our journey as a new Lions Club.',
        'What made this evening truly special was the warm and friendly atmosphere, the enthusiasm and the shared desire to make a difference.',
        '> This is just the beginning. Together, we are ready to turn ideas into action and make a meaningful impact in our community. We Serve!',
      ],
      uk: [
        'Новий початок. Спільна мета. Нова родина Lions у Львові!',
        '5 листопада Lviv International Lions Club провів свою першу зустріч у чудовому готелі Leopolis. Так почалася наша подорож дружби, гуманітарного служіння і позитивних змін.',
        'Ми почали з теплої вечері: знайомилися і налагоджували нові зв’язки. На зустрічі представили членів клубу, обговорили його структуру і подальший розвиток, а також презентували наш чинний гуманітарний проєкт.',
        'Особливим гостем вечора був Роман Монастирський з Lions Club Lviv.',
        'Члени клубу поділилися ідеями майбутніх гуманітарних проєктів, і це дало нам натхнення та напрям для спільної роботи.',
        'Окремим моментом стало вручення кожному члену клубу пам’ятного диплома на честь початку нашого шляху як нового Lions клубу.',
        'Вечір був по-справжньому особливим завдяки теплій і дружній атмосфері, ентузіазму та спільному бажанню змінювати життя на краще.',
        '> Це лише початок. Разом ми готові перетворювати ідеї на дії і робити вагомий внесок у життя нашої громади. We Serve!',
      ],
    },
  },
  {
    // Реальна новина: текст клубу про другу зустріч (19.11.2026), фото надав клуб
    slug: 'druha-zustrich-klubu',
    type: 'news',
    title: { en: 'Our second Lions Club meeting, and our community is growing', uk: 'Друга зустріч клубу: наша спільнота зростає' },
    excerpt: { en: 'New faces, fresh ideas and a special guest from Lions Club Kyiv Ecology.', uk: 'Нові обличчя, свіжі ідеї та особливий гість з Lions Club Kyiv Ecology.' },
    date: '2026-11-19',
    cover: { seed: 'second-meeting', motif: 'event', src: '/gallery/druha-zustrich/01.jpg', w: 1600, h: 900 },
    tags: ['club'],
    source: 'https://www.facebook.com/people/Lviv-International-Lions-Club/61595416070045/',
    body: {
      en: [
        'Our second meeting on 19 November brought new faces, fresh ideas and inspiring conversations. We were pleased to welcome Lion Serhii Denisenko, our special guest from the Lions Club Kyiv Ecology, and welcome new members to our growing community.',
        'Serhii gave us an insightful introduction to the Lions Clubs International structure, its history and projects, making the meeting both inspiring and engaging.',
        'We also had a productive discussion about new opportunities for collaboration between Lions Clubs in Lviv, Kyiv and beyond.',
        '> Great conversations, new connections and shared ideas, all driven by one common purpose: We Serve.',
      ],
      uk: [
        'Наша друга зустріч 19 листопада принесла нові обличчя, свіжі ідеї та натхненні розмови. Ми раді були вітати особливого гостя, Lion Сергія Денисенка з Lions Club Kyiv Ecology, а також нових членів нашої спільноти, що зростає.',
        'Сергій змістовно розповів про структуру Lions Clubs International, її історію та проєкти, і зустріч вийшла водночас надихаючою й захопливою.',
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
  { slug: 'tretia-zustrich', title: { en: 'Third club meeting', uk: 'Третя зустріч клубу' }, start: '2026-12-03T18:00:00+02:00', end: '2026-12-03T21:00:00+02:00', location: leopolis, visibility: 'public', kind: 'meeting', description: { en: 'Our next club meeting with talks by Club President Lars Vestbjerg and Vice President Oleksiy Druhov. Guests interested in joining are welcome: write to us to get the details.', uk: 'Наступна зустріч клубу, на якій виступлять президент клубу Lars Vestbjerg і віцепрезидент Олексій Другов. Гості, які думають долучитися, запрошені: напишіть нам, щоб отримати деталі.' }, timeUnknown: true },
  { slug: 'novorichna-zustrich-2026', title: { en: 'New Year club gathering', uk: 'Новорічна зустріч клубу' }, start: '2026-12-12T18:00:00+02:00', end: '2026-12-12T22:00:00+02:00', location: leopolis, visibility: 'public', kind: 'gala', description: { en: 'A festive New Year gathering of club members to celebrate the start of our journey together.', uk: 'Святкова новорічна зустріч членів клубу, щоб разом відзначити початок нашого шляху.' }, timeUnknown: true },
];

export const kindLabel: Record<Event['kind'], L> = {
  meeting: { en: 'Meeting', uk: 'Збори' },
  service: { en: 'Service', uk: 'Служіння' },
  gala: { en: 'Celebration', uk: 'Свято' },
};

export type Album = { slug: string; title: L; date: string; eventSlug?: string; photos: Art[]; note?: L };

const shots = (base: string, n: number, motif: Art['motif']): Art[] =>
  Array.from({ length: n }, (_, i) => ({ seed: `${base}-${i}`, motif }));

const real = (dir: string, files: [string, number, number][]): Art[] =>
  files.map(([f, w, h]) => ({ seed: `${dir}-${f}`, motif: 'event', src: `/gallery/${dir}/${f}`, w, h }));

export const albums: Album[] = [
  // Реальні альбоми: фото надав клуб (метадані й геолокацію прибрано)
  { slug: 'druha-zustrich', title: { en: 'Second club meeting', uk: 'Друга зустріч клубу' }, date: '2026-11-19', eventSlug: 'druha-zustrich', photos: real('druha-zustrich', [['01.jpg', 1600, 900], ['02.jpg', 1200, 1600], ['03.jpg', 900, 1600], ['04.jpg', 1200, 1600], ['05.jpg', 1200, 1600]]) },
  { slug: 'persha-zustrich', title: { en: 'First club meeting', uk: 'Перша зустріч клубу' }, date: '2026-11-05', eventSlug: 'persha-zustrich', photos: real('persha-zustrich', [['01.jpg', 1600, 1200], ['02.jpg', 1600, 1200], ['03.jpg', 900, 1600], ['04.jpg', 900, 1600], ['05.jpg', 900, 1600], ['06.jpg', 900, 1600]]) },
  { slug: 'zir-levandivka', title: { en: 'Eye screening, Levandivka', uk: 'Перевірка зору, Левандівка' }, date: '2026-11-07', photos: shots('lev', 12, 'people') },
  { slug: 'heneratory', title: { en: 'Generators for communities', uk: 'Генератори для громад' }, date: '2026-10-24', photos: shots('gen', 7, 'care') },
  { slug: 'aleia-pamiati', title: { en: 'Memorial alley in Sykhiv', uk: 'Алея пам’яті на Сихові' }, date: '2026-04-12', photos: shots('trees', 10, 'nature') },
];

export type Member = { slug: string; name: L; role: L; since: number; field?: L; bio?: L; board: boolean; real?: boolean; photo?: string };

const pending: L = { en: 'Profile in progress', uk: 'Профіль заповнюється' };

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
    board: true, real: true, photo: '/members/lars-vestbjerg.jpg',
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
    board: true, real: true, photo: '/members/oleksiy-druhov.jpg',
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
    board: true, real: true, photo: '/members/iryna-melnyk.jpg',
  },
  { slug: 'treasurer', name: { en: 'Club Treasurer', uk: 'Скарбник клубу' }, role: { en: 'Treasurer', uk: 'Скарбник' }, since: 2026, field: pending, board: true },
  { slug: 'membership', name: { en: 'Membership Chair', uk: 'Директор з членства' }, role: { en: 'Membership Chair', uk: 'Директор з членства' }, since: 2026, field: pending, board: true },
  { slug: 'service', name: { en: 'Service Chair', uk: 'Координатор служіння' }, role: { en: 'Service Chair', uk: 'Координатор служіння' }, since: 2026, field: pending, board: true },
  { slug: 'marketing', name: { en: 'Communications Chair', uk: 'Координатор комунікацій' }, role: { en: 'Communications', uk: 'Комунікації' }, since: 2026, field: pending, board: true },
  ...Array.from({ length: 5 }, (_, i) => ({ slug: `member-${i + 1}`, name: { en: 'Club member', uk: 'Член клубу' }, role: { en: 'Club member', uk: 'Член клубу' }, since: 2026, board: false })),
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
