import type { APIRoute } from 'astro';
import { events } from '../data/content';
import { icsCalendar } from '../lib/ics';

// Публічний ICS-фід: тільки відкриті події.
export const GET: APIRoute = ({ site }) => {
  const body = icsCalendar(
    events.filter((e) => e.visibility === 'public').map((e) => ({
      uid: e.slug, title: e.title, start: e.start, end: e.end, location: e.location, description: e.description,
      url: new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/events/${e.slug}`, site).toString(),
    })),
  );
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
