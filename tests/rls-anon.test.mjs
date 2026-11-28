// Анонімний доступ до Supabase через REST: що відвідувач без входу може і чого не може.
// Запуск: node --test tests/  (у CI на кожен push). Тести нічого не створюють у базі.
import { test } from 'node:test';
import assert from 'node:assert/strict';

const URL = 'https://lyoicjdpqzvsfluromvo.supabase.co';
const KEY = 'sb_publishable_jB7J-kFxGWpZmkBMGZO5Bw_gDjbGjNT';
const h = { apikey: KEY, 'Content-Type': 'application/json' };
const rest = (path, init = {}) => fetch(`${URL}/rest/v1/${path}`, { ...init, headers: { ...h, ...(init.headers || {}) } });
const rows = async (path) => { const r = await rest(path); if (!r.ok) return { status: r.status, data: null }; return { status: r.status, data: await r.json() }; };

test('публічні події і новини читаються', async () => {
  const ev = await rows('events?select=slug,status,visibility');
  assert.equal(ev.status, 200);
  assert.ok(ev.data.length > 0, 'немає подій');
  assert.ok(ev.data.every((e) => e.status === 'published' && e.visibility === 'public'), 'аноніму видно чернетки або закриті події');
  const po = await rows('posts?select=slug,status');
  assert.equal(po.status, 200);
  assert.ok(po.data.every((p) => p.status === 'published'), 'аноніму видно чернетки новин');
});

for (const table of ['profiles', 'contact_requests', 'role_invites', 'audit_log', 'event_rsvps', 'site_feedback']) {
  test(`анонім не бачить ${table}`, async () => {
    const r = await rows(`${table}?select=*&limit=5`);
    assert.ok(r.data === null || r.data.length === 0, `${table}: видно ${r.data?.length} рядків`);
  });
}

test('анонім не бачить email авторів відгуків', async () => {
  const r = await rows('reviews?select=email&limit=5');
  assert.ok(r.data === null || r.data.every((x) => !x.email) || r.data.length === 0);
});

test('анонім не може писати коментарі, новини, події, фото', async () => {
  const tries = [
    ['comments', { target: 'ci-test', author_id: '00000000-0000-0000-0000-000000000000', body: 'ci test' }],
    ['posts', { slug: 'ci-test', title_en: 'x', status: 'published', published_at: new Date().toISOString() }],
    ['events', { slug: 'ci-test', title_en: 'x', starts_at: new Date().toISOString() }],
    ['photos', { album_slug: 'ci-test', storage_path: 'x.jpg' }],
    ['role_invites', { email: 'ci@example.test', role: 'admin' }],
  ];
  for (const [table, body] of tries) {
    const r = await rest(table, { method: 'POST', body: JSON.stringify(body) });
    assert.ok(r.status >= 400, `${table}: вставка дозволена (${r.status})`);
  }
});

test('анонім не може опублікувати відгук одразу', async () => {
  const r = await rest('reviews', { method: 'POST', body: JSON.stringify({ author_name: 'CI TEST', body: 'ci test', status: 'approved' }) });
  assert.ok(r.status >= 400, `відгук зі статусом approved прийнято (${r.status})`);
});

test('анонім не може змінити чи видалити подію', async () => {
  const before = await rows('events?select=slug,title_en&order=slug');
  const patch = await rest('events?slug=neq.__none__', { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ title_en: 'hacked' }) });
  const del = await rest('events?slug=neq.__none__', { method: 'DELETE', headers: { Prefer: 'return=representation' } });
  for (const r of [patch, del]) {
    if (r.ok) assert.deepEqual(await r.json(), [], 'зміна торкнулась рядків');
  }
  const after = await rows('events?select=slug,title_en&order=slug');
  assert.deepEqual(after.data, before.data);
});

test('роль аноніма: user', async () => {
  const r = await rest('rpc/my_role', { method: 'POST', body: '{}' });
  assert.equal(r.status, 200);
  assert.equal(await r.json(), 'user');
});

test('анонім не може завантажити файл у сховище', async () => {
  const r = await fetch(`${URL}/storage/v1/object/public-media/ci-test/x.txt`, { method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'image/jpeg' }, body: 'x' });
  assert.ok(r.status >= 400, `завантаження дозволено (${r.status})`);
});

test('анонім не бачить контактів членів клубу', async () => {
  const r = await rest('rpc/member_contacts', { method: 'POST', body: JSON.stringify({ p_slug: 'lars-vestbjerg' }) });
  const data = r.ok ? await r.json() : null;
  assert.ok(!r.ok || (Array.isArray(data) && data.length === 0), `контакти видно аноніму: ${JSON.stringify(data)}`);
});

test('анонім не може привʼязати профіль', async () => {
  const r = await rest('rpc/set_member_slug', { method: 'POST', body: JSON.stringify({ p_profile: '00000000-0000-0000-0000-000000000000', p_slug: 'x' }) });
  assert.ok(!r.ok, `set_member_slug доступна аноніму: ${r.status}`);
});

test('анонім не може надіслати побажання з готовим статусом чи чужими файлами', async () => {
  const tries = [
    { kind: 'idea', message: 'ci test', status: 'done' },
    { kind: 'idea', message: 'ci test', admin_note: 'x' },
    { kind: 'materials', message: 'ci test', files: [{ path: '00000000-0000-0000-0000-000000000000/x.jpg' }] },
  ];
  for (const body of tries) {
    const r = await rest('site_feedback', { method: 'POST', body: JSON.stringify(body) });
    assert.ok(r.status >= 400, `site_feedback: вставка дозволена (${r.status}) для ${JSON.stringify(body)}`);
  }
});

test('анонім не може завантажити файл до побажань', async () => {
  const r = await fetch(`${URL}/storage/v1/object/feedback-files/ci-test/x.jpg`, { method: 'POST', headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'image/jpeg' }, body: 'x' });
  assert.ok(r.status >= 400, `завантаження дозволено (${r.status})`);
});
