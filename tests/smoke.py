#!/usr/bin/env python3
"""Smoke-тести інтерфейсу на зібраному сайті (dist/).

Запуск: npm run build && python3 tests/smoke.py
Потрібні: pip install playwright, Chrome (/usr/bin/google-chrome або PLAYWRIGHT_CHROME).
Supabase у тестах може бути недоступний: перевіряємо, що сторінки працюють і без бекенду.
"""
import asyncio, json, os, re, subprocess, sys, time, glob
from playwright.async_api import async_playwright

ROOT = os.path.join(os.path.dirname(__file__), '..', 'dist')
PORT = 4471
B = f'http://localhost:{PORT}'
CHROME = os.environ.get('PLAYWRIGHT_CHROME', '/usr/bin/google-chrome')
PAGES = ['/', '/about/', '/projects/', '/news/', '/news/druha-zustrich-klubu/', '/events/', '/events/tretia-zustrich/',
         '/gallery/', '/gallery/persha-zustrich/', '/members/', '/members/lars-vestbjerg/', '/support/', '/join/',
         '/contacts/', '/reviews/', '/brand/', '/lions/', '/privacy/', '/login/', '/account/', '/admin/', '/news/post/?slug=x']
results = []

def check(name, ok, detail=''):
    results.append((name, ok, detail))
    print(('PASS ' if ok else 'FAIL ') + name + (f' : {detail}' if detail and not ok else ''))

def links_ok():
    bad = []
    for f in glob.glob(ROOT + '/**/*.html', recursive=True):
        for href in re.findall(r'(?:href|src)="([^"#?]+)', open(f, encoding='utf-8').read()):
            if href.startswith(('http', 'mailto:', 'tel:', 'data:', 'webcal:')): continue
            t = os.path.join(ROOT, href.lstrip('/'))
            if not (os.path.isfile(t) or os.path.isfile(os.path.join(t, 'index.html'))): bad.append((f.replace(ROOT, ''), href))
    check('внутрішні посилання цілі', not bad, str(bad[:5]))

async def main():
    links_ok()
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME, args=['--no-sandbox'])
        for lang in ['', '/uk']:
            for vw, vh, kind in [(1280, 900, 'desktop'), (375, 812, 'mobile')]:
                ctx = await b.new_context(viewport={'width': vw, 'height': vh}, is_mobile=kind == 'mobile', has_touch=kind == 'mobile')
                pg = await ctx.new_page()
                errs = []
                pg.on('pageerror', lambda e: errs.append(str(e)))
                for path in PAGES:
                    url = B + lang + path
                    r = await pg.goto(url)
                    await pg.wait_for_timeout(250)
                    ok = r is not None and r.status == 200
                    sw = await pg.evaluate('document.documentElement.scrollWidth')
                    hl = await pg.get_attribute('html', 'lang')
                    check(f'{kind} {lang or "/en"}{path}', ok and sw <= vw and hl == ('uk' if lang else 'en'), f'status={r and r.status} scrollWidth={sw} lang={hl}')
                check(f'{kind} {lang or "/en"} без JS-помилок', not errs, '; '.join(errs[:3]))
                await ctx.close()
        pg = await b.new_page(viewport={'width': 1280, 'height': 900})
        # перемикач мови зберігає сторінку
        await pg.goto(B + '/members/oleksiy-druhov/'); await pg.click('header [data-lang-switch]'); await pg.wait_for_timeout(700)
        check('перемикач мови EN → UK', pg.url.endswith('/uk/members/oleksiy-druhov/') and await pg.get_attribute('html', 'lang') == 'uk', pg.url)
        # події: перемикання вигляду і підписка
        await pg.goto(B + '/events/'); await pg.click('[data-view=cal]'); await pg.wait_for_timeout(200)
        check('події: календар відкривається', await pg.is_visible('[data-pane=cal]') and await pg.is_hidden('[data-pane=list]'))
        await pg.click('[data-view=list]'); await pg.click('[data-sub] summary'); await pg.wait_for_timeout(150)
        hrefs = await pg.eval_on_selector_all('[data-sub] a', 'els => els.map(e => e.href)')
        check('події: меню підписки', len(hrefs) == 3 and hrefs[1].startswith('webcal://') and 'calendar.google.com' in hrefs[0], str(hrefs))
        # галерея: lightbox
        await pg.goto(B + '/gallery/druha-zustrich/'); await pg.click('[data-index="0"]'); await pg.wait_for_timeout(300)
        check('галерея: lightbox відкривається', await pg.get_attribute('[data-lightbox]', 'data-open') == 'true')
        await pg.keyboard.press('ArrowRight'); await pg.wait_for_timeout(150)
        check('галерея: наступне фото', '2' in (await pg.inner_text('[data-lb-caption]')))
        await pg.keyboard.press('Escape')
        # підтримка: копіювання номера картки
        await pg.goto(B + '/support/')
        check('підтримка: номер банки', '4874 1000 3541 7933' in await pg.inner_text('[data-card]'))
        # вхід: форма є, без пароля
        await pg.goto(B + '/login/'); await pg.wait_for_timeout(500)
        check('вхід: форма email', await pg.is_visible('[data-login] input[type=email]') and await pg.locator('input[type=password]').count() == 0)
        # адмінка без входу: доступ закрито
        await pg.goto(B + '/admin/'); await pg.wait_for_timeout(1500)
        check('адмінка без входу закрита', await pg.is_hidden('[data-app]'))
        # SEO: hreflang і canonical
        html = open(os.path.join(ROOT, 'uk', 'about', 'index.html'), encoding='utf-8').read()
        check('hreflang en/uk/x-default', all(f'hreflang="{x}"' in html for x in ['en', 'uk', 'x-default']))
        # без довгих тире у видимому тексті
        dashes = [f for f in glob.glob(ROOT + '/**/*.html', recursive=True) if re.search('[\\u2014\\u2013]', re.sub(r'<script.*?</script>', '', open(f, encoding='utf-8').read(), flags=re.S))]
        check('без довгих тире', not dashes, str(dashes[:3]))
        await b.close()
    failed = [r for r in results if not r[1]]
    print(f'\n{len(results) - len(failed)}/{len(results)} passed')
    sys.exit(1 if failed else 0)

srv = subprocess.Popen([sys.executable, '-m', 'http.server', str(PORT), '-d', ROOT], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(0.8)
try:
    asyncio.run(main())
finally:
    srv.terminate()
