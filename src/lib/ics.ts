// Генерація iCalendar (RFC 5545) для кнопки "Додати в календар" і ICS-фіду.
export type IcsEvent = {
  uid: string;
  title: string;
  description?: string;
  location?: string;
  start: string; // ISO
  end: string; // ISO
  url?: string;
};

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
const esc = (s = '') => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

export function icsEvent(e: IcsEvent): string {
  return [
    'BEGIN:VEVENT',
    `UID:${e.uid}@leopolislions.org.ua`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(e.start)}`,
    `DTEND:${stamp(e.end)}`,
    `SUMMARY:${esc(e.title)}`,
    e.description ? `DESCRIPTION:${esc(e.description)}` : '',
    e.location ? `LOCATION:${esc(e.location)}` : '',
    e.url ? `URL:${e.url}` : '',
    'END:VEVENT',
  ].filter(Boolean).join('\r\n');
}

export function icsCalendar(events: IcsEvent[], name = 'Lions Club Leopolis'): string {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Lions Club Leopolis//UK',
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
    dates: `${stamp(e.start)}/${stamp(e.end)}`,
    details: e.description ?? '',
    location: e.location ?? '',
    ctz: 'Europe/Kyiv',
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
