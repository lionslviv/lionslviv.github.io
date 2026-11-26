-- Тест правил доступу (RLS) для всіх ролей. Запуск: Supabase SQL Editor, весь файл.
-- Створює тимчасових користувачів rls-test-*@example.test, перевіряє дії від їхнього імені
-- і в кінці видаляє всі тестові дані (навіть якщо тест упав, наступний запуск спершу прибирає залишки). Результат: один рядок passed / total / failures.

delete from public.posts where slug like 'rls-test-%';
delete from public.photos where album_slug = 'rls-test';
delete from public.comments where target = 'rls-test';
delete from public.audit_log where action = 'rls test';
delete from public.role_invites where email like 'rls-test-%@example.test';
delete from public.reviews where author_name like 'RLS TEST%';
delete from auth.users where email like 'rls-test-%@example.test';

begin;

insert into auth.users (instance_id, id, aud, role, email, raw_user_meta_data, created_at, updated_at) values
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-4000-8000-0000000000a1', 'authenticated', 'authenticated', 'rls-test-user@example.test',   '{"full_name":"RLS User"}',   now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-4000-8000-0000000000a2', 'authenticated', 'authenticated', 'rls-test-member@example.test', '{"full_name":"RLS Member"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-4000-8000-0000000000a3', 'authenticated', 'authenticated', 'rls-test-editor@example.test', '{"full_name":"RLS Editor"}', now(), now()),
  ('00000000-0000-0000-0000-000000000000', '00000000-0000-4000-8000-0000000000a4', 'authenticated', 'authenticated', 'rls-test-admin@example.test',  '{"full_name":"RLS Admin"}',  now(), now());
update public.profiles set role = 'member' where id = '00000000-0000-4000-8000-0000000000a2';
update public.profiles set role = 'editor' where id = '00000000-0000-4000-8000-0000000000a3';
update public.profiles set role = 'admin'  where id = '00000000-0000-4000-8000-0000000000a4';

-- Результати пишемо в сесійні змінні t.*: їх може встановити будь-яка роль.
-- ========== звичайний користувач ==========
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-0000000000a1","role":"authenticated"}', true);
do $$
declare n int;
begin
  update public.profiles set role = 'admin' where id = auth.uid();
  update public.profiles set email = 'rls-test-admin@example.test' where id = auth.uid();
  begin insert into public.comments (target, author_id, body, status) values ('rls-test', auth.uid(), 'self approved', 'approved'); perform set_config('t.user_self_approve_comment', 'FAIL: inserted', false);
  exception when others then perform set_config('t.user_self_approve_comment', 'PASS', false); end;
  begin insert into public.comments (target, author_id, author_name, body, status) values ('rls-test', auth.uid(), 'Lars Vestbjerg', 'pending ok', 'pending'); perform set_config('t.user_pending_comment', 'PASS', false);
  exception when others then perform set_config('t.user_pending_comment', 'FAIL: ' || sqlerrm, false); end;
  begin insert into public.posts (slug, title_en, status, published_at) values ('rls-test-user', 'x', 'published', now()); perform set_config('t.user_cannot_post', 'FAIL: inserted', false);
  exception when others then perform set_config('t.user_cannot_post', 'PASS', false); end;
  select count(*) into n from public.contact_requests; perform set_config('t.user_cannot_read_requests', case when n = 0 then 'PASS' else 'FAIL: ' || n end, false);
  select count(*) into n from public.profiles; perform set_config('t.user_sees_only_own_profile', case when n = 1 then 'PASS' else 'FAIL: ' || n end, false);
  begin insert into public.role_invites (email, role) values ('rls-test-x@example.test', 'admin'); perform set_config('t.user_cannot_invite', 'FAIL: inserted', false);
  exception when others then perform set_config('t.user_cannot_invite', 'PASS', false); end;
  begin insert into public.photos (album_slug, storage_path, uploaded_by, status) values ('rls-test', 'x.jpg', auth.uid(), 'pending'); perform set_config('t.user_cannot_upload_photo', 'FAIL: inserted', false);
  exception when others then perform set_config('t.user_cannot_upload_photo', 'PASS', false); end;
  begin update public.events set title_en = 'hacked' where true; get diagnostics n = row_count; perform set_config('t.user_cannot_edit_events', case when n = 0 then 'PASS' else 'FAIL: ' || n end, false);
  exception when others then perform set_config('t.user_cannot_edit_events', 'PASS', false); end;
