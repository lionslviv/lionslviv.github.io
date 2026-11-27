# Lviv International Lions Club: сайт клубу

Сайт другого клубу Lions International у Львові, англомовної спільноти. Робоча назва **Lviv International Lions Club** (змінюється в `src/data/site.ts`: `name`, `shortName`, `heroWord`). Офіційна назва і домен ще погоджуються з Lions International: District 134 розформовано в березні 2026, а назва Lviv Leopolis уже зайнята в реєстрі LCI.

- Сайт: **https://lionslviv.github.io/** (EN основна), українська версія **https://lionslviv.github.io/uk/**
- Публікація: автоматично з гілки `main` через GitHub Actions, плюс перезбірка кожні 30 хвилин
- Бекенд: Supabase (вхід за посиланням на email, ролі, новини, події, коментарі, відгуки, заявки, фото, контакти членів)

## Документація

| Документ | Для кого |
| --- | --- |
| [docs/site.md](docs/site.md) | Опис сайту і технічна документація: архітектура, дані, ролі, безпека, деплой, тести |
| [docs/editor-guide.md](docs/editor-guide.md) | Інструкція для адмінів і редакторів (EN і UA): як публікувати, модерувати, видавати ролі |
| [docs/backup.md](docs/backup.md) | Резервна копія бази: налаштування і відновлення |
| [docs/brand/README.md](docs/brand/README.md) | Конспект брендбуку Lions International і офіційні файли |
| [CLAUDE.md](CLAUDE.md) | Правила для Claude Code при зміні коду |

Технічне завдання зі станом реалізації, планом і відкладеними ідеями: документ «ТЗ: сайт Lviv International Lions Club» (Claude Docs).

## Запуск локально

Потрібен Node.js 22+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # статична збірка в dist/
npm run preview    # перегляд збірки
npm run check      # перевірка типів (astro check)
npm test           # правила доступу Supabase для аноніма (потрібен інтернет)
npm run test:ui    # 103 перевірки інтерфейсу (Python + Playwright, після build)
```

## Що налаштувати після клонування або переїзду

1. Supabase: застосувати файли з `supabase/migrations/` по черзі в SQL Editor, у Authentication → URL Configuration вказати адресу сайту.
2. GitHub: Settings → Pages → Source: GitHub Actions. Для резервної копії секрети `SUPABASE_DB_URL` і `BACKUP_PASSPHRASE` (див. docs/backup.md).
3. Власний домен: файл `public/CNAME`, змінні `BASE_PATH=/` і `SITE_URL=https://домен` у Settings → Secrets and variables → Actions → Variables.
4. Аналітика: акаунт GoatCounter з кодом із `analytics.goatcounter` у `src/data/site.ts`.
