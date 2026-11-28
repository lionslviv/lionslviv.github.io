// Публічні параметри Supabase. Publishable key безпечний для браузера:
// доступ обмежують політики RLS у supabase/migrations. Секретні ключі сюди не додаємо.
export const SUPABASE_URL = 'https://lyoicjdpqzvsfluromvo.supabase.co';
export const SUPABASE_KEY = 'sb_publishable_jB7J-kFxGWpZmkBMGZO5Bw_gDjbGjNT';
export const MEDIA_BUCKET = 'public-media';
// Приватний бакет для файлів до побажань щодо сайту (читають лише редактори через тимчасові посилання)
export const FEEDBACK_BUCKET = 'feedback-files';
export const mediaUrl = (path: string) => `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/${path.split('/').map(encodeURIComponent).join('/')}`;