end $$;
reset role;

-- ========== член клубу ==========
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-0000000000a2","role":"authenticated"}', true);
do $$
declare n int;
begin
  begin insert into public.comments (target, author_id, body, status) values ('rls-test', auth.uid(), 'member approved', 'approved'); perform set_config('t.member_comment_published', 'PASS', false);
  exception when others then perform set_config('t.member_comment_published', 'FAIL: ' || sqlerrm, false); end;
  select count(*) into n from public.profiles; perform set_config('t.member_sees_only_own_profile', case when n = 1 then 'PASS' else 'FAIL: ' || n end, false);
  begin insert into public.posts (slug, title_en, status, published_at) values ('rls-test-member', 'x', 'published', now()); perform set_config('t.member_cannot_post', 'FAIL: inserted', false);
  exception when others then perform set_config('t.member_cannot_post', 'PASS', false); end;
  begin insert into public.photos (album_slug, storage_path, uploaded_by, status) values ('rls-test', 'm.jpg', auth.uid(), 'pending'); perform set_config('t.member_uploads_pending_photo', 'PASS', false);
  exception when others then perform set_config('t.member_uploads_pending_photo', 'FAIL: ' || sqlerrm, false); end;
  begin insert into public.photos (album_slug, storage_path, uploaded_by, status) values ('rls-test', 'm2.jpg', auth.uid(), 'approved'); perform set_config('t.member_cannot_self_approve_photo', 'FAIL: inserted', false);
  exception when others then perform set_config('t.member_cannot_self_approve_photo', 'PASS', false); end;
end $$;
reset role;

-- ========== редактор ==========
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-0000000000a3","role":"authenticated"}', true);
do $$
declare n int;
begin
  begin insert into public.posts (slug, title_en, status, published_at) values ('rls-test-editor', 'Editor post', 'published', now()); perform set_config('t.editor_can_post', 'PASS', false);
  exception when others then perform set_config('t.editor_can_post', 'FAIL: ' || sqlerrm, false); end;
  update public.profiles set role = 'admin' where id = '00000000-0000-4000-8000-0000000000a1';
  select count(*) into n from public.profiles; perform set_config('t.editor_sees_profiles', case when n >= 4 then 'PASS' else 'FAIL: ' || n end, false);
  begin select count(*) into n from public.contact_requests; perform set_config('t.editor_reads_requests', 'PASS', false);
  exception when others then perform set_config('t.editor_reads_requests', 'FAIL: ' || sqlerrm, false); end;
  begin insert into public.role_invites (email, role) values ('rls-test-y@example.test', 'admin'); perform set_config('t.editor_cannot_invite', 'FAIL: inserted', false);
  exception when others then perform set_config('t.editor_cannot_invite', 'PASS', false); end;
  insert into public.audit_log (action, actor_name) values ('rls test', 'Lars Vestbjerg');
  update public.comments set status = 'hidden' where target = 'rls-test' and body = 'member approved'; get diagnostics n = row_count;
  perform set_config('t.editor_moderates_comments', case when n = 1 then 'PASS' else 'FAIL: ' || n end, false);
end $$;
reset role;

-- ========== адмін ==========
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"00000000-0000-4000-8000-0000000000a4","role":"authenticated"}', true);
do $$
begin
  begin insert into public.role_invites (email, role) values ('rls-test-user@example.test', 'member'); perform set_config('t.admin_can_invite', 'PASS', false);
  exception when others then perform set_config('t.admin_can_invite', 'FAIL: ' || sqlerrm, false); end;
  begin update public.profiles set role = 'editor' where id = '00000000-0000-4000-8000-0000000000a2'; perform set_config('t.admin_can_set_role', 'PASS', false);
  exception when others then perform set_config('t.admin_can_set_role', 'FAIL: ' || sqlerrm, false); end;
end $$;
reset role;

