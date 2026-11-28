// Двомовність: англійська основна (/), українська під /uk/.
import { u } from '../lib/url';

export type Lang = 'en' | 'uk';
export const LANGS: Lang[] = ['en', 'uk'];
export const DEFAULT_LANG: Lang = 'en';
export type L = { en: string; uk: string };

/** getStaticPaths для сторінок у src/pages/[...lang]/ */
export const langPaths = () => [{ params: { lang: undefined } }, { params: { lang: 'uk' } }];

export const langOf = (param?: string): Lang => (param === 'uk' ? 'uk' : 'en');

/** Перекласти двомовне поле */
export const tr = (lang: Lang, v: L | string | undefined): string => (v == null ? '' : typeof v === 'string' ? v : v[lang] ?? v.en);

/** Посилання з урахуванням мови і BASE_PATH */
export const lp = (lang: Lang, path = '/') => u(lang === 'uk' ? (path === '/' ? '/uk' : `/uk${path}`) : path);

/** Мова поточної сторінки за URL (для компонентів) */
export function langFromUrl(url: URL): Lang {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = url.pathname.startsWith(base) ? url.pathname.slice(base.length) : url.pathname;
  return /^\/uk(\/|$)/.test(p) ? 'uk' : 'en';
}

/** Той самий шлях іншою мовою (для перемикача і hreflang) */
export function switchPath(pathname: string, to: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  p = p.replace(/^\/uk(?=\/|$)/, '') || '/';
  // Службові сторінки існують лише в одній версії: ведемо на головну іншою мовою
  if (/^\/(404|styleguide|og-card)(\/|\.html)?$/.test(p)) p = '/';
  return lp(to, p);
}

export const locale = (lang: Lang) => (lang === 'uk' ? 'uk-UA' : 'en-GB');

// ---------------- Словник інтерфейсу ----------------
const en = {
  demoBanner: 'Demo version of the site. Content is illustrative.',
  demoBannerLink: 'Sign in as an editor',
  demoBannerTail: 'to try the admin panel.',
  skip: 'Skip to content',
  menu: 'Menu',
  signIn: 'Sign in',
  admin: 'Admin',
  account: 'My account',
  support: 'Donate',
  join: 'Join',
  nav: { about: 'About', projects: 'Projects', news: 'News', events: 'Events', gallery: 'Gallery', members: 'Members', reviews: 'Reviews', contacts: 'Contact', brand: 'Brand & media', privacy: 'Privacy', lions: 'About Lions', feedback: 'Website feedback' },
  footerClub: 'Club',
  footerJoin: 'Get involved',
  footerContact: 'Contact',
  footerCalendar: 'Events calendar (ICS)',
  footerFeedback: 'Suggest a website improvement',
  footerMember: 'Member of Lions Clubs International.',
  footerTm: 'Lions names and emblems are trademarks of Lions Clubs International.',
  demo: 'demo',
  demoData: 'demo data',
  demoExample: 'demo example',
  forMembers: 'members only',
  done: 'completed',
  allNews: 'All news',
  allProjects: 'All projects',
  allEvents: 'All events',
  allAlbums: 'All albums',
  allMembers: 'All members',
  moreNews: 'More news',
  otherProjects: 'Other projects',
  photos: 'photos',
  source: 'Source',
  sourceFb: 'club page on Facebook',
  supportProject: 'Support this project',
  helpProject: 'Want to help this project?',
  comments: {
    title: 'Comments', empty: 'No comments yet. Ask the first question.', guest: 'Signed-in users can comment.',
    label: 'Your comment', placeholder: 'What would you like to ask or add?', submit: 'Post comment',
    pending: 'Comment sent. It will appear after moderation.', published: 'Comment published.', moderation: 'pending moderation',
  },
  lang: { switchTo: 'Українська', short: 'UA', current: 'English' },
};

type Dict = typeof en;

const uk: Dict = {
  demoBanner: 'Демо-версія сайту. Контент умовний.',
  demoBannerLink: 'Увійти як редактор',
  demoBannerTail: 'щоб спробувати адмінку.',
  skip: 'Перейти до змісту',
  menu: 'Меню',
  signIn: 'Увійти',
  admin: 'Адмінка',
  account: 'Кабінет',
  support: 'Підтримати',
  join: 'Приєднатися',
  nav: { about: 'Про клуб', projects: 'Проєкти', news: 'Новини', events: 'Події', gallery: 'Галерея', members: 'Учасники', reviews: 'Відгуки', contacts: 'Контакти', brand: 'Бренд і матеріали', privacy: 'Конфіденційність', lions: 'Про Lions', feedback: 'Побажання до сайту' },
  footerClub: 'Клуб',
  footerJoin: 'Долучитися',
  footerContact: 'Зв’язок',
  footerCalendar: 'Календар подій (ICS)',
  footerFeedback: 'Запропонувати зміни до сайту',
  footerMember: 'Член Lions Clubs International.',
  footerTm: 'Назви та емблеми Lions є торговельними марками Lions Clubs International.',
  demo: 'демо',
  demoData: 'демо-дані',
  demoExample: 'демо-приклад',
  forMembers: 'для членів клубу',
  done: 'завершено',
  allNews: 'Усі новини',
  allProjects: 'Усі проєкти',
  allEvents: 'Усі події',
  allAlbums: 'Усі альбоми',
  allMembers: 'Усі учасники',
  moreNews: 'Ще новини',
  otherProjects: 'Інші проєкти',
  photos: 'фото',
  source: 'Джерело',
  sourceFb: 'сторінка клубу у Facebook',
  supportProject: 'Підтримати проєкт',
  helpProject: 'Хочете допомогти цьому проєкту?',
  comments: {
    title: 'Коментарі', empty: 'Коментарів ще немає. Поставте перше запитання.', guest: 'Коментувати можуть авторизовані користувачі.',
    label: 'Ваш коментар', placeholder: 'Що хочете запитати чи додати?', submit: 'Надіслати коментар',
    pending: 'Коментар надіслано. Він з’явиться після модерації.', published: 'Коментар опубліковано.', moderation: 'на модерації',
  },
  lang: { switchTo: 'English', short: 'EN', current: 'Українська' },
};

export const ui: Record<Lang, Dict> = { en, uk };
export const t = (lang: Lang) => ui[lang];

// Кількість фото: 1 photo / 5 photos; українською «фото» не змінюється
export const photoCount = (lang: Lang, n: number) => (lang === 'uk' ? `${n} фото` : `${n} ${n === 1 ? 'photo' : 'photos'}`);

// Українська форма множини: 1 член, 2-4 члени, 5+ членів
export const ukPlural = (n: number, one: string, few: string, many: string) => {
  const d = n % 10, h = n % 100;
  if (d === 1 && h !== 11) return one;
  if (d >= 2 && d <= 4 && (h < 12 || h > 14)) return few;
  return many;
};
