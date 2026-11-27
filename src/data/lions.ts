// Довідкові дані про Lions International, Lions в Україні та Lion AI.
// Джерела перевірено 27.11.2026:
//  - lionsclubs.org (історія, LCIF, Lion AI: /en/lion-ai, /en/about-lion-ai)
//  - LION Magazine, квітень-червень 2026: звіт засідання правління 15-18.03.2026 (розформування District 134)
//  - lions.org.ua (історія Lions в Україні)
//  - реєстр членства Lions International по District 134, вересень 2025 (клуби в доброму статусі)
import type { L } from '../i18n';

export const today: { value: L; label: L }[] = [
  { value: { en: '1.4M', uk: '1,4 млн' }, label: { en: 'members worldwide', uk: 'членів у світі' } },
  { value: { en: '50,000', uk: '50 000' }, label: { en: 'clubs', uk: 'клубів' } },
  { value: { en: '200+', uk: '200+' }, label: { en: 'countries and geographic areas', uk: 'країн і територій' } },
];

export const history: { year: string; title: L; text: L }[] = [
  { year: '1917', title: { en: 'The beginning', uk: 'Початок' }, text: { en: 'On 7 June 1917 Chicago business leader Melvin Jones brought together business clubs that wanted to serve their communities. That was the beginning of Lions Clubs.', uk: '7 червня 1917 року чиказький підприємець Мелвін Джонс об’єднав ділові клуби, які хотіли служити своїм громадам. Так з’явилися Lions Clubs.' } },
  { year: '1920', title: { en: 'Going international', uk: 'Міжнародна організація' }, text: { en: 'The first club outside the United States was chartered in Windsor, Canada.', uk: 'Перший клуб за межами США заснували у Віндзорі, Канада.' } },
  { year: '1925', title: { en: 'Knights of the Blind', uk: 'Лицарі незрячих' }, text: { en: 'Helen Keller addressed the international convention at Cedar Point, Ohio, and challenged Lions to become “Knights of the Blind”. Vision became a core cause.', uk: 'Гелен Келлер виступила на міжнародній конвенції в Сідар-Пойнті (Огайо) і закликала Lions стати «лицарями незрячих». Зір став ключовим напрямом служіння.' } },
  { year: '1945', title: { en: 'United Nations', uk: 'Організація Об’єднаних Націй' }, text: { en: 'Lions were among the first non-governmental organisations invited to help draft the United Nations Charter.', uk: 'Lions були серед перших неурядових організацій, яких запросили допомогти створити Статут ООН.' } },
  { year: '1954', title: { en: 'We Serve', uk: 'We Serve' }, text: { en: 'After an international contest among Lions, “We Serve” became the official motto.', uk: 'Після міжнародного конкурсу серед Lions офіційним девізом став «We Serve» («Ми служимо»).' } },
  { year: '1957', title: { en: 'Leo clubs', uk: 'Leo-клуби' }, text: { en: 'Lions launched the Leo programme so that young people could serve and lead.', uk: 'Lions запустили програму Leo, щоб молодь могла служити і вчитися лідерства.' } },
  { year: '1968', title: { en: 'LCIF', uk: 'Фонд LCIF' }, text: { en: 'Lions Clubs International Foundation was established to fund Lions humanitarian projects around the world.', uk: 'Засновано Lions Clubs International Foundation, фонд, що фінансує гуманітарні проєкти Lions у всьому світі.' } },
  { year: '1987', title: { en: 'Women join', uk: 'Жінки в Lions' }, text: { en: 'The association amended its bylaws and invited women to become members.', uk: 'Асоціація змінила статут і запросила жінок ставати членами клубів.' } },
  { year: '1990', title: { en: 'SightFirst', uk: 'SightFirst' }, text: { en: 'The SightFirst programme began restoring sight and preventing blindness on a global scale.', uk: 'Стартувала програма SightFirst: відновлення зору і запобігання сліпоті у світовому масштабі.' } },
];

export const ukraine: { year: string; text: L }[] = [
  { year: '1993', text: { en: 'The first Lions club in Ukraine was founded.', uk: 'Засновано перший Lions клуб в Україні.' } },
  { year: '1997', text: { en: 'Ukraine joined the Lions Youth Camp and Exchange programme.', uk: 'Україна долучилася до програми молодіжних таборів і обміну Lions.' } },
  { year: '2011', text: { en: 'Provisional Region Ukraine united 9 Ukrainian clubs.', uk: 'Provisional Region Ukraine об’єднав 9 українських клубів.' } },
  { year: '2018', text: { en: 'District 134 Ukraine was founded with 19 clubs and 470 members.', uk: 'Засновано District 134 Ukraine: 19 клубів і 470 членів.' } },
  { year: '2022', text: { en: 'From the first days of the full-scale war, Lions around the world have supported Ukraine: aid for hospitals, displaced people and communities, LCIF grants.', uk: 'З перших днів повномасштабної війни Lions у всьому світі підтримують Україну: допомога лікарням, переселенцям і громадам, гранти LCIF.' } },
  { year: '2026', text: { en: 'In March 2026 the International Board approved the undistricting of District 134. Clubs in Ukraine continue their work with the support of a Lions International working group.', uk: 'У березні 2026 року Міжнародне правління ухвалило розформування District 134. Клуби в Україні продовжують роботу за підтримки робочої групи Lions International.' } },
];

