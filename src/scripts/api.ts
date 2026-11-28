// Клієнтський API сайту поверх Supabase.
// Доступ контролюють політики RLS: див. supabase/migrations/20261126000000_init.sql.
import { createClient, type User } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY, MEDIA_BUCKET, FEEDBACK_BUCKET, mediaUrl } from '../lib/supabase-config';

export const sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export type Role = 'user' | 'member' | 'editor' | 'admin';
export type Status = 'pending' | 'approved' | 'hidden' | 'private';
export type Profile = { id: string; email: string | null; full_name: string; role: Role; club_position: string | null; profession: string | null; bio: string | null; quote: string | null; is_public: boolean; created_at?: string;
  member_slug?: string | null; phone?: string | null; contact_email?: string | null; telegram?: string | null; linkedin?: string | null; show_contacts?: boolean };
export type MemberContacts = { full_name: string; phone: string | null; contact_email: string | null; telegram: string | null; linkedin: string | null };
export type DbPost = { id: string; slug: string; title_en: string; title_uk: string; excerpt_en: string | null; excerpt_uk: string | null; body_en: string | null; body_uk: string | null; cover_url: string | null; status: 'draft' | 'published'; published_at: string | null; updated_at?: string };
export type DbEvent = { id: string; slug: string; title_en: string; title_uk: string; description_en: string | null; description_uk: string | null; starts_at: string; time_unknown: boolean; location_en: string | null; location_uk: string | null; visibility: 'public' | 'members'; status: 'draft' | 'published' };
export type DbComment = { id: string; target: string; author_id: string; author_name: string; body: string; status: Status; created_at: string };
export type DbReview = { id: string; author_name: string; author_kind: string; body: string; consent_publish: boolean; email: string | null; status: Status; created_at: string };
export type DbRequest = { id: string; kind: 'join' | 'contact'; name: string; email: string; message: string; created_at: string };
export type FeedbackKind = 'idea' | 'bug' | 'materials' | 'other';
export type FeedbackStatus = 'new' | 'in_progress' | 'done' | 'declined';
export type FeedbackFile = { path: string; name: string; size: number; type: string };
export type DbFeedback = { id: string; kind: FeedbackKind; page: string | null; message: string; name: string | null; email: string | null; files: FeedbackFile[]; consent_publish: boolean;
  author_id: string | null; status: FeedbackStatus; admin_note: string | null; handled_name: string | null; created_at: string; updated_at: string };
export type DbPhoto = { id: string; album_slug: string; storage_path: string; caption: string | null; status: Status; created_at: string; uploaded_by: string | null };

const rank: Record<Role, number> = { user: 0, member: 1, editor: 2, admin: 3 };
export const can = {
  memberArea: (p: Profile | null) => !!p && rank[p.role] >= 1,
  admin: (p: Profile | null) => !!p && rank[p.role] >= 2,
  manageRoles: (p: Profile | null) => !!p && p.role === 'admin',
};

const emit = () => window.dispatchEvent(new CustomEvent('llp:change'));
const CACHE = 'llp.profile';

// ---------- сесія і профіль ----------
let profilePromise: Promise<Profile | null> | null = null;
export function cachedProfile(): Profile | null {
  try { const v = localStorage.getItem(CACHE); return v ? (JSON.parse(v) as Profile) : null; } catch { return null; }
}
async function loadProfile(user: User | null): Promise<Profile | null> {
  if (!user) { try { localStorage.removeItem(CACHE); } catch { /* */ } return null; }
  const { data } = await sb.from('profiles').select('*').eq('id', user.id).maybeSingle();
  const p = (data as Profile | null) ?? { id: user.id, email: user.email ?? null, full_name: '', role: 'user', club_position: null, profession: null, bio: null, quote: null, is_public: false };
  try { localStorage.setItem(CACHE, JSON.stringify(p)); } catch { /* */ }
  return p;
}
export function getProfile(force = false): Promise<Profile | null> {
  if (!profilePromise || force) profilePromise = sb.auth.getSession().then(({ data }) => loadProfile(data.session?.user ?? null));
  return profilePromise;
}
sb.auth.onAuthStateChange((event) => {
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
    profilePromise = null;
    getProfile().then(emit);
  }
});
export const displayName = (p: Profile | null) => (p ? p.full_name || (p.email ?? '').split('@')[0] : '');

