#!/usr/bin/env bash
# Завантажує офіційні брендбуки Lions International у public/brand/,
# звідки сайт віддає їх на сторінці /brand, а також копіює в docs/brand/.
# Запуск з кореня проєкту: bash scripts/fetch-brand-assets.sh
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/brand docs/brand

fetch() {
  local url="$1" out="$2"
  echo "→ $out"
  if curl -fL --retry 2 -A "Mozilla/5.0" -o "public/brand/$out.tmp" "$url"; then
    if head -c 4 "public/brand/$out.tmp" | grep -q "%PDF"; then
      mv "public/brand/$out.tmp" "public/brand/$out"
      cp "public/brand/$out" "docs/brand/$out"
      echo "  ok ($(du -h "public/brand/$out" | cut -f1))"
    else
      rm -f "public/brand/$out.tmp"
      echo "  ! сервер повернув не PDF. Завантажте вручну з https://www.lionsclubs.org/en/resources-for-members/brand-guidelines"
    fi
  else
    rm -f "public/brand/$out.tmp"
    echo "  ! не вдалося завантажити $url"
  fi
}

# Club Brand Guidelines V1.0 (09/19), офіційний CDN Lions International
fetch "https://cdn2.webdamdb.com/md_wCNDBjM1EE12.jpg.pdf?v=1" "lions-club-brand-guidelines-v1.pdf"

# Lions International Brand Guidelines (актуальна версія, V4.0 05/23 на момент перевірки)
fetch "https://www.lionsclubs.org/resources/81104618" "lions-international-brand-guidelines-v4.pdf"

echo
echo "Готово. Перезберіть сайт (npm run build): кнопки «Завантажити PDF» на /brand з'являться автоматично."
echo "Емблему клубу (SVG) беріть лише з https://www.lionsclubs.org/en/logos і кладіть у public/brand/emblem.svg"
