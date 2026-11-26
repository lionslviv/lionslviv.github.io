# Контекст для Claude Code

Сайт Lviv International Lions Club (робоча назва для демонстрації, може змінитися; запис LCI погоджується з District 134). Другий Lions club у Львові: ніколи не позиціонуй його як єдиний чи головний.
Повне ТЗ: документ «ТЗ: сайт Lviv International Lions Club» (розділ 9 містить промпт).

## Стан
- Етап 1 (MVP) зроблено в демо-режимі: Astro 7 + Tailwind 4, статична збірка, GitHub Pages.
- `src/scripts/store.ts` імітує бекенд у localStorage. Етап 2: замінити на Supabase-клієнт з тим самим API, схема в `supabase/migrations`.

## Жорсткі правила
- Емблему Lions не малювати і не генерувати. Лише офіційні файли в `public/brand/` (маніфест `src/data/brand-assets.ts`, вивід через `BrandAsset.astro`).
- Жодних довгих тире в текстах UI і контенті: тільки дефіс (-) або двокрапка.
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
