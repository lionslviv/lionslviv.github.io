// ДЕМО-КОНТЕНТ. Увесь текст умовний і замінюється через адмінку / Supabase.
// Імена людей і партнерів навмисно не вигадані.

export type Art = { seed: string; motif?: 'city' | 'people' | 'event' | 'nature' | 'care' };

export type Post = {
  slug: string;
  type: 'news' | 'project';
  title: string;
  excerpt: string;
  date: string;
  cover: Art;
  tags: string[];
  body: string[]; // абзаци; рядок, що починається з "## ", стає підзаголовком, з "> " цитатою
  stats?: { value: string; label: string }[];
  status?: 'active' | 'done';
};

export const projects: Post[] = [
  {
    slug: 'zir-dlia-ditei',
    type: 'project',
    title: 'Чіткий зір для кожної дитини',
    excerpt: 'Безкоштовні перевірки зору в школах Львова і окуляри для дітей, яким вони потрібні.',
    date: '2026-09-15',
    cover: { seed: 'vision-kids', motif: 'people' },
    tags: ['vision', 'youth'],
    status: 'active',
    stats: [
      { value: '1 240', label: 'дітей перевірили' },
      { value: '186', label: 'пар окулярів' },
      { value: '9', label: 'шкіл' },
    ],
    body: [
      'Багато дітей, які погано бачать дошку, просто не знають про це. Ми привозимо до школи команду оптометристів і за один день перевіряємо зір цілих паралелей.',
      '## Як це працює',
      'Школа подає заявку, ми погоджуємо дату з адміністрацією та батьками. Перевірка триває 5-7 хвилин на дитину. Якщо потрібні окуляри, клуб оплачує їх повністю.',
      '> Зір це перший напрям служіння Lions з 1925 року. Для нас це не історія, а щоденна робота.',
      '## Що далі',
      'У 2027 році плануємо охопити ще 12 шкіл Львівської громади і запустити виїзні перевірки в селах області.',
    ],
  },
  {
    slug: 'svitlo-dlia-hromad',
    type: 'project',
    title: 'Світло для громад',
    excerpt: 'Генератори для шкіл, амбулаторій і пунктів незламності разом із Lions з Європи.',
    date: '2026-10-20',
    cover: { seed: 'generators', motif: 'care' },
    tags: ['humanitarian', 'environment'],
    status: 'active',
    stats: [
      { value: '36', label: 'генераторів' },
      { value: '14', label: 'громад' },
    ],
    body: [
      'Після атак на енергосистему школи й амбулаторії лишаються без світла. Разом із клубами District 134 і партнерами з Європи ми передаємо генератори туди, де вони потрібні найбільше.',
      '## Прозорість',
      'Кожен генератор має акт передачі, фото та контакт відповідальної людини в громаді. Звіти публікуємо в розділі "Підтримати".',
    ],
  },
  {
    slug: 'derevo-za-kozhnoho',
    type: 'project',
    title: 'Дерево за кожного',
    excerpt: 'Висаджуємо алею пам’яті у парку на Сихові: одне дерево за кожного захисника з району.',
    date: '2026-04-12',
    cover: { seed: 'trees', motif: 'nature' },
    tags: ['environment'],
    status: 'done',
    stats: [{ value: '120', label: 'дерев висаджено' }],
    body: [
      'Проєкт ініціювали мешканці району. Клуб узяв на себе саджанці, догляд протягом двох років і табличку з QR-кодом до історій людей.',
    ],
  },
  {
    slug: 'mentory-leo',
    type: 'project',
    title: 'Ментори для молоді',
    excerpt: 'Готуємо до запуску Leo-клуб: члени клубу менторять студентів у кар’єрі та волонтерстві.',
    date: '2026-11-02',
    cover: { seed: 'leo-mentors', motif: 'people' },
    tags: ['youth'],
    status: 'active',
    body: [
      'Leo-клуби це молодіжна програма Lions International для людей 12-30 років. Ми шукаємо університет-партнера і перших 15 учасників.',
    ],
  },
];

