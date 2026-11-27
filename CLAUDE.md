# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Сайт Lviv International Lions Club (робоча назва для демонстрації, може змінитися; запис LCI погоджується з Lions International; District 134 розформовано в березні 2026). Другий Lions club у Львові: ніколи не позиціонуй його як єдиний чи головний.
Повне ТЗ: документ «ТЗ: сайт Lviv International Lions Club» (розділ 0: стан реалізації і план). Документація: `docs/site.md` (технічна), `docs/editor-guide.md` (для редакторів). Оновлюй їх разом зі змінами функціоналу.

## Стан
- Astro 7 + Tailwind 4, статична збірка, GitHub Pages (https://lionslviv.github.io/).
- Бекенд: Supabase (проєкт lyoicjdpqzvsfluromvo, організація lionslviv Org). Публічні параметри в `src/lib/supabase-config.ts`, схема і RLS у `supabase/migrations`.
- Клієнтський API: `src/scripts/api.ts` (вхід за посиланням на email, профілі й ролі, новини, події, коментарі, відгуки, заявки, фото, журнал).
- Збірка бере новини, події і схвалені фото з бази (`src/data/live.ts`), статичні дані в `src/data/content.ts` лише запасний варіант. GitHub Actions перезбирає сайт кожні 30 хвилин.
- Резервна копія: щомісяця `.github/workflows/backup.yml` + `scripts/backup.sh`, зашифрований артефакт 90 днів (docs/backup.md).
- Контакти членів: поля в `profiles`, показ через функцію `member_contacts(slug)` лише членам; привʼязка акаунта до профілю (`member_slug`) лише редакторами через `set_member_slug`.
- Ролі видаються через `role_invites` (адмінка → Учасники). Секретні ключі Supabase в репозиторій не додавати.

## Команди
- `npm run dev` (localhost:4321), `npm run build` (у `dist/`), `npm run preview`.
- `npm run check`: astro check (типи). CI (`ci.yml`) запускає check + build + `npm test`.
- `npm test`: `tests/rls-anon.test.mjs`, RLS для аноніма через живий REST Supabase (потрібен інтернет, у базі нічого не створює). Один тест: `node --test --test-name-pattern "<назва>" tests/rls-anon.test.mjs`.
- `npm run test:ui`: `tests/smoke.py` (Python + Playwright) по зібраному `dist/`, тож спершу `npm run build`. Шлях до Chrome за замовчуванням `/usr/bin/google-chrome`; на Windows задати `PLAYWRIGHT_CHROME`. Перевіряє обидві мови, desktop/mobile, внутрішні посилання, відсутність довгих тире.
- `tests/rls_roles.sql`: RLS для всіх ролей, запускається вручну в Supabase SQL Editor (весь файл, очікується `passed = total`).
- Міграції з `supabase/migrations/` застосовуються вручну в SQL Editor за датою в назві; CLI/автодеплою бази немає. Змінюючи RLS, додавай перевірки в `tests/rls_roles.sql` (і в `rls-anon.test.mjs`, якщо стосується аноніма).

## Архітектура (що не видно з одного файлу)
- Два шари даних: збірка рендерить статичний HTML з `src/data/live.ts` (top-level await до REST Supabase, злиття зі статичними даними за slug, база має пріоритет), а в браузері `src/scripts/api.ts` підтягує свіже і все, що потребує входу (коментарі, кабінет, адмінка, RSVP). Новина, створена після останньої збірки, відкривається через `/news/post/?slug=...` (`src/pages/[...lang]/news/post.astro`), а не через `[slug].astro`.
- Ролі `user < member < editor < admin`; у клієнті перевірки через `can.*` в `api.ts`, але справжній захист лише RLS, тригери (`protect_role`, `set_comment_author`, `set_audit_actor`) і `security definer` функції в міграціях. Клієнтські перевірки не замінюють правил у базі.
- Учасники (`members` у `src/data/content.ts`) поки редагуються в коді, а не в адмінці; дні народження (`MM-DD`) з них ідуть у календар і `/events.ics` (`src/lib/birthdays.ts`, `src/lib/ics.ts`).
- `/admin`, `/account`, `/login` статичні оболонки, весь вміст рендерить клієнтський скрипт.
- `BASE_PATH` і `SITE_URL` задаються змінними середовища в `astro.config.mjs` (workflow деплою їх виставляє).

## Типові зміни, що зачіпають кілька файлів
- Нова сторінка: файл у `src/pages/[...lang]/`, ключ у `nav` (`src/data/site.ts`) і словнику `src/i18n/index.ts`, адреса в `src/pages/sitemap.xml.ts` і в `PAGES` у `tests/smoke.py`.
- Перейменування клубу: `name`, `shortName`, `heroWord` у `src/data/site.ts`.
- Зміна бази: новий файл міграції з датою в назві + тести в `tests/rls_roles.sql` + за потреби функції в `api.ts`.
- Більше типових змін і обмежень: `docs/site.md` розділи 11-12.

## Жорсткі правила
- Емблему Lions не малювати і не генерувати. Лише офіційні файли в `public/brand/` (маніфест `src/data/brand-assets.ts`, вивід через `BrandAsset.astro`).
- Жодних довгих тире в текстах UI і контенті: тільки дефіс (-) або двокрапка.
- Граматична коректність обома мовами. Кожен новий чи змінений текст перевіряй на граматику, пунктуацію, узгодження і стиль:
  - EN: британський правопис (organisation, colour, programme), «Lions club» з малою c у загальному значенні, артиклі, однаковий час у переліках (історія в минулому часі), однина/множина (`photoCount`).
  - UA: звертання на «ви» в інтерфейсі, узгодження числівників (`ukPlural`: 1 член, 2-4 члени, 5+ членів), апостроф ’, лапки «», без русизмів і активних дієприкметників на -уч/-юч, без конструкції «X це Y» (замість тире пиши «X є Y» або перебудуй речення).
  - Без подвійних крапок після «р.», пробілів перед розділовими знаками і повторів на кшталт «з Lions International ... Lions International».
  - `npm run test:ui` перевіряє типові огріхи автоматично (тест «без типових граматичних огріхів»).
- Не вигадувати факти, імена, цифри, партнерів. Демо-контент позначати.
- Усі внутрішні посилання через `u()` з `src/lib/url.ts` (підтримка BASE_PATH для GitHub Pages).
- Скрипти сторінок ініціалізувати в `astro:page-load` (ClientRouter).
- Жовтий (#EBB700) не використовувати як колір тексту на білому.
- Без cookies-аналітики, без секретів у репо (репо публічне).

## Дизайн
- Бренд: Lions International Brand Guidelines V4.0 (05/23), конспект у `docs/brand/README.md`, дані в `src/data/brand.ts`. Лише кольори палітри бренду.
- Roboto Flex, широкі заголовки (font-stretch 110-128%), токени в `src/styles/global.css`.
- Один «гучний» момент: слово club.heroWord у hero між шарами силуету Львова (scroll-driven).
- Без великих літер у мітках, без стрілок у кнопках, без однакових карток-шаблонів.

## Двомовність
- EN основна на `/`, UK на `/uk/`. Нова сторінка створюється в `src/pages/[...lang]/` з `export const getStaticPaths = langPaths` (для `[slug]` комбінуємо `[undefined, 'uk']` з переліком slug).
- Внутрішні посилання: `lp(lang, '/path')` (додає `/uk` і BASE_PATH). Мова в компоненті: `langFromUrl(Astro.url)`.
- Тексти даних: тип `L = { en, uk }`, виводимо через `tr(lang, value)`. Рядки інтерфейсу: `t(lang)` або локальна `s(en, uk)` на сторінці; у клієнтських скриптах `ct()` з `src/scripts/i18n.ts`.
- Будь-який новий текст додаємо обома мовами. Без довгих тире.
