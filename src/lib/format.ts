import type { Lang } from '../i18n';
const TZ = 'Europe/Kyiv';
const loc = (lang: Lang = 'en') => (lang === 'uk' ? 'uk-UA' : 'en-GB');
const f = (iso: string, lang: Lang, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(loc(lang), { timeZone: TZ, ...o }).format(new Date(iso));

export const dateLong = (iso: string, lang: Lang = 'en') => f(iso, lang, { day: 'numeric', month: 'long', year: 'numeric' });
export const dateShort = (iso: string, lang: Lang = 'en') => f(iso, lang, { day: 'numeric', month: 'long' });
export const dayNum = (iso: string, lang: Lang = 'en') => f(iso, lang, { day: 'numeric' });
export const monthShort = (iso: string, lang: Lang = 'en') => f(iso, lang, { month: 'short' }).replace('.', '');
export const weekdayShort = (iso: string, lang: Lang = 'en') => f(iso, lang, { weekday: 'short' }).replace('.', '');
export const weekday = (iso: string, lang: Lang = 'en') => f(iso, lang, { weekday: 'long' });
export const time = (iso: string, lang: Lang = 'en') => f(iso, lang, { hour: '2-digit', minute: '2-digit' });
export const monthTitle = (key: string, lang: Lang = 'en') => new Intl.DateTimeFormat(loc(lang), { month: 'long', year: 'numeric' }).format(new Date(`${key}-15`));

