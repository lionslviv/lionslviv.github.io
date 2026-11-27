# Резервна копія бази

Безкоштовний тариф Supabase не дає копій, які можна завантажити. Тому раз на місяць GitHub Actions (`.github/workflows/backup.yml`) робить власну копію:

- дані таблиць `public` (новини, події, профілі, ролі, коментарі, відгуки, заявки, фото, журнал);
- користувачі з `auth` (без сесій і токенів входу);
- усі файли з бакета `public-media` (фото, обкладинки);
- схема `public` і міграції з репозиторію;
- `MANIFEST.txt` з кількістю рядків у кожній таблиці.

Архів шифрується паролем (gpg, AES256) і зберігається як артефакт запуску 90 днів, тобто завжди є 3 останні місячні копії. Репозиторій публічний, тому незашифровані дані в GitHub не потрапляють.

## Налаштування (один раз)

1. **Рядок підключення.** Supabase → проєкт → кнопка **Connect** → вкладка **Session pooler** → скопіювати URI. Він має вигляд
   `postgresql://postgres.lyoicjdpqzvsfluromvo:[YOUR-PASSWORD]@aws-...pooler.supabase.com:5432/postgres`.
   Замість `[YOUR-PASSWORD]` вставити пароль бази. Якщо пароль невідомий: Project Settings → Database → **Reset database password** (краще лише літери й цифри, тоді його не треба кодувати в URL).
   Потрібен саме Session pooler: прямі підключення Supabase працюють лише через IPv6, а GitHub Actions їх не підтримує.
2. **Пароль шифрування.** Придумати довгий пароль (наприклад 5-6 випадкових слів) і зберегти його в менеджері паролів правління. Без нього копію не розшифрувати.
3. **Секрети в GitHub.** Репозиторій → Settings → Secrets and variables → Actions → **New repository secret**:
   - `SUPABASE_DB_URL`: рядок з кроку 1;
   - `BACKUP_PASSPHRASE`: пароль з кроку 2.
4. **Перевірка.** Actions → **Backup** → **Run workflow**. Через 1-2 хвилини в запуску з'явиться артефакт `lionslviv-backup-РРРР-ММ-ДД`. У журналі кроку Back up видно кількість рядків і файлів.

## Як завантажити і розшифрувати

1. Actions → Backup → потрібний запуск → Artifacts → завантажити zip і розпакувати.
2. Перевірити цілісність і розшифрувати:

```bash
sha256sum -c lionslviv-backup-*.sha256
gpg -d lionslviv-backup-РРРР-ММ-ДД.tar.gz.gpg | tar -xz
```

## Відновлення в новий проєкт Supabase

1. Створити проєкт, у SQL Editor виконати по черзі файли з `migrations/` (так створюються таблиці, правила доступу, тригери і бакет).
2. Завантажити дані (рядок підключення нового проєкту, Session pooler):

```bash
cd lionslviv-backup-РРРР-ММ-ДД
psql "$NEW_DB_URL" --single-transaction -v ON_ERROR_STOP=1 \
  --command 'SET session_replication_role = replica' \
  --file data.sql
```

`session_replication_role = replica` вимикає тригери на час завантаження, щоб, наприклад, `handle_new_user` не створював профілі повторно.

3. Файли з `media/` завантажити в бакет `public-media` з тими самими шляхами (Storage → public-media → Upload, або `supabase storage cp -r media/ ss:///public-media --experimental`). Записи про файли в базі сховища створюються при завантаженні, тому в `data.sql` їх немає.
4. Оновити `SUPABASE_URL` і `SUPABASE_KEY` у `src/lib/supabase-config.ts`, а в Authentication → URL Configuration додати адреси сайту.

Перевірено локально: копія → розшифрування → відновлення дає ті самі кількості рядків і файлів.
