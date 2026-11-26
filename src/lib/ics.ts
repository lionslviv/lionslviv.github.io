// Генерація iCalendar (RFC 5545) для кнопки "Додати в календар" і ICS-фіду.
export type IcsEvent = {
  uid: string;
  title: string;
  description?: string;
  location?: string;
  start: string; // ISO
  end: string; // ISO
  url?: string;
  allDay?: boolean; // відома лише дата
};

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const day = (iso: string, plus = 0) => { const d = new Date(new Date(iso).toLocaleString('en-US', { timeZone: 'Europe/Kyiv' })); d.setDate(d.getDate() + plus); return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`; };
const esc = (s = '') => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

export function icsEvent(e: IcsEvent): string {
  return [
    'BEGIN:VEVENT',
    `UID:${e.uid}@lviv-international-lions`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    e.allDay ? `DTSTART;VALUE=DATE:${day(e.start)}` : `DTSTART:${stamp(e.start)}`,
    e.allDay ? `DTEND;VALUE=DATE:${day(e.start, 1)}` : `DTEND:${stamp(e.end)}`,
    `SUMMARY:${esc(e.title)}`,
    e.description ? `DESCRIPTION:${esc(e.description)}` : '',
    e.location ? `LOCATION:${esc(e.location)}` : '',
    e.url ? `URL:${e.url}` : '',
    'END:VEVENT',
  ].filter(Boolean).join('\r\n');
}

export function icsCalendar(events: IcsEvent[], name = 'Lviv International Lions Club'): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lviv International Lions Club//UK',
    'CALSCALE:GREGORIAN',
    `X-WR-CALNAME:${esc(name)}`,
    'X-WR-TIMEZONE:Europe/Kyiv',
    ...events.map(icsEvent),
    'END:VCALENDAR',
  ].join('\r\n');
}

export function googleCalendarUrl(e: IcsEvent): string {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: e.allDay ? `${day(e.start)}/${day(e.start, 1)}` : `${stamp(e.start)}/${stamp(e.end)}`,
    details: e.description ?? '',
    location: e.location ?? '',
    ctz: 'Europe/Kyiv',
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
