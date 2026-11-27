# Вхід через Google: налаштування

Код уже готовий: кнопка «Увійти через Google» на `/login` з’являється сама, щойно провайдер Google увімкнено в Supabase. Ролі працюють як і раніше: їх видають за email, тож запрошення в адмінці діють і для входу через Google.

## 1. Google Cloud (на клубний акаунт lions.lviv.admin@gmail.com)

1. Відкрити https://console.cloud.google.com/ і створити проєкт, наприклад `lviv-lions-site`.
2. **APIs & Services → OAuth consent screen** (Google Auth Platform → Branding):
   - App name: Lviv International Lions Club
   - User support email і Developer contact: lions.lviv.admin@gmail.com
   - Audience: **External**
   - App domain / Authorized domains: `lionslviv.github.io` і `supabase.co`
   - Privacy policy: `https://lionslviv.github.io/privacy/`
   - Доступи (scopes): лише стандартні `email`, `profile`, `openid`
   - Після перевірки натиснути **Publish app** (статус In production), інакше входити зможуть лише тестові користувачі.
3. **Credentials → Create credentials → OAuth client ID → Web application**:
   - Authorized JavaScript origins: `https://lionslviv.github.io`
   - Authorized redirect URIs: `https://lyoicjdpqzvsfluromvo.supabase.co/auth/v1/callback`
   - Зберегти **Client ID** і **Client Secret**.

## 2. Supabase

1. **Authentication → Sign In / Providers → Google**: увімкнути, вставити Client ID і Client Secret, зберегти.
2. **Authentication → URL Configuration**: має бути Site URL `https://lionslviv.github.io` і Redirect URL `https://lionslviv.github.io/**` (уже налаштовано).

## 3. Перевірка

Відкрити https://lionslviv.github.io/login/: з’явиться кнопка «Увійти через Google». Після входу відкриється кабінет; ім’я підтягнеться з Google.

## Після переїзду на власний домен

Додати новий домен у Authorized JavaScript origins і Authorized domains у Google та в URL Configuration у Supabase.
