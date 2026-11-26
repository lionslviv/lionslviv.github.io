# Lions Club Lviv Leopolis: сайт клубу

Сайт другого клубу Lions International у Львові. Офіційний запис у реєстрі LCI: **Lviv (Leopolis)**.
Цільовий домен: `leopolislions.org.ua` (редирект з `lionsleopolis.org.ua`).

Стан: **етап 1 (MVP) у демо-режимі.** Усі сторінки, дизайн-система і потоки адмінки працюють без бекенду: дані адмінки, коментарі й відгуки зберігаються в браузері (localStorage). Контент умовний і позначений як демо.

## Запуск локально

Потрібен Node.js 22+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # статична збірка в dist/
npm run preview    # перегляд збірки
```

## Що спробувати в демо

1. Відкрийте `/login` і увійдіть як **редактор**. Відкриється адмінка.
2. У вкладці «Новини» опублікуйте новину. Вона з’явиться на `/news`.
3. Вийдіть і увійдіть як **користувач**. Залиште коментар під новиною: він піде на модерацію.
4. Знову увійдіть як редактор: вкладка «Модерація» покаже коментар і відгуки з `/reviews`.
5. Увійдіть як **член клубу**: на `/events` з’являться закриті збори і кнопка RSVP.
6. Кнопка «Скинути демо» в адмінці повертає все до початкового стану.

## Публікація на GitHub Pages

1. Створіть репозиторій у GitHub-організації клубу (не на особистому акаунті), наприклад `lions-lviv-leopolis`.
2. Залийте код:
   ```bash
   git remote add origin git@github.com:<org>/lions-lviv-leopolis.git
   git push -u origin main
   ```
3. У репозиторії: **Settings → Pages → Source: GitHub Actions**.
4. Workflow `.github/workflows/deploy-pages.yml` збере сайт на кожен push у `main`.
   Адреса: `https://<org>.github.io/lions-lviv-leopolis/`.

### Власний домен

1. Додайте файл `public/CNAME` з рядком `leopolislions.org.ua`.
2. У **Settings → Secrets and variables → Actions → Variables** задайте `BASE_PATH=/` і `SITE_URL=https://leopolislions.org.ua`.
3. У DNS домену (рекомендовано Cloudflare) додайте записи для GitHub Pages і увімкніть HTTPS у налаштуваннях Pages.

> GitHub Pages віддає лише статику. Для етапу 2 (справжній вхід, коментарі, завантаження фото) потрібен Supabase,
> а хостинг краще перенести на Cloudflare (див. ТЗ, розділ 7). Код уже розділено так, щоб перехід був локальним.

## Структура

```
src/
  data/site.ts        налаштування клубу, навігація, цифри впливу, DEMO-прапорець
  data/content.ts     демо-контент: новини, проєкти, події, альбоми, учасники, відгуки
  scripts/store.ts    демо-сховище (localStorage). Замінюється на Supabase-клієнт з тим самим API
  components/         Header, Footer, Skyline (силует Львова), Photo (плейсхолдери), Comments, ...
  layouts/Base.astro  мета-теги, schema.org, View Transitions
  pages/              усі сторінки, /admin, /login, /account, events.ics, news.xml, sitemap.xml
  styles/global.css   дизайн-токени і компоненти
supabase/migrations/  схема БД з RLS для етапу 2
```

## Бренд

- Дизайн-система за Lions International Brand Guidelines V4.0 (05/23): Blue `#00338D`, Yellow `#EBB700`, Purple `#7A2582`, Navy `#0D2240`, Cool Gray 11 `#55565A`, цифровий шрифт Roboto (на сайті Roboto Flex). Конспект: `docs/brand/README.md`.
- Офіційні PDF брендбуків: `bash scripts/fetch-brand-assets.sh` (кладе їх у `public/brand/` і `docs/brand/`). Сторінка сайту `/brand` покаже кнопки завантаження.
- **Емблему Lions не малюємо.** Офіційні емблема і підписи Lions International уже в проєкті: оригінали в `docs/brand/logos/` (PNG, JPG CMYK, EPS для друку), веб-копії в `public/brand/`. Іконки напрямів служіння ще треба завантажити з lionsclubs.org/en/logos і виконати `npm run brand:import -- <папка>`. Таблиця: `docs/brand/README.md`.
- Перевірка дизайну: сторінка `/styleguide`.

## Перед релізом

- [ ] Погодити назву з District 134 і клубом-спонсором, зареєструвати домени
- [ ] Замінити демо-контент, вимкнути `DEMO` у `src/data/site.ts`
- [ ] Реальні реквізити ГО на `/support`
- [x] Офіційні емблема і підписи Lions International
- [ ] Іконки напрямів служіння (`npm run brand:import`)
- [ ] Етап 2: Supabase, Auth, Turnstile, Resend
