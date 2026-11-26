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
  { year: '1917', title: { en: 'The beginning', uk: 'Початок' }, text: { en: 'On 7 June 1917 Chicago business leader Melvin Jones brought together business clubs that wanted to serve their communities. This is how Lions Clubs was born.', uk: '7 червня 1917 року чиказький підприємець Мелвін Джонс обʼєднав ділові клуби, які хотіли служити своїм громадам. Так зʼявилися Lions Clubs.' } },
  { year: '1920', title: { en: 'Going international', uk: 'Міжнародна організація' }, text: { en: 'The first club outside the United States is chartered in Windsor, Canada.', uk: 'Перший клуб за межами США засновано у Віндзорі, Канада.' } },
  { year: '1925', title: { en: 'Knights of the Blind', uk: 'Лицарі незрячих' }, text: { en: 'Helen Keller addresses the international convention in Cedar Point, Ohio, and challenges Lions to become “Knights of the Blind”. Vision becomes a core cause.', uk: 'Гелен Келлер виступає на міжнародній конвенції в Сідар-Пойнті (Огайо) і закликає Lions стати «лицарями незрячих». Зір стає ключовим напрямом служіння.' } },
  { year: '1945', title: { en: 'United Nations', uk: 'Організація Обʼєднаних Націй' }, text: { en: 'Lions are among the first non-governmental organisations invited to help draft the United Nations Charter.', uk: 'Lions серед перших неурядових організацій, запрошених допомогти у створенні Статуту ООН.' } },
  { year: '1954', title: { en: 'We Serve', uk: 'We Serve' }, text: { en: 'After an international contest among Lions, “We Serve” becomes the official motto.', uk: 'Після міжнародного конкурсу серед Lions офіційним девізом стає «We Serve» («Ми служимо»).' } },
  { year: '1957', title: { en: 'Leo clubs', uk: 'Leo-клуби' }, text: { en: 'Lions launch the Leo programme so young people can serve and lead.', uk: 'Lions запускають програму Leo, щоб молодь могла служити і вчитися лідерства.' } },
  { year: '1968', title: { en: 'LCIF', uk: 'Фонд LCIF' }, text: { en: 'Lions Clubs International Foundation is established to fund humanitarian projects of Lions around the world.', uk: 'Засновано Lions Clubs International Foundation, фонд, що фінансує гуманітарні проєкти Lions у всьому світі.' } },
  { year: '1987', title: { en: 'Women join', uk: 'Жінки в Lions' }, text: { en: 'The association amends its bylaws and invites women to become members.', uk: 'Асоціація змінює статут і запрошує жінок ставати членами клубів.' } },
  { year: '1990', title: { en: 'SightFirst', uk: 'SightFirst' }, text: { en: 'The SightFirst programme starts restoring sight and preventing blindness on a global scale.', uk: 'Стартує програма SightFirst: відновлення зору і запобігання сліпоті у світовому масштабі.' } },
];

export const ukraine: { year: string; text: L }[] = [
  { year: '1993', text: { en: 'The first Lions club in Ukraine is founded.', uk: 'Засновано перший Lions клуб в Україні.' } },
  { year: '1997', text: { en: 'Ukraine joins the Lions Youth Camp and Exchange programme.', uk: 'Україна долучається до програми молодіжних таборів і обміну Lions.' } },
  { year: '2011', text: { en: 'Provisional Region Ukraine unites 9 Ukrainian clubs.', uk: 'Provisional Region Ukraine обʼєднує 9 українських клубів.' } },
  { year: '2018', text: { en: 'District 134 Ukraine is founded with 19 clubs and 470 members.', uk: 'Засновано District 134 Ukraine: 19 клубів і 470 членів.' } },
  { year: '2022', text: { en: 'From the first days of the full-scale war, Lions around the world support Ukraine: aid for hospitals, displaced people and communities, LCIF grants.', uk: 'З перших днів повномасштабної війни Lions у всьому світі підтримують Україну: допомога лікарням, переселенцям і громадам, гранти LCIF.' } },
  { year: '2026', text: { en: 'In March 2026 the International Board approved the undistricting of District 134. Clubs in Ukraine continue their work with the support of a Lions International working group.', uk: 'У березні 2026 року Міжнародне правління ухвалило розформування District 134. Клуби в Україні продовжують роботу за підтримки робочої групи Lions International.' } },
];