export async function signInWithEmail(email: string, redirectTo: string) {
  const { error } = await sb.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo, shouldCreateUser: true } });
  if (error) throw error;
}
// Вхід через Google (OAuth). Провайдер вмикається в Supabase: Authentication → Providers → Google.
export async function signInWithGoogle(redirectTo: string) {
  const { error } = await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
  if (error) throw error;
}
// Які способи входу ввімкнені в Supabase (публічні налаштування Auth), щоб не показувати кнопку, яка не працює
export async function enabledProviders(): Promise<Record<string, boolean>> {
  try {
    const r = await fetch(`${SUPABASE_URL}/auth/v1/settings`, { headers: { apikey: SUPABASE_KEY } });
    if (!r.ok) return {};
    return ((await r.json()).external ?? {}) as Record<string, boolean>;
  } catch { return {}; }
}
export async function signOut() { await sb.auth.signOut(); try { localStorage.removeItem(CACHE); } catch { /* */ } profilePromise = null; emit(); }
export async function updateProfile(patch: Partial<Profile>) {
  const p = await getProfile();
  if (!p) throw new Error('Not signed in');
  const { role: _r, id: _i, email: _e, member_slug: _m, ...safe } = patch;
  const { error } = await sb.from('profiles').update(safe).eq('id', p.id);
  if (error) throw error;
  await getProfile(true); emit();
}

// ---------- журнал ----------
export async function log(action: string) {
  const p = await getProfile();
  await sb.from('audit_log').insert({ action, actor_name: displayName(p) });
}
export async function audit(limit = 100) {
  const { data } = await sb.from('audit_log').select('*').order('at', { ascending: false }).limit(limit);
  return (data ?? []) as { id: number; actor_name: string | null; action: string; at: string }[];
}

// ---------- коментарі ----------
export async function comments(target: string) {
  const { data } = await sb.from('comments').select('*').eq('target', target).order('created_at');
  return (data ?? []) as DbComment[];
}
export async function addComment(target: string, body: string) {
  const p = await getProfile();
  if (!p) throw new Error('Not signed in');
  const status: Status = can.memberArea(p) ? 'approved' : 'pending';
  const { error } = await sb.from('comments').insert({ target, body: body.trim(), status, author_id: p.id, author_name: displayName(p) });
  if (error) throw error;
  return status;
}
export async function allComments() {
  const { data } = await sb.from('comments').select('*').order('created_at', { ascending: false }).limit(200);
  return (data ?? []) as DbComment[];
}
export async function setCommentStatus(id: string, status: Status) {
  const { error } = await sb.from('comments').update({ status }).eq('id', id);
  if (error) throw error;
  await log(`comment ${id.slice(0, 8)}: ${status}`);
}

// ---------- відгуки ----------
export async function publicReviews() {
  const { data } = await sb.from('reviews').select('id,author_name,author_kind,body,created_at').order('created_at', { ascending: false });
  return (data ?? []) as Pick<DbReview, 'id' | 'author_name' | 'author_kind' | 'body' | 'created_at'>[];
}
export async function addReview(r: { author_name: string; author_kind: string; body: string; email?: string; consent_publish: boolean }) {
  const { error } = await sb.from('reviews').insert({ ...r, status: 'pending' });
  if (error) throw error;
}
export async function allReviews() {
  const { data } = await sb.from('reviews').select('*').order('created_at', { ascending: false }).limit(200);
  return (data ?? []) as DbReview[];
}
export async function setReviewStatus(id: string, status: Status) {
  const { error } = await sb.from('reviews').update({ status }).eq('id', id);
  if (error) throw error;
  await log(`review ${id.slice(0, 8)}: ${status}`);
}

// ---------- заявки ----------
export async function addRequest(r: { kind: 'join' | 'contact'; name: string; email: string; message: string }) {
  const { error } = await sb.from('contact_requests').insert(r);
  if (error) throw error;
}
export async function requests() {
  const { data } = await sb.from('contact_requests').select('*').order('created_at', { ascending: false }).limit(200);
  return (data ?? []) as DbRequest[];
}
export async function deleteRequest(id: string) {
  const { error } = await sb.from('contact_requests').delete().eq('id', id);
  if (error) throw error;
}

// ---------- новини ----------
export async function publishedPosts() {
  const { data } = await sb.from('posts').select('*').eq('status', 'published').order('published_at', { ascending: false });
  return (data ?? []) as DbPost[];
}
export async function postBySlug(slug: string) {
  const { data } = await sb.from('posts').select('*').eq('slug', slug).maybeSingle();
  return data as DbPost | null;
}
export async function allPosts() {
  const { data } = await sb.from('posts').select('*').order('created_at', { ascending: false });
  return (data ?? []) as DbPost[];
}
export async function savePost(p: Partial<DbPost> & { slug: string }) {
  const row = { ...p, updated_at: new Date().toISOString(), published_at: p.status === 'published' ? p.published_at || new Date().toISOString() : p.published_at ?? null };
  const q = p.id ? sb.from('posts').update(row).eq('id', p.id) : sb.from('posts').insert(row);
  const { error } = await q;
  if (error) throw error;
  await log(`${p.id ? 'updated' : 'created'} post "${p.title_en || p.title_uk}"`);
}
export async function deletePost(id: string, title: string) {
  const { error } = await sb.from('posts').delete().eq('id', id);
  if (error) throw error;
  await log(`deleted post "${title}"`);
}