export const news: Post[] = [
  {
    slug: 'pershi-zbory-klubu',
    type: 'news',
    title: 'Відбулися установчі збори клубу',
    excerpt: 'Обрали правління, погодили назву Lviv Leopolis і перші три напрями служіння.',
    date: '2026-11-18',
    cover: { seed: 'founding', motif: 'event' },
    tags: ['club'],
    body: [
      'Установчі збори пройшли у форматі вечері. Ми затвердили статут, обрали правління на перший Lions-рік і погодили назву: Lions Club Lviv Leopolis.',
      '## Чому Leopolis',
      'Leopolis це латинська назва Львова, буквально "місто лева". Для клубу, що носить ім’я Lions, важко придумати точнішу назву.',
      'Наступний крок: подання документів на чартер через District 134.',
    ],
  },
  {
    slug: 'perevirka-zoru-shkola',
    type: 'news',
    title: '312 дітей перевірили зір за один день',
    excerpt: 'Виїзна перевірка в ліцеї на Левандівці: 41 дитині потрібні окуляри.',
    date: '2026-11-07',
    cover: { seed: 'vision-day', motif: 'people' },
    tags: ['vision'],
    body: [
      'Команда з шести оптометристів і восьми волонтерів клубу працювала з 9:00 до 17:00. Батьки отримали результати в той самий день.',
      'Окуляри для 41 дитини виготовлять до кінця місяця, їх оплачує клуб.',
    ],
  },
  {
    slug: 'heneratory-zhovten',
    type: 'news',
    title: 'Ще 8 генераторів поїхали в громади області',
    excerpt: 'Партія від клубів Фінляндії та Німеччини вже працює у школах і амбулаторіях.',
    date: '2026-10-24',
    cover: { seed: 'gen-oct', motif: 'care' },
    tags: ['humanitarian'],
    body: [
      'Генератори прибули через логістичний хаб у Польщі. Розподіл погоджували з місцевими адміністраціями через District 134.',
    ],
  },
  {
    slug: 'blahodiinyi-vechir-zyma',
    type: 'news',
    title: 'Анонс: зимовий благодійний вечір',
    excerpt: '13 грудня збираємо кошти на окуляри для дітей. Квитки обмежені.',
    date: '2026-11-21',
    cover: { seed: 'winter-gala', motif: 'event' },
    tags: ['event'],
    body: [
      'Музика, аукціон робіт львівських художників і розмова про те, що ми встигли за перший сезон.',
      'Усі кошти підуть на проєкт "Чіткий зір для кожної дитини".',
    ],
  },
];

export type Event = {
  slug: string;
  title: string;
  start: string;
  end: string;
  location: string;
  address?: string;
  visibility: 'public' | 'members';
  kind: 'meeting' | 'service' | 'gala';
  description: string;
};

export const events: Event[] = [
  {
    slug: 'zbory-2026-12-08',
    title: 'Регулярні збори клубу',
    start: '2026-12-08T19:00:00+02:00',
    end: '2026-12-08T21:00:00+02:00',
    location: 'Місце уточнюється',
    visibility: 'members',
    kind: 'meeting',
    description: 'Звіт проєктів, планування грудня, голосування за бюджет вечора.',
  },
  {
    slug: 'zymovyi-vechir-2026',
    title: 'Зимовий благодійний вечір',
    start: '2026-12-13T18:30:00+02:00',
    end: '2026-12-13T22:30:00+02:00',
    location: 'Центр Львова, зал уточнюється',
    visibility: 'public',
    kind: 'gala',
    description: 'Музика, аукціон, звіт першого сезону. Кошти на окуляри для дітей.',
  },
  {
    slug: 'perevirka-zoru-sykhiv',
    title: 'Перевірка зору в школі на Сихові',
    start: '2026-12-17T09:00:00+02:00',
    end: '2026-12-17T16:00:00+02:00',
    location: 'Школа на Сихові',
    visibility: 'public',
    kind: 'service',
    description: 'Потрібні 6 волонтерів для реєстрації та супроводу дітей.',
  },
  {
    slug: 'zbory-2026-12-22',
    title: 'Регулярні збори клубу',
    start: '2026-12-22T19:00:00+02:00',
    end: '2026-12-22T21:00:00+02:00',
    location: 'Місце уточнюється',
    visibility: 'members',
    kind: 'meeting',
    description: 'Підсумки року, різдвяні привітання для партнерів.',
  },
  {
    slug: 'zbory-2027-01-12',
    title: 'Регулярні збори клубу',
    start: '2027-01-12T19:00:00+02:00',
    end: '2027-01-12T21:00:00+02:00',
    location: 'Місце уточнюється',
    visibility: 'members',
    kind: 'meeting',
    description: 'План на другу половину Lions-року.',
  },
  {
    slug: 'vidkrytyi-vechir-2027-01',
    title: 'Відкритий вечір для гостей',
    start: '2027-01-27T19:00:00+02:00',
    end: '2027-01-27T21:00:00+02:00',
    location: 'Місце уточнюється',
    visibility: 'public',
    kind: 'meeting',
    description: 'Розповідаємо про клуб тим, хто думає долучитися. Запис через форму "Приєднатися".',
  },
  {
    slug: 'ustanovchi-zbory',
    title: 'Установчі збори клубу',
    start: '2026-11-18T19:00:00+02:00',
    end: '2026-11-18T22:00:00+02:00',
    location: 'Львів',
    visibility: 'public',
    kind: 'meeting',
    description: 'Обрання правління і затвердження назви.',
  },
];

