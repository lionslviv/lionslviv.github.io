import { members } from '../data/content';
import type { L } from '../i18n';

export type Birthday = { slug: string; name: L; date: string }; // date: YYYY-MM-DD (Київ)

// Найближчі дні народження: від першого дня місяця `from` на 12 місяців уперед.
export function birthdaysBetween(fromKey: string, months = 12): Birthday[] {
  const [fy, fm] = fromKey.split('-').map(Number);
  const start = `${fromKey}-01`;
  const endY = fy + Math.floor((fm - 1 + months) / 12);
  const endM = ((fm - 1 + months) % 12) + 1;
  const end = `${endY}-${String(endM).padStart(2, '0')}-01`;
  const out: Birthday[] = [];
  for (const m of members) {
    if (!m.birthday) continue;
    for (const y of [fy, fy + 1]) {
      const date = `${y}-${m.birthday}`;
      if (date >= start && date < end) out.push({ slug: m.slug, name: m.name, date });
    }
  }
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

export const birthdayMembers = members.filter((m) => m.birthday);
