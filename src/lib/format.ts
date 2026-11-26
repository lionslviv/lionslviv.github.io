const TZ = 'Europe/Kyiv';

export function dateLong(iso: string): string {
  return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }).format(new Date(iso));
}

export function dateShort(iso: string): string {
  return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', timeZone: TZ }).format(new Date(iso));
}

export function dayNum(iso: string): string {
  return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', timeZone: TZ }).format(new Date(iso));
}

export function monthShort(iso: string): string {
  return new Intl.DateTimeFormat('uk-UA', { month: 'short', timeZone: TZ }).format(new Date(iso)).replace('.', '');
}

export function weekday(iso: string): string {
  return new Intl.DateTimeFormat('uk-UA', { weekday: 'long', timeZone: TZ }).format(new Date(iso));
}

export function time(iso: string): string {
  return new Intl.DateTimeFormat('uk-UA', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(new Date(iso));
}

export function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}