// Клуби в доброму статусі за реєстром Lions International (вересень 2025) + наш клуб.
export const clubs: { city: L; names: string; note: L }[] = [
  { city: { en: 'Kyiv', uk: 'Київ' }, names: 'Kyiv Lions Club, Kyiv Ecology, Kyiv Lions Quest', note: { en: 'The largest group of clubs. Kyiv Lions Club has a long international history; since 2022 Lions across Europe have sent aid to hospitals it named. Lion Serhii Denisenko of Kyiv Ecology was a guest at our second meeting.', uk: 'Найбільша група клубів. Kyiv Lions Club має давню міжнародну історію; з 2022 року Lions з усієї Європи передають допомогу лікарням, які він визначив. Lion Сергій Денисенко з Kyiv Ecology був гостем нашої другої зустрічі.' } },
  { city: { en: 'Lviv', uk: 'Львів' }, names: 'Lions Club Lviv, Lviv International Lions Club', note: { en: 'Roman Monastyrskyy of Lions Club Lviv was the guest at our first meeting. Lviv International Lions Club is a new English-speaking club that first met in November 2026.', uk: 'Роман Монастирський з Lions Club Lviv був гостем нашої першої зустрічі. Lviv International Lions Club: новий англомовний клуб, перша зустріч якого відбулася в листопаді 2026 року.' } },
  { city: { en: 'Chernihiv', uk: 'Чернігів' }, names: 'Lions Club Chernihiv, Chernihiv Siver', note: { en: 'Several clubs serve the city and the region.', uk: 'Кілька клубів служать місту й області.' } },
  { city: { en: 'Cherkasy', uk: 'Черкаси' }, names: 'Lions Club Cherkasy', note: { en: 'Serves the community of central Ukraine.', uk: 'Служить громаді в центральній Україні.' } },
  { city: { en: 'Poltava', uk: 'Полтава' }, names: 'Lions Club Poltava City', note: { en: 'Serves the city of Poltava.', uk: 'Служить громаді Полтави.' } },
  { city: { en: 'Sumy', uk: 'Суми' }, names: 'Lions Club Sumy', note: { en: 'Serves the city near the front line in the north-east of Ukraine.', uk: 'Служить місту поблизу лінії фронту на північному сході України.' } },
  { city: { en: 'Berezhany', uk: 'Бережани' }, names: 'Lions Club Berezhany', note: { en: 'A club in a small historic town in the Ternopil region.', uk: 'Клуб у невеликому історичному місті на Тернопільщині.' } },
];

export const lionAi = {
  url: 'https://www.lionsclubs.org/en/lion-ai',
  about: 'https://www.lionsclubs.org/en/about-lion-ai',
  points: [
    { title: { en: 'Built for Lions', uk: 'Створено для Lions' }, text: { en: 'Ellie answers questions about Lions programmes, finds resources on lionsclubs.org and gives recommendations.', uk: 'Ellie відповідає на запитання про програми Lions, знаходить матеріали на lionsclubs.org і дає рекомендації.' } },
    { title: { en: 'Helps create', uk: 'Допомагає створювати' }, text: { en: 'As a generative assistant, it can help draft something new, for example ideas or text for a service project.', uk: 'Як генеративний асистент, вона допомагає створити щось нове, наприклад ідеї чи текст для проєкту служіння.' } },
    { title: { en: 'Public data only', uk: 'Лише публічні дані' }, text: { en: 'It uses only information from the Lions International website, has no access to membership data and does not share information with third parties.', uk: 'Використовує лише інформацію з сайту Lions International, не має доступу до даних членів і не передає інформацію третім особам.' } },
    { title: { en: 'Still learning', uk: 'Ще вчиться' }, text: { en: 'Lions International notes that Ellie is still learning and can make mistakes, so check important answers.', uk: 'Lions International попереджає, що Ellie ще вчиться і може помилятися, тож важливі відповіді варто перевіряти.' } },
  ] as { title: L; text: L }[],
};