// ---------- події ----------
export async function upcomingEvents() {
  const { data } = await sb.from('events').select('*').eq('status', 'published').order('starts_at');
  return (data ?? []) as DbEvent[];
}
export async function allEvents() {
  const { data } = await sb.from('events').select('*').order('starts_at', { ascending: false });
  return (data ?? []) as DbEvent[];
}
export async function saveEvent(e: Partial<DbEvent> & { slug: string }) {
  const q = e.id ? sb.from('events').update(e).eq('id', e.id) : sb.from('events').insert(e);
  const { error } = await q;
  if (error) throw error;
  await log(`${e.id ? 'updated' : 'created'} event "${e.title_en || e.title_uk}"`);
}
export async function deleteEvent(id: string, title: string) {
  const { error } = await sb.from('events').delete().eq('id', id);
  if (error) throw error;
  await log(`deleted event "${title}"`);
}
export async function myRsvp(slug: string) {
  const p = await getProfile();
  if (!p) return null;
  const { data } = await sb.from('event_rsvps').select('going').eq('event_slug', slug).eq('user_id', p.id).maybeSingle();
  return data ? (data as { going: boolean }).going : null;
}
export async function setRsvp(slug: string, going: boolean) {
  const p = await getProfile();
  if (!p) throw new Error('Not signed in');
  const { error } = await sb.from('event_rsvps').upsert({ event_slug: slug, user_id: p.id, going });
  if (error) throw error;
}
// ---------- фото ----------
// Стискаємо в браузері до 1600 px: так прибираються й метадані (EXIF, геолокація).
async function shrink(file: File, max = 1600, quality = 0.84): Promise<Blob> {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas');
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('Image conversion failed'))), 'image/jpeg', quality));
}
export async function uploadImage(folder: string, file: File) {
  const blob = await shrink(file);
  const path = `${folder}/${crypto.randomUUID()}.jpg`;
  const { error } = await sb.storage.from(MEDIA_BUCKET).upload(path, blob, { contentType: 'image/jpeg', upsert: false });
  if (error) throw error;
  return path;
}
export async function uploadPhotos(albumSlug: string, files: File[]) {
  const p = await getProfile();
  if (!p) throw new Error('Not signed in');
  let n = 0;
  for (const f of files) {
    const path = await uploadImage(`albums/${albumSlug}`, f);
    const { error } = await sb.from('photos').insert({ album_slug: albumSlug, storage_path: path, uploaded_by: p.id, status: 'pending' });
    if (error) throw error;
    n++;
  }
  return n;
}
export async function allPhotos() {
  const { data } = await sb.from('photos').select('*').order('created_at', { ascending: false }).limit(300);
  return (data ?? []) as DbPhoto[];
}
export async function setPhotoStatus(id: string, status: Status) {
  const { error } = await sb.from('photos').update({ status }).eq('id', id);
  if (error) throw error;
  await log(`photo ${id.slice(0, 8)}: ${status}`);
}
export async function deletePhoto(ph: DbPhoto) {
  await sb.storage.from(MEDIA_BUCKET).remove([ph.storage_path]);
  const { error } = await sb.from('photos').delete().eq('id', ph.id);
  if (error) throw error;
  await log(`deleted photo ${ph.id.slice(0, 8)}`);
}
export { mediaUrl };

