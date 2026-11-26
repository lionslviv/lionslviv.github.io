import type { APIRoute } from 'astro';
import { events } from '../../data/live';
import { icsCalendar } from '../../lib/ics';
import { birthdayMembers } from '../../lib/birthdays';
import { langPaths, langOf, tr } from '../../i18n';
export const getStaticPaths = langPaths;

// Публічний ICS-фід: тільки відкриті події і дні народження членів клубу. /events.ics англійською, /uk/events.ics українською.
export const GET: APIRoute = ({ site, params }) => {
  const lang = langOf(params.lang);
  const pre = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${lang === 'uk' ? '/uk' : ''}`;
  const body = icsCalendar(
    events.filter((e) => e.visibility === 'public').map((e) => ({
      uid: e.slug, title: tr(lang, e.title), start: e.start, end: e.end, location: tr(lang, e.location), description: tr(lang, e.description), allDay: e.timeUnknown,
      url: new URL(`${pre}/events/${e.slug}`, site).toString(),
    })).concat(
      // Дні народження членів клубу: щорічні події на весь день, без року народження
      birthdayMembers.map((m) => ({
        uid: `birthday-${m.slug}`,
        title: `${lang === 'uk' ? 'День народження' : 'Birthday'}: ${tr(lang, m.name)}`,
        start: `2026-${m.birthday}T12:00:00+02:00`, end: `2026-${m.birthday}T12:00:00+02:00`,
        allDay: true, yearly: true,
        url: new URL(`${pre}/members/${m.slug}`, site).toString(),
      })),
    ),
  );
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