export type Album = { slug: string; title: string; date: string; eventSlug?: string; photos: Art[] };

const shots = (base: string, n: number, motif: Art['motif']): Art[] =>
  Array.from({ length: n }, (_, i) => ({ seed: `${base}-${i}`, motif }));

export const albums: Album[] = [
  { slug: 'ustanovchi-zbory', title: 'Установчі збори', date: '2026-11-18', eventSlug: 'ustanovchi-zbory', photos: shots('found', 9, 'event') },
  { slug: 'zir-levandivka', title: 'Перевірка зору, Левандівка', date: '2026-11-07', photos: shots('lev', 12, 'people') },
  { slug: 'heneratory', title: 'Генератори для громад', date: '2026-10-24', photos: shots('gen', 7, 'care') },
  { slug: 'aleia-pamiati', title: 'Алея пам’яті на Сихові', date: '2026-04-12', photos: shots('trees', 10, 'nature') },
];

export type Member = { slug: string; name: string; role: string; since: number; field?: string; bio?: string; quote?: string; board: boolean };

// Профілі заповнюють самі члени клубу після згоди на публікацію.
export const members: Member[] = [
  { slug: 'president', name: 'Президент клубу', role: 'Президент', since: 2026, field: 'Профіль заповнюється', quote: 'Цитата "Чому я в Lions" з’явиться після погодження.', board: true },
  { slug: 'vice-president', name: 'Віцепрезидент клубу', role: 'Віцепрезидент', since: 2026, field: 'Профіль заповнюється', board: true },
  { slug: 'secretary', name: 'Секретар клубу', role: 'Секретар', since: 2026, field: 'Профіль заповнюється', board: true },
  { slug: 'treasurer', name: 'Скарбник клубу', role: 'Скарбник', since: 2026, field: 'Профіль заповнюється', board: true },
  { slug: 'membership', name: 'Директор з членства', role: 'Директор з членства', since: 2026, field: 'Профіль заповнюється', board: true },
  { slug: 'service', name: 'Координатор служіння', role: 'Координатор служіння', since: 2026, field: 'Профіль заповнюється', board: true },
  { slug: 'marketing', name: 'Координатор комунікацій', role: 'Комунікації', since: 2026, field: 'Профіль заповнюється', board: true },
  { slug: 'member-1', name: 'Член клубу', role: 'Член клубу', since: 2026, board: false },
  { slug: 'member-2', name: 'Член клубу', role: 'Член клубу', since: 2026, board: false },
  { slug: 'member-3', name: 'Член клубу', role: 'Член клубу', since: 2026, board: false },
  { slug: 'member-4', name: 'Член клубу', role: 'Член клубу', since: 2026, board: false },
  { slug: 'member-5', name: 'Член клубу', role: 'Член клубу', since: 2026, board: false },
];

export type Review = { id: string; author: string; kind: 'partner' | 'beneficiary' | 'volunteer' | 'guest'; text: string; date: string };

export const reviews: Review[] = [
  { id: 'r1', author: 'Приклад відгуку партнера', kind: 'partner', text: 'Тут буде справжній відгук партнера після модерації та згоди автора на публікацію.', date: '2026-11-10' },
  { id: 'r2', author: 'Приклад відгуку волонтера', kind: 'volunteer', text: 'Відгуки проходять модерацію в адмінці. Негативні отримує правління приватно.', date: '2026-11-08' },
  { id: 'r3', author: 'Приклад відгуку батьків', kind: 'beneficiary', text: 'Форма на цій сторінці працює в демо-режимі: відгук з’явиться в адмінці на модерації.', date: '2026-11-05' },
];

export const kindLabel: Record<Review['kind'], string> = {
  partner: 'Партнер',
  beneficiary: 'Отримувач допомоги',
  volunteer: 'Волонтер',
  guest: 'Гість',
};

export const allPosts = [...news, ...projects].sort((a, b) => b.date.localeCompare(a.date));