-- ========== анонім ==========
set local role anon;
select set_config('request.jwt.claims', '{"role":"anon"}', true);
do $$
declare n int;
begin
  begin select count(*) into n from public.profiles; perform set_config('t.anon_cannot_read_profiles', case when n = 0 then 'PASS' else 'FAIL: ' || n end, false);
  exception when others then perform set_config('t.anon_cannot_read_profiles', 'PASS', false); end;
  begin insert into public.comments (target, author_id, body) values ('rls-test', '00000000-0000-4000-8000-0000000000a1', 'anon'); perform set_config('t.anon_cannot_comment', 'FAIL: inserted', false);
  exception when others then perform set_config('t.anon_cannot_comment', 'PASS', false); end;
  begin insert into public.reviews (author_name, body, status) values ('RLS TEST approved', 'x review', 'approved'); perform set_config('t.anon_cannot_publish_review', 'FAIL: inserted', false);
  exception when others then perform set_config('t.anon_cannot_publish_review', 'PASS', false); end;
  begin insert into public.reviews (author_name, body, status) values ('RLS TEST pending', 'x review', 'pending'); perform set_config('t.anon_can_send_review', 'PASS', false);
  exception when others then perform set_config('t.anon_can_send_review', 'FAIL: ' || sqlerrm, false); end;
  select count(*) into n from public.posts where status <> 'published'; perform set_config('t.anon_sees_no_drafts', case when n = 0 then 'PASS' else 'FAIL: ' || n end, false);
end $$;
reset role;

-- ========== перевірки станом бази ==========
select set_config('t.user_cannot_escalate_role', case when (select role from public.profiles where id = '00000000-0000-4000-8000-0000000000a1') <> 'admin' then 'PASS' else 'FAIL' end, false);
select set_config('t.user_cannot_change_email', case when (select email from public.profiles where id = '00000000-0000-4000-8000-0000000000a1') = 'rls-test-user@example.test' then 'PASS' else 'FAIL' end, false);
select set_config('t.comment_author_name_from_db', case when (select author_name from public.comments where body = 'pending ok') = 'RLS User' then 'PASS' else 'FAIL: ' || coalesce((select author_name from public.comments where body = 'pending ok'), 'null') end, false);
select set_config('t.audit_actor_from_db', case when (select actor_name from public.audit_log where action = 'rls test' order by id desc limit 1) = 'RLS Editor' then 'PASS' else 'FAIL' end, false);
select set_config('t.invite_applies_role', case when (select role from public.profiles where id = '00000000-0000-4000-8000-0000000000a1') = 'member' then 'PASS' else 'FAIL: ' || (select role from public.profiles where id = '00000000-0000-4000-8000-0000000000a1') end, false);
select set_config('t.admin_role_change_applied', case when (select role from public.profiles where id = '00000000-0000-4000-8000-0000000000a2') = 'editor' then 'PASS' else 'FAIL' end, false);

commit;

-- Прибирання: усі тестові дані видаляємо (результати тестів лишаються в змінних сесії)
delete from public.posts where slug like 'rls-test-%';
delete from public.photos where album_slug = 'rls-test';
delete from public.comments where target = 'rls-test';
delete from public.audit_log where action = 'rls test';
delete from public.role_invites where email like 'rls-test-%@example.test';
delete from public.reviews where author_name like 'RLS TEST%';
delete from auth.users where email like 'rls-test-%@example.test';
with r as (select name as test, current_setting('t.' || name, true) as result
from unnest(array[
  'user_cannot_escalate_role', 'user_cannot_change_email', 'user_self_approve_comment', 'user_pending_comment', 'comment_author_name_from_db',
  'user_cannot_post', 'user_cannot_read_requests', 'user_sees_only_own_profile', 'user_cannot_invite', 'user_cannot_upload_photo', 'user_cannot_edit_events',
  'member_comment_published', 'member_sees_only_own_profile', 'member_cannot_post', 'member_uploads_pending_photo', 'member_cannot_self_approve_photo',
  'editor_can_post', 'editor_sees_profiles', 'editor_reads_requests', 'editor_cannot_invite', 'editor_moderates_comments', 'audit_actor_from_db',
  'admin_can_invite', 'admin_can_set_role', 'invite_applies_role', 'admin_role_change_applied',
  'anon_cannot_read_profiles', 'anon_cannot_comment', 'anon_cannot_publish_review', 'anon_can_send_review', 'anon_sees_no_drafts'
]) as name)
select count(*) filter (where result = 'PASS') as passed, count(*) as total,
  coalesce(string_agg(test || ': ' || coalesce(result, 'not run'), '; ') filter (where result is distinct from 'PASS'), 'none') as failures
from r;
