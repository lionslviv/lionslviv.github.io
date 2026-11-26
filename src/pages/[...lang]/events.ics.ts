import type { APIRoute } from 'astro';
import { events } from '../../data/live';
import { icsCalendar } from '../../lib/ics';
import { langPaths, langOf, tr } from '../../i18n';
export const getStaticPaths = langPaths;

// Публічний ICS-фід: тільки відкриті події. /events.ics англійською, /uk/events.ics українською.
export const GET: APIRoute = ({ site, params }) => {
  const lang = langOf(params.lang);
  const pre = `${import.meta.env.BASE_URL.replace(/\/$/, '')}${lang === 'uk' ? '/uk' : ''}`;
  const body = icsCalendar(
    events.filter((e) => e.visibility === 'public').map((e) => ({
      uid: e.slug, title: tr(lang, e.title), start: e.start, end: e.end, location: tr(lang, e.location), description: tr(lang, e.description), allDay: e.timeUnknown,
      url: new URL(`${pre}/events/${e.slug}`, site).toString(),
    })),
  );
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
