// Публічні параметри Supabase. Publishable key безпечний для браузера:
// доступ обмежують політики RLS у supabase/migrations. Секретні ключі сюди не додаємо.
export const SUPABASE_URL = 'https://lyoicjdpqzvsfluromvo.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_jB7J-kFxGWpZmkBMGZO5Bw_gDjbGjNT';
export const MEDIA_BUCKET = 'public-media';
export const mediaUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`;