// ---------- побажання до сайту ----------
// Надіслати може будь-хто; файли лише після входу: вони лягають у приватний бакет у папку акаунта (<uid>/...).
// JPEG-фото зменшуємо до 2400 px (лишається якість для сайту, зникають EXIF і геолокація); решта файлів іде як є.
const FEEDBACK_MAX_MB = 20;
export const feedbackLimits = { files: 8, mb: FEEDBACK_MAX_MB };
async function uploadFeedbackFile(uid: string, f: File): Promise<FeedbackFile> {
  let body: Blob = f; let type = f.type || 'application/octet-stream'; let name = f.name;
  if (f.type === 'image/jpeg') { // PNG і WebP лишаємо як є: там може бути прозорість (логотипи)
    try { body = await shrink(f, 2400, 0.9); type = 'image/jpeg'; name = f.name.replace(/\.[^.]+$/, '') + '.jpg'; } catch { /* лишаємо оригінал */ }
  }
  if (body.size > FEEDBACK_MAX_MB * 1024 * 1024) throw new Error(`${f.name}: > ${FEEDBACK_MAX_MB} MB`);
  const ext = (name.match(/\.([a-z0-9]{1,5})$/i)?.[1] || 'bin').toLowerCase();
  const path = `${uid}/${crypto.randomUUID()}.${ext}`;
  const { error } = await sb.storage.from(FEEDBACK_BUCKET).upload(path, body, { contentType: type, upsert: false });
  if (error) throw error;
  return { path, name: name.slice(0, 160), size: body.size, type };
}
export async function sendFeedback(r: { kind: FeedbackKind; page?: string; message: string; name?: string; email?: string; consent_publish: boolean }, files: File[] = []) {
  const p = files.length ? await getProfile() : null;
  if (files.length && !p) throw new Error('Sign in to attach files');
  const uploaded: FeedbackFile[] = [];
  try {
    for (const f of files.slice(0, feedbackLimits.files)) uploaded.push(await uploadFeedbackFile(p!.id, f));
    const { error } = await sb.from('site_feedback').insert({ ...r, files: uploaded });
    if (error) throw error;
  } catch (err) {
    if (uploaded.length) await sb.storage.from(FEEDBACK_BUCKET).remove(uploaded.map((u) => u.path));
    throw err;
  }
}
// Кидає помилку, якщо таблиці ще немає (міграція не застосована): адмінка показує підказку.
export async function allFeedback() {
  const { data, error } = await sb.from('site_feedback').select('*').order('created_at', { ascending: false }).limit(300);
  if (error) throw error;
  return (data ?? []) as DbFeedback[];
}
export async function updateFeedback(id: string, patch: { status?: FeedbackStatus; admin_note?: string | null }) {
  const { error } = await sb.from('site_feedback').update(patch).eq('id', id);
  if (error) throw error;
  if (patch.status) await log(`site feedback ${id.slice(0, 8)}: ${patch.status}`);
}
export async function deleteFeedback(fb: DbFeedback) {
  if (fb.files?.length) await sb.storage.from(FEEDBACK_BUCKET).remove(fb.files.map((f) => f.path));
  const { error } = await sb.from('site_feedback').delete().eq('id', fb.id);
  if (error) throw error;
  await log(`deleted site feedback ${fb.id.slice(0, 8)}`);
}
// Тимчасові посилання на приватні файли (бачать лише редактори): за замовчуванням на годину.
export async function feedbackFileUrls(paths: string[], seconds = 3600): Promise<Record<string, string>> {
  if (!paths.length) return {};
  const { data } = await sb.storage.from(FEEDBACK_BUCKET).createSignedUrls(paths, seconds);
  return Object.fromEntries((data ?? []).filter((d) => d.signedUrl && d.path).map((d) => [d.path!, d.signedUrl as string]));
}

// ---------- учасники і ролі (адмін) ----------
export async function profiles() {
  const { data } = await sb.from('profiles').select('*').order('created_at');
  return (data ?? []) as Profile[];
}
export async function setRole(id: string, role: Role, who: string) {
  const { error } = await sb.from('profiles').update({ role }).eq('id', id);
  if (error) throw error;
  await log(`role of ${who}: ${role}`);
}
// Прив’язка акаунта до профілю на сайті (тільки редактори, через функцію в базі)
export async function setMemberSlug(id: string, slug: string, who: string) {
  const { error } = await sb.rpc('set_member_slug', { p_profile: id, p_slug: slug });
  if (error) throw error;
  await log(`profile link of ${who}: ${slug || '-'}`);
}
// Контакти члена клубу для сторінки профілю: база віддає їх лише членам клубу
// і лише якщо власник увімкнув показ. null = немає доступу або функції ще немає.
export async function memberContacts(slug: string): Promise<MemberContacts | null> {
  const { data, error } = await sb.rpc('member_contacts', { p_slug: slug });
  if (error || !Array.isArray(data) || !data.length) return null;
  return data[0] as MemberContacts;
}

export async function invites() {
  const { data } = await sb.from('role_invites').select('*').order('created_at', { ascending: false });
  return (data ?? []) as { email: string; role: Role; created_at: string }[];
}
export async function addInvite(email: string, role: Role) {
  const { error } = await sb.from('role_invites').upsert({ email: email.trim().toLowerCase(), role });
  if (error) throw error;
  await log(`invited ${email} as ${role}`);
}
export async function deleteInvite(email: string) {
  const { error } = await sb.from('role_invites').delete().eq('email', email);
  if (error) throw error;
}

// ---------- утиліти ----------
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
    .replace(/[а-яіїєґ]/g, (c) => ({ а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'iu', я: 'ia' } as Record<string, string>)[c] ?? '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 70) || `item-${Date.now()}`;
export const paragraphs = (t: string | null) => (t ?? '').split(/\n{2,}/).map((b) => b.trim()).filter(Boolean)
  .map((b) => (b.startsWith('## ') ? `<h2>${esc(b.slice(3))}</h2>` : b.startsWith('> ') ? `<blockquote>${esc(b.slice(2))}</blockquote>` : `<p>${esc(b).replace(/\n/g, '<br>')}</p>`)).join('');
