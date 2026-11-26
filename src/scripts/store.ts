// ДЕМО-СХОВИЩЕ. Імітує Supabase у браузері через localStorage,
// щоб показати потоки (вхід, публікація, модерація) без бекенду.
// У продакшні цей модуль замінюється на src/lib/supabase.ts з тими самими функціями.

export type Role = 'user' | 'member' | 'editor' | 'admin';
export type DemoUser = { name: string; email: string; role: Role; bio?: string; field?: string; quote?: string; isPublic?: boolean };
export type Status = 'pending' | 'approved' | 'hidden' | 'private';
export type DemoComment = { id: string; target: string; author: string; body: string; status: Status; at: string };
export type DemoReview = { id: string; author: string; kind: string; text: string; consent: boolean; email?: string; status: Status; at: string };
export type DemoPost = { id: string; type: 'news' | 'project'; title: string; excerpt: string; body: string; status: 'draft' | 'published'; at: string; author: string };
export type DemoEvent = { id: string; title: string; start: string; location: string; visibility: 'public' | 'members'; at: string };
export type DemoRequest = { id: string; kind: 'join' | 'contact'; name: string; email: string; message: string; at: string };
export type Audit = { at: string; who: string; what: string };

const K = {
  user: 'llp.user',
  comments: 'llp.comments',
  reviews: 'llp.reviews',
  posts: 'llp.posts',
  events: 'llp.events',
  requests: 'llp.requests',
  audit: 'llp.audit',
  seeded: 'llp.seeded.v1',
};

function read<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* приватний режим або переповнення */ }
  window.dispatchEvent(new CustomEvent('llp:change', { detail: key }));
}
export const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();

export const roleLabel: Record<Role, string> = { user: 'Користувач', member: 'Член клубу', editor: 'Редактор', admin: 'Адмін' };
export const can = {
  comment: (u: DemoUser | null) => !!u,
  memberArea: (u: DemoUser | null) => !!u && u.role !== 'user',
  admin: (u: DemoUser | null) => !!u && (u.role === 'editor' || u.role === 'admin'),
  manageRoles: (u: DemoUser | null) => !!u && u.role === 'admin',
};

export function seed() {
  if (read(K.seeded, false)) return;
  write(K.comments, [
    { id: uid(), target: 'perevirka-zoru-shkola', author: 'Гість сайту (демо)', body: 'Чи можна подати заявку від нашої школи?', status: 'approved', at: '2026-11-08T10:12:00Z' },
    { id: uid(), target: 'perevirka-zoru-shkola', author: 'Новий користувач (демо)', body: 'Перший коментар нового користувача чекає модерації.', status: 'pending', at: '2026-11-09T18:40:00Z' },
  ]);
  write(K.reviews, [
    { id: uid(), author: 'Відгук на модерації (демо)', kind: 'guest', text: 'Так виглядає відгук, що чекає схвалення редактора.', consent: true, status: 'pending', at: '2026-11-20T09:00:00Z' },
  ]);
  write(K.seeded, true);
}

// ---- користувач ----
export const getUser = () => read<DemoUser | null>(K.user, null);
export function signIn(role: Role, name?: string) {
  const u: DemoUser = { name: name || `${roleLabel[role]} (демо)`, email: `${role}@demo.local`, role, isPublic: true };
  write(K.user, u); log(u.name, 'увійшов у демо-режимі');
  return u;
}
export function updateUser(patch: Partial<DemoUser>) { const u = getUser(); if (u) write(K.user, { ...u, ...patch }); }
export function signOut() { localStorage.removeItem(K.user); window.dispatchEvent(new CustomEvent('llp:change', { detail: K.user })); }

// ---- коментарі ----
export const comments = () => read<DemoComment[]>(K.comments, []);
export function addComment(target: string, body: string) {
  const u = getUser(); if (!u) throw new Error('Увійдіть, щоб коментувати');
  const trusted = u.role !== 'user';
  const c: DemoComment = { id: uid(), target, author: u.name, body: body.trim(), status: trusted ? 'approved' : 'pending', at: now() };
  write(K.comments, [...comments(), c]);
  return c;
}
export function setCommentStatus(id: string, status: Status) {
  write(K.comments, comments().map((c) => (c.id === id ? { ...c, status } : c)));
  log(getUser()?.name ?? '?', `коментар ${id}: ${status}`);
}

// ---- відгуки ----
export const reviews = () => read<DemoReview[]>(K.reviews, []);
export function addReview(r: Omit<DemoReview, 'id' | 'status' | 'at'>) {
  write(K.reviews, [...reviews(), { ...r, id: uid(), status: 'pending', at: now() }]);
}
export function setReviewStatus(id: string, status: Status) {
  write(K.reviews, reviews().map((r) => (r.id === id ? { ...r, status } : r)));
  log(getUser()?.name ?? '?', `відгук ${id}: ${status}`);
}

// ---- пости ----
export const posts = () => read<DemoPost[]>(K.posts, []);
export function savePost(p: Partial<DemoPost> & { title: string }) {
  const list = posts();
  const u = getUser();
  if (p.id) {
    write(K.posts, list.map((x) => (x.id === p.id ? { ...x, ...p } as DemoPost : x)));
    log(u?.name ?? '?', `оновив пост "${p.title}"`);
    return p.id;
  }
  const id = uid();
  write(K.posts, [{ id, type: 'news', excerpt: '', body: '', status: 'draft', at: now(), author: u?.name ?? '', ...p } as DemoPost, ...list]);
  log(u?.name ?? '?', `створив пост "${p.title}"`);
  return id;
}
export function deletePost(id: string) { write(K.posts, posts().filter((p) => p.id !== id)); log(getUser()?.name ?? '?', `видалив пост ${id}`); }

// ---- події ----
export const demoEvents = () => read<DemoEvent[]>(K.events, []);
export function addEvent(e: Omit<DemoEvent, 'id' | 'at'>) { write(K.events, [...demoEvents(), { ...e, id: uid(), at: now() }]); log(getUser()?.name ?? '?', `додав подію "${e.title}"`); }
export function deleteEvent(id: string) { write(K.events, demoEvents().filter((e) => e.id !== id)); }

// ---- заявки ----
export const requests = () => read<DemoRequest[]>(K.requests, []);
export function addRequest(r: Omit<DemoRequest, 'id' | 'at'>) { write(K.requests, [{ ...r, id: uid(), at: now() }, ...requests()]); }

// ---- журнал ----
export const audit = () => read<Audit[]>(K.audit, []);
function log(who: string, what: string) { const a = audit(); a.unshift({ at: now(), who, what }); write(K.audit, a.slice(0, 200)); }

export function resetDemo() { Object.values(K).forEach((k) => localStorage.removeItem(k)); seed(); }

export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export const fmtDate = (iso: string) => new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
