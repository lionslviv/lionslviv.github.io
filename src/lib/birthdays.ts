import { members } from '../data/content';
import type { L } from '../i18n';

export type Birthday = { slug: string; name: L; date: string }; // date: YYYY-MM-DD (Київ)

// Дні народження між місяцями fromKey і toKey (обидва 'YYYY-MM', включно).
export function birthdaysBetween(fromKey: string, toKey: string): Birthday[] {
  const fy = Number(fromKey.slice(0, 4));
  const ty = Number(toKey.slice(0, 4));
  const out: Birthday[] = [];
  for (const m of members) {
    if (!m.birthday) continue;
    for (let y = fy; y <= ty; y++) {
      const date = `${y}-${m.birthday}`;
      const key = date.slice(0, 7);
      if (key >= fromKey && key <= toKey) out.push({ slug: m.slug, name: m.name, date });
    }
  }
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

// 'YYYY-MM' через n місяців
export function addMonths(key: string, n: number): string {
  const [y, m] = key.split('-').map(Number);
  const t = y * 12 + (m - 1) + n;
  return `${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, '0')}`;
}

export const birthdayMembers = members.filter((m) => m.birthday);
