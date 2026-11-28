-- Побажання до сайту: форма /feedback і вкладка «Побажання» в адмінці (28.11.2026).
--
-- Хто що робить:
--  * будь-хто (і без входу) надсилає ідею, помилку або коментар до сайту;
--  * файли (фото, документи) додають лише ті, хто увійшов: файли лежать у приватному бакеті
--    feedback-files у папці свого акаунта (<uid>/...), без входу сховище закрите;
--  * редактори й адміни бачать звернення, беруть у роботу, пишуть нотатку, закривають або видаляють;
--  * автор не може сам виставити статус чи нотатку, ім'я того, хто взяв у роботу, задає база.

create table if not exists public.site_feedback (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'idea' check (kind in ('idea', 'bug', 'materials', 'other')),
  page text check (char_length(page) <= 300),
  message text not null check (char_length(message) between 2 and 3000),
  name text check (char_length(name) <= 120),
  email text check (char_length(email) <= 200),
  files jsonb not null default '[]'::jsonb,   -- [{ path, name, size, type }]
  consent_publish boolean not null default false,
  author_id uuid references public.profiles (id) on delete set null default auth.uid(),
  status text not null default 'new' check (status in ('new', 'in_progress', 'done', 'declined')),
  admin_note text check (char_length(admin_note) <= 2000),
  handled_by uuid references public.profiles (id) on delete set null,
  handled_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists site_feedback_status_idx on public.site_feedback (status, created_at desc);

-- Файли у зверненні: не більше 8 і лише з власної папки автора (<uid>/...).
create or replace function public.feedback_files_ok(f jsonb) returns boolean
language sql stable set search_path = public as $$
  select jsonb_typeof(f) = 'array'
    and jsonb_array_length(f) <= 8
    and (jsonb_array_length(f) = 0 or (
      auth.uid() is not null
      and not exists (
        select 1 from jsonb_array_elements(f) e
        where jsonb_typeof(e) <> 'object' or coalesce(e ->> 'path', '') not like auth.uid()::text || '/%'
      )
    ))
$$;

alter table public.site_feedback enable row level security;

drop policy if exists "feedback: anyone sends" on public.site_feedback;
create policy "feedback: anyone sends" on public.site_feedback for insert with check (
  status = 'new' and admin_note is null and handled_by is null and handled_name is null
  and author_id is not distinct from auth.uid()
  and public.feedback_files_ok(files)
);
drop policy if exists "feedback: editors" on public.site_feedback;
create policy "feedback: editors" on public.site_feedback for all using (public.is_editor()) with check (public.is_editor());

-- Обмеження частоти: до 5 звернень за 10 хвилин з одного акаунта, без входу до 10 за 10 хвилин разом.
create or replace function public.site_feedback_rate_limit() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.author_id is not null then
    if (select count(*) from public.site_feedback where author_id = new.author_id and created_at > now() - interval '10 minutes') >= 5 then
      raise exception 'Too many messages, try again later' using errcode = 'P0001';
    end if;
  elsif (select count(*) from public.site_feedback where author_id is null and created_at > now() - interval '10 minutes') >= 10 then
    raise exception 'Too many messages, try again later' using errcode = 'P0001';
  end if;
  return new;
end $$;
drop trigger if exists site_feedback_rate_limit on public.site_feedback;
create trigger site_feedback_rate_limit before insert on public.site_feedback for each row execute function public.site_feedback_rate_limit();

-- Хто і коли змінив статус задає база, а не браузер. Вміст звернення після надсилання не змінюється.
create or replace function public.site_feedback_touch() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.updated_at := now();
  new.kind := old.kind; new.page := old.page; new.message := old.message; new.name := old.name; new.email := old.email;
  new.files := old.files; new.consent_publish := old.consent_publish; new.author_id := old.author_id; new.created_at := old.created_at;
  if new.status is distinct from old.status then
    new.handled_by := auth.uid();
    select coalesce(nullif(p.full_name, ''), split_part(coalesce(p.email, ''), '@', 1)) into new.handled_name
    from public.profiles p where p.id = auth.uid();
  else
    new.handled_by := old.handled_by; new.handled_name := old.handled_name;
  end if;
  return new;
end $$;
drop trigger if exists site_feedback_touch on public.site_feedback;
create trigger site_feedback_touch before update on public.site_feedback for each row execute function public.site_feedback_touch();

grant insert on public.site_feedback to anon, authenticated;
grant select, update, delete on public.site_feedback to authenticated;
grant execute on function public.feedback_files_ok(jsonb) to anon, authenticated;

-- ---------- Storage: приватні файли до звернень ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('feedback-files', 'feedback-files', false, 20971520, array[
  'image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif',
  'application/pdf', 'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "feedback files: upload own folder" on storage.objects;
create policy "feedback files: upload own folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'feedback-files' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "feedback files: own or editors read" on storage.objects;
create policy "feedback files: own or editors read" on storage.objects for select to authenticated
  using (bucket_id = 'feedback-files' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_editor()));
drop policy if exists "feedback files: own or editors delete" on storage.objects;
create policy "feedback files: own or editors delete" on storage.objects for delete to authenticated
  using (bucket_id = 'feedback-files' and ((storage.foldername(name))[1] = auth.uid()::text or public.is_editor()));