// Клуби в доброму статусі за реєстром Lions International (вересень 2025) + наш клуб.
export const clubs: { city: L; names: string; note: L; links?: { label: string; url: string }[] }[] = [
  { city: { en: 'Kyiv', uk: 'Київ' }, names: 'Kyiv Lions Club, Kyiv Ecology, Kyiv Lions Quest',
    links: [{ label: 'Kyiv Lions Club', url: 'https://www.facebook.com/kyivlions/' }], note: { en: 'The largest group of clubs. Kyiv Lions Club has a long international history; since 2022 Lions across Europe have sent aid to hospitals it named. Lion Serhii Denisenko of Kyiv Ecology was a guest at our second meeting.', uk: 'Найбільша група клубів. Kyiv Lions Club має давню міжнародну історію; з 2022 року Lions з усієї Європи передають допомогу лікарням, які він визначив. Lion Сергій Денисенко з Kyiv Ecology був гостем нашої другої зустрічі.' } },
  { city: { en: 'Lviv', uk: 'Львів' }, names: 'Lions Club Lviv, Lviv International Lions Club',
    links: [{ label: 'Lions Club Lviv', url: 'https://www.facebook.com/p/Lions-Club-Lviv-61553940645092/' }], note: { en: 'Roman Monastyrskyy of Lions Club Lviv was the guest at our first meeting. Lviv International Lions Club is a new English-speaking club that first met in November 2026.', uk: 'Роман Монастирський з Lions Club Lviv був гостем нашої першої зустрічі. Lviv International Lions Club: новий англомовний клуб, перша зустріч якого відбулася в листопаді 2026 року.' } },
  { city: { en: 'Chernihiv', uk: 'Чернігів' }, names: 'Lions Club Chernihiv, Chernihiv Siver', note: { en: 'Several clubs serve the city and the region.', uk: 'Кілька клубів служать місту й області.' } },
  { city: { en: 'Cherkasy', uk: 'Черкаси' }, names: 'Lions Club Cherkasy', note: { en: 'Serves its community in central Ukraine.', uk: 'Служить громаді в центральній Україні.' } },
  { city: { en: 'Poltava', uk: 'Полтава' }, names: 'Lions Club Poltava City', note: { en: 'Serves the city of Poltava.', uk: 'Служить громаді Полтави.' } },
  { city: { en: 'Sumy', uk: 'Суми' }, names: 'Lions Club Sumy', note: { en: 'Serves a city near the front line in north-eastern Ukraine.', uk: 'Служить місту поблизу лінії фронту на північному сході України.' } },
  { city: { en: 'Stryi', uk: 'Стрий' }, names: 'Lions Club Stryi KO', note: { en: 'A club in Stryi, Lviv region.', uk: 'Клуб у Стрию на Львівщині.' } },
  { city: { en: 'Berezhany', uk: 'Бережани' }, names: 'Lions Club Berezhany', note: { en: 'A club in a small historic town in the Ternopil region.', uk: 'Клуб у невеликому історичному місті на Тернопільщині.' } },
];

export const lionAi = {
  url: 'https://www.lionsclubs.org/en/lion-ai',
  about: 'https://www.lionsclubs.org/en/about-lion-ai',
  points: [
    { title: { en: 'Built for Lions', uk: 'Створено для Lions' }, text: { en: 'Ellie answers questions about Lions programmes, finds resources on lionsclubs.org and gives recommendations.', uk: 'Ellie відповідає на запитання про програми Lions, знаходить матеріали на lionsclubs.org і дає рекомендації.' } },
    { title: { en: 'Helps create', uk: 'Допомагає створювати' }, text: { en: 'As a generative assistant, it can help draft something new, for example ideas or text for a service project.', uk: 'Як генеративна асистентка, вона допомагає створити щось нове, наприклад ідеї чи текст для проєкту служіння.' } },
    { title: { en: 'Public data only', uk: 'Лише публічні дані' }, text: { en: 'It uses only information from the Lions International website, has no access to membership data and does not share information with third parties.', uk: 'Вона використовує лише інформацію з сайту Lions International, не має доступу до даних членів і не передає інформацію третім особам.' } },
    { title: { en: 'Still learning', uk: 'Ще вчиться' }, text: { en: 'Lions International notes that Ellie is still learning and can make mistakes, so check important answers.', uk: 'Lions International попереджає, що Ellie ще вчиться і може помилятися, тож важливі відповіді варто перевіряти.' } },
  ] as { title: L; text: L }[],
};

// Спільні сторінки Lions в Україні (перевірено 27.11.2026)
export const ukraineLinks: { label: L; url: string; note: L }[] = [
  { label: { en: 'Lions International Ukraine', uk: 'Lions International Ukraine' }, url: 'https://www.facebook.com/LionsClubsInternationalUkraine/', note: { en: 'Official Facebook page of Lions in Ukraine', uk: 'Офіційна Facebook-сторінка Lions в Україні' } },
  { label: { en: 'Lions United for Ukraine', uk: 'Lions United for Ukraine' }, url: 'https://www.facebook.com/UkrLion/', note: { en: 'Lions platform for humanitarian aid to Ukraine', uk: 'Платформа Lions для гуманітарної допомоги Україні' } },
  { label: { en: 'Lions International for Ukraine', uk: 'Lions International для України' }, url: 'https://www.lionsclubs.org/UkraineResponse', note: { en: 'How Lions International and LCIF support Ukraine', uk: 'Як Lions International і LCIF підтримують Україну' } },
];
