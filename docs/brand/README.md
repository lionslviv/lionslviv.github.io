# Бренд Lions International у проєкті

Конспект офіційних брендбуків, за якими зроблено дизайн-систему сайту. Перевірено 26.11.2026.

| Документ | Версія | Джерело |
| --- | --- | --- |
| Lions International Brand Guidelines | V4.0 FULL, 05/23 EN | [сторінка бренду на lionsclubs.org](https://www.lionsclubs.org/en/resources-for-members/brand-guidelines) |
| Club Brand Guidelines | V1.0 CLUB, 09/19 EN | [офіційний CDN Lions](https://cdn2.webdamdb.com/md_wCNDBjM1EE12.jpg.pdf?v=1) |
| Логотипи та емблеми | офіційні файли | [lionsclubs.org/en/logos](https://www.lionsclubs.org/en/logos) |
| Правила назв клубів | Board Policy Manual, розділ 10 | [PDF](https://www.lionsclubs.org/sites/default/files/Board-Policy-Manual/Chapter_10_en.pdf?v=2) |

PDF-копії: запустіть `bash scripts/fetch-brand-assets.sh`. Файли з’являться тут і в `public/brand/`, а сайт покаже кнопки завантаження на сторінці `/brand`.

## Офіційні файли емблеми, підписів та іконок

Сайт сам показує ці файли там, де вони потрібні, щойно вони з’являються в `public/brand/`. Поки файлу немає, сайт його просто не показує: замінників і перемальованих версій немає.

1. Член клубу завантажує файли з [lionsclubs.org/en/logos](https://www.lionsclubs.org/en/logos) (SVG або PNG з прозорим фоном).
2. Кладе їх в одну папку і запускає `npm run brand:import -- <папка>`. Скрипт сам розпізнає файли за назвою і копіює їх без змін.
3. Те, що скрипт не розпізнав, перейменовується вручну за таблицею нижче.
4. `npm run build`. Сторінка `/brand` показує, скільки файлів додано.

| Файл у `public/brand/` | Що завантажити на lionsclubs.org/en/logos | Де з’являється на сайті |
| --- | --- | --- |
| `emblem.svg` | Lions Emblems → Two Color | Шапка, сторінка «Бренд» |
| `emblem-white.svg` | Lions Emblems → One Color, White | Hero головної, футер, обкладинка для соцмереж |
| `signature-lci.svg` | Lions Clubs International Signatures → Horizontal, Two Color | «Про клуб» |
| `signature-lci-white.svg` | Lions Clubs International Signatures → Horizontal, One Color, White | Футер |
| `icon-vision.svg` | Service Icons → Vision, Full Color | Напрями служіння, теги проєктів |
| `icon-hunger.svg` | Service Icons → Hunger, Full Color | Напрями служіння |
| `icon-environment.svg` | Service Icons → Environment, Full Color | Напрями служіння, теги проєктів |
| `icon-diabetes.svg` | Service Icons → Diabetes, Full Color | Напрями служіння |
| `icon-cancer.svg` | Service Icons → Childhood Cancer, Full Color | Напрями служіння |
| `icon-humanitarian.svg` | Service Icons → LCIF Humanitarian Efforts, Full Color | Напрями служіння, теги проєктів |
| `icon-youth.svg` | Service Icons → LCIF Youth, Full Color | Напрями служіння, теги проєктів |

Умови Lions: файли завантажують члени Lions; клуби мають ліцензію використовувати емблему на вебсторінках; емблему не можна ставити на речі, що продаються. Тому на сайті файли емблем для публічного завантаження не викладаємо.

Після додавання `emblem-white` перегенеруйте обкладинку для соцмереж `public/og.png` зі сторінки `/og-card` (скріншот 1200×630).

## Кольори (V4.0, розділ 3.1)

| Роль | Назва | Pantone | HEX | Токен у CSS |
| --- | --- | --- | --- | --- |
| Основний | Blue | 287 | #00338D | `--color-lions` |
| Основний | Yellow | 7406 | #EBB700 | `--color-gold` |
| Основний | Purple | 2612 | #7A2582 | `--color-plum` |
| Вторинний | Blue light | 660 | #407CCA | `--color-lions-sky` |
| Вторинний | Navy | 289 | #0D2240 | `--color-lions-deep` |
| Вторинний | Cool Gray 11 | Cool Gray 11 | #55565A | `--color-stone` |
| Вторинний | Cool Gray 5 | Cool Gray 5 | #B3B2B1 | `--color-stone-soft` |
| Вторинний | Green | 3405 | #00AB68 | `--color-green` |
| Вторинний | Orange-red | 171 | #FF5B35 | `--color-coral` |

Градієнти дозволені з кольорів палітри (розділ 3.2): Purple 2612, Blue 287, Navy 289. Використано в hero.
Світлі кольори краще працюють на темних, текст на кольорі має бути контрастним. Жовтий не використовуємо як колір тексту на білому.

## Шрифти

- Helvetica Neue: основний шрифт Lions (друк, макети). Заголовки жирні, підзаголовки середні, текст легкий.
- Roboto: цифровий шрифт для вебу (V4.0, розділ 3.6). На сайті Roboto Flex (змінна версія Roboto, кирилиця, вісь ширини).
- Club Brand Guidelines 2019 додатково згадують Adobe Caslon для довгих текстів. У V4.0 цифровим шрифтом визначено Roboto, тому на сайті serif не використовуємо.

## Назва

- Перша згадка: Lions Clubs International, далі Lions International.
- Lions club, Lions clubs: мала літера c. Lions: члени, з великої.
- Наш клуб: **Lions Club Lviv Leopolis**, запис LCI: **Lviv (Leopolis)**.
- «International» до назви клубу додавати заборонено (Board Policy Manual, розділ 10, A.5.e).
- We Serve™ це торговельна марка.

## Емблема і підписи

- Ніколи не перемальовувати: лише офіційні файли. Член Lions завантажує їх з lionsclubs.org/en/logos.
- Члени Lions автоматично мають право використовувати торговельні марки в матеріалах клубу, зокрема на сайтах і в соцмережах (V4.0, с. 14). Інше: trademarkuse@lionsclubs.org.
- Вільне поле: висота літери L у центрі емблеми. Розмір у друці: бажано 1,43 см, мінімум 0,95 см.
- Не можна: розтягувати, обрізати, нахиляти, ставити на візерунок, переставляти елементи, змінювати кольори, робити напівпрозорою, змінювати шрифт.

## Фото

Відверті кадри Lions у дії, фокус на людях, яким допомагаємо, природне світло, різноманіття. Без постановки, без пересвічених і темних кадрів, без фото з пошуковиків без ліцензії.

## Контакти

Бренд-команда Lions International: lionsbrand@lionsclubs.org
