// Дані для статичних сторінок: під час збірки беремо новини, події і схвалені фото з Supabase
// і зливаємо зі статичними (база має пріоритет за slug). Якщо база недоступна, лишаються статичні.
// Сайт перезбирається автоматично (GitHub Actions за розкладом), тож зміни з адмінки потрапляють сюди.
import { SUPABASE_URL, SUPABASE_KEY, mediaUrl } from '../lib/supabase-config';
import { news as staticNews, events as staticEvents, albums as staticAlbums, type Post, type Event, type Album, type Art } from './content';

async function get<T>(path: string): Promise<T[] | null> {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: { apikey: SUPABASE_KEY }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error(`${r.status}`);
    return (await r.json()) as T[];
  } catch (e) {
    console.warn(`[live] Supabase недоступний для ${path.split('?')[0]}: ${(e as Error).message}. Беремо статичні дані.`);
    return null;
  }
}

type DbPost = { slug: string; title_en: string; title_uk: string; excerpt_en: string | null; excerpt_uk: string | null; body_en: string | null; body_uk: string | null; cover_url: string | null; published_at: string };
type DbEvent = { slug: string; title_en: string; title_uk: string; description_en: string | null; description_uk: string | null; starts_at: string; time_unknown: boolean; location_en: string | null; location_uk: string | null; visibility: 'public' | 'members' };
type DbPhoto = { album_slug: string; storage_path: string; created_at: string };

const both = (en: string | null, uk: string | null) => ({ en: en || uk || '', uk: uk || en || '' });
const paras = (t: string | null) => (t ?? '').split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
const coverSrc = (u: string | null) => (!u ? undefined : /^https?:/.test(u) ? u : u.startsWith('/') ? u : mediaUrl(u));

const [dbPosts, dbEvents, dbPhotos] = await Promise.all([
  get<DbPost>('posts?select=*&status=eq.published&order=published_at.desc'),
  get<DbEvent>('events?select=*&status=eq.published&visibility=eq.public&order=starts_at'),
  get<DbPhoto>('photos?select=album_slug,storage_path,created_at&status=eq.approved&order=created_at'),
]);

// ---------- новини ----------
function mapPost(p: DbPost): Post {
  const st = staticNews.find((s) => s.slug === p.slug);
  const src = coverSrc(p.cover_url);
  return {
    slug: p.slug,
    type: 'news',
    title: both(p.title_en, p.title_uk),
    excerpt: both(p.excerpt_en, p.excerpt_uk),
    date: p.published_at.slice(0, 10),
    cover: st && st.cover.src === src ? st.cover : { seed: p.slug, motif: 'event', src },
    tags: st?.tags ?? ['club'],
    body: { en: paras(p.body_en || p.body_uk), uk: paras(p.body_uk || p.body_en) },
    source: st?.source,
  };
}
export const news: Post[] = (dbPosts ? dbPosts.map(mapPost) : staticNews).sort((a, b) => b.date.localeCompare(a.date));

// ---------- події ----------
function mapEvent(e: DbEvent): Event {
  const st = staticEvents.find((s) => s.slug === e.slug);
  const end = new Date(new Date(e.starts_at).getTime() + 3 * 3600_000).toISOString();
  return {
    slug: e.slug,
    title: both(e.title_en, e.title_uk),
    start: e.starts_at,
    end,
    location: both(e.location_en, e.location_uk),
    visibility: e.visibility,
    regular: st?.regular,
    kind: st?.kind ?? (/new year|новоріч/i.test(e.title_en + e.title_uk) ? 'gala' : 'meeting'),
    description: both(e.description_en, e.description_uk),
    timeUnknown: e.time_unknown,
  };
}
// Події з бази замінюють статичні. Регулярні зустрічі з коду (regular) додаємо завжди;
// подія з бази з тим самим slug має пріоритет, тож редактор може уточнити окрему зустріч в адмінці.
const fromDb = dbEvents?.map(mapEvent);
export const events: Event[] = (fromDb ? [...fromDb, ...staticEvents.filter((s) => s.regular && !fromDb.some((e) => e.slug === s.slug))] : staticEvents).sort((a, b) =>
  a.start.localeCompare(b.start),
);

// ---------- альбоми: статичні + схвалені фото з бази ----------
const extra = (slug: string): Art[] => (dbPhotos ?? []).filter((p) => p.album_slug === slug).map((p) => ({ seed: p.storage_path, motif: 'event', src: mediaUrl(p.storage_path) }));
const albumList: Album[] = staticAlbums.map((a) => ({ ...a, photos: [...a.photos, ...extra(a.slug)] }));
// Фото до події без статичного альбому створюють новий альбом
for (const slug of new Set((dbPhotos ?? []).map((p) => p.album_slug))) {
  if (albumList.some((a) => a.slug === slug)) continue;
  const ev = events.find((e) => e.slug === slug);
  if (!ev) continue;
  albumList.push({ slug, title: ev.title, date: ev.start.slice(0, 10), eventSlug: slug, photos: extra(slug) });
}
export const albums: Album[] = albumList.sort((a, b) => b.date.localeCompare(a.date));
