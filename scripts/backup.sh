#!/usr/bin/env bash
# Резервна копія Supabase: схема public, дані (public, auth, storage), файли сховища
# і міграції з репозиторію. Результат шифрується паролем (gpg, AES256).
# Запускається щомісяця з .github/workflows/backup.yml. Відновлення: docs/backup.md.
#
# Потрібні змінні середовища:
#   SUPABASE_DB_URL     рядок підключення Session pooler (з паролем бази)
#   BACKUP_PASSPHRASE   пароль для шифрування архіву
# Необовʼязкові: OUT_DIR (backup-out), MEDIA_BASE, MEDIA_BUCKET (public-media)
set -euo pipefail

: "${SUPABASE_DB_URL:?Немає SUPABASE_DB_URL: додай секрет у GitHub (див. docs/backup.md)}"
: "${BACKUP_PASSPHRASE:?Немає BACKUP_PASSPHRASE: додай секрет у GitHub (див. docs/backup.md)}"

OUT_DIR=${OUT_DIR:-backup-out}
MEDIA_BUCKET=${MEDIA_BUCKET:-public-media}
MEDIA_BASE=${MEDIA_BASE:-https://lyoicjdpqzvsfluromvo.supabase.co/storage/v1/object/public}
STAMP=$(date -u +%Y-%m-%d)
NAME="lionslviv-backup-$STAMP"

work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
dir="$work/$NAME"
mkdir -p "$dir/media" "$OUT_DIR"

db() { psql "$SUPABASE_DB_URL" -X -v ON_ERROR_STOP=1 -At "$@"; }

server_version=$(db -c 'show server_version')
echo "Сервер: $server_version"
echo "Клієнт: $(pg_dump --version)"

# 1. Схема public (для звірки; при відновленні основа: міграції з репозиторію)
pg_dump "$SUPABASE_DB_URL" --schema-only --no-owner --no-privileges --schema=public -f "$dir/schema.sql"

# 2. Дані. Тимчасові й службові таблиці auth/storage не беремо;
#    storage.buckets створює міграція, тому її дані теж не дублюємо.
pg_dump "$SUPABASE_DB_URL" --data-only --no-owner --no-privileges \
  --schema=public --schema=auth --schema=storage \
  --exclude-table-data='auth.sessions' \
  --exclude-table-data='auth.refresh_tokens' \
  --exclude-table-data='auth.flow_state' \
  --exclude-table-data='auth.one_time_tokens' \
  --exclude-table-data='auth.mfa_challenges' \
  --exclude-table-data='auth.audit_log_entries' \
  --exclude-table-data='auth.schema_migrations' \
  --exclude-table-data='storage.migrations' \
  --exclude-table-data='storage.buckets' \
  -f "$dir/data.sql"

# 3. Файли зі сховища (публічний бакет)
media_ok=0; media_fail=0
while IFS= read -r path; do
  [ -z "$path" ] && continue
  enc=$(python3 -c 'import sys, urllib.parse; print("/".join(urllib.parse.quote(p) for p in sys.argv[1].split("/")))' "$path")
  mkdir -p "$dir/media/$(dirname "$path")"
  if curl -fsS --retry 3 -o "$dir/media/$path" "$MEDIA_BASE/$MEDIA_BUCKET/$enc"; then
    media_ok=$((media_ok + 1))
  else
    media_fail=$((media_fail + 1)); echo "Не вдалося завантажити: $path" >&2
  fi
done < <(db -c "select name from storage.objects where bucket_id = '$MEDIA_BUCKET' order by name")

# 4. Міграції з репозиторію (якщо скрипт запущено з кореня проєкту)
[ -d supabase/migrations ] && cp -r supabase/migrations "$dir/migrations"

# 5. Опис копії
{
  echo "Lviv International Lions Club: резервна копія від $STAMP (UTC)"
  echo "Сервер PostgreSQL: $server_version"
  echo "Файлів сховища: $media_ok (помилок: $media_fail)"
  echo
  echo "Кількість рядків:"
  for t in $(db -c "select format('%I.%I', table_schema, table_name) from information_schema.tables where table_schema = 'public' and table_type = 'BASE TABLE' order by 1") auth.users; do
    echo "$t $(db -c "select count(*) from $t")"
  done
} > "$dir/MANIFEST.txt"
cat "$dir/MANIFEST.txt"

# 6. Архів і шифрування
file="$OUT_DIR/$NAME.tar.gz.gpg"
tar -C "$work" -czf - "$NAME" \
  | gpg --batch --yes --quiet --pinentry-mode loopback --passphrase-fd 3 \
        --symmetric --cipher-algo AES256 -o "$file" 3<<<"$BACKUP_PASSPHRASE"
(cd "$OUT_DIR" && sha256sum "$NAME.tar.gz.gpg" > "$NAME.tar.gz.gpg.sha256")

echo "Готово: $file ($(du -h "$file" | cut -f1))"
[ -n "${GITHUB_OUTPUT:-}" ] && echo "name=$NAME" >> "$GITHUB_OUTPUT"
if [ "$media_fail" -gt 0 ]; then echo "::warning::Не всі файли сховища збережено ($media_fail)"; fi
exit 0
