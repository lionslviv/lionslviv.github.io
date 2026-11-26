-- Lviv International Lions Club: схема Supabase. Застосовано 26.11.2026 у проєкті lyoicjdpqzvsfluromvo (SQL Editor).
-- Ролі: user < member < editor < admin. RLS на всіх таблицях.
-- Ролі видаються через запрошення (role_invites): коли людина з цим email входить, отримує роль.

create type public.app_role as enum ('user', 'member', 'editor', 'admin');
create type public.post_status as enum ('draft', 'published');
create type public.visibility as enum ('public', 'members');
create type public.mod_status as enum ('pending', 'approved', 'hidden', 'private');
create type public.review_kind as enum ('partner', 'beneficiary', 'volunteer', 'guest');

-- ---------- профілі і ролі ----------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text not null default '',
  role public.app_role not null default 'user',
  club_position text,
  profession text,
  bio text check (char_length(bio) <= 300),
  quote text check (char_length(quote) <= 140),
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.role_invites (
  email text primary key,
  role public.app_role not null,
  invited_by uuid default auth.uid(),
  created_at timestamptz not null default now()
);

-- Хелпери ролей: security definer, щоб політики не зациклювались на profiles
create or replace function public.my_role() returns public.app_role
language sql stable security definer set search_path = public as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'user'::public.app_role)
$$;
create or replace function public.is_member() returns boolean language sql stable security definer set search_path = public as $$ select public.my_role() in ('member', 'editor', 'admin') $$;
create or replace function public.is_editor() returns boolean language sql stable security definer set search_path = public as $$ select public.my_role() in ('editor', 'admin') $$;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$ select public.my_role() = 'admin' $$;

-- Новий користувач: профіль з роллю із запрошення або 'user'
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id, new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce((select role from public.role_invites where lower(email) = lower(new.email)), 'user')
  );
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Запрошення для вже зареєстрованої людини одразу змінює її роль
create or replace function public.apply_invite() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set role = new.role where lower(email) = lower(new.email);
  return new;
end $$;
create trigger on_role_invite after insert or update on public.role_invites for each row execute function public.apply_invite();

-- Користувач не може сам змінити собі роль
create or replace function public.protect_role() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.role is distinct from old.role and not public.is_admin() and current_user not in ('postgres', 'service_role', 'supabase_admin') then
    new.role := old.role;
  end if;
  return new;
end $$;
create trigger profiles_protect_role before update on public.profiles for each row execute function public.protect_role();

-- ---------- контент ----------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_en text not null default '', title_uk text not null default '',
  excerpt_en text, excerpt_uk text,
  body_en text, body_uk text,             -- абзаци через порожній рядок; "## " підзаголовок
  cover_url text,
  status public.post_status not null default 'draft',
  published_at timestamptz,
  author_id uuid references public.profiles (id) default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_en text not null default '', title_uk text not null default '',
  description_en text, description_uk text,
  starts_at timestamptz not null,
  time_unknown boolean not null default false,
  location_en text, location_uk text,
  visibility public.visibility not null default 'public',
  status public.post_status not null default 'published',
  created_at timestamptz not null default now()
);

create table public.event_rsvps (
  event_slug text not null,
  user_id uuid not null references public.profiles (id) on delete cascade default auth.uid(),
  going boolean not null default true,
  primary key (event_slug, user_id)
);

create table public.photos (
  id uuid primary key default gen_random_uuid(),
  album_slug text not null,
  storage_path text not null,
  caption text,
  uploaded_by uuid references public.profiles (id) default auth.uid(),
  status public.mod_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  target text not null,                     -- slug новини, альбому чи поста з адмінки
  author_id uuid not null references public.profiles (id) on delete cascade default auth.uid(),
  author_name text not null default '',
  body text not null check (char_length(body) between 2 and 1500),
  status public.mod_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null check (char_length(author_name) between 2 and 120),
  author_kind public.review_kind not null default 'guest',
  body text not null check (char_length(body) between 2 and 1200),
  consent_publish boolean not null default false,
  email text,
  status public.mod_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('join', 'contact')),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  message text not null check (char_length(message) between 1 and 3000),
  created_at timestamptz not null default now()
);

create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid default auth.uid(),
  actor_name text,
  action text not null,
  at timestamptz not null default now()
);

-- ---------- RLS ----------
alter table public.profiles enable row level security;
alter table public.role_invites enable row level security;
alter table public.posts enable row level security;
alter table public.events enable row level security;
alter table public.event_rsvps enable row level security;
alter table public.photos enable row level security;
alter table public.comments enable row level security;
alter table public.reviews enable row level security;
alter table public.contact_requests enable row level security;
alter table public.audit_log enable row level security;

create policy "profiles: own or members" on public.profiles for select using (id = auth.uid() or public.is_member());
create policy "profiles: edit self" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles: admin" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

create policy "invites: admin" on public.role_invites for all using (public.is_admin()) with check (public.is_admin());

create policy "posts: published" on public.posts for select using (status = 'published' and published_at <= now());
create policy "posts: editors" on public.posts for all using (public.is_editor()) with check (public.is_editor());

create policy "events: public" on public.events for select using (visibility = 'public' and status = 'published');
create policy "events: members" on public.events for select using (public.is_member());
create policy "events: editors" on public.events for all using (public.is_editor()) with check (public.is_editor());

create policy "rsvp: own" on public.event_rsvps for all using (user_id = auth.uid() and public.is_member()) with check (user_id = auth.uid() and public.is_member());
create policy "rsvp: editors read" on public.event_rsvps for select using (public.is_editor());

create policy "photos: approved or own" on public.photos for select using (status = 'approved' or uploaded_by = auth.uid() or public.is_editor());
create policy "photos: members add" on public.photos for insert with check (public.is_member() and uploaded_by = auth.uid() and status = 'pending');
create policy "photos: editors" on public.photos for all using (public.is_editor()) with check (public.is_editor());

create policy "comments: approved or own" on public.comments for select using (status = 'approved' or author_id = auth.uid() or public.is_editor());
create policy "comments: signed in write" on public.comments for insert with check (
  auth.uid() is not null and author_id = auth.uid()
  and status = case when public.is_member() then 'approved'::public.mod_status else 'pending'::public.mod_status end
);
create policy "comments: editors" on public.comments for all using (public.is_editor()) with check (public.is_editor());

-- Відгуки і заявки може надіслати будь-хто; бачать і модерують редактори
create policy "reviews: approved public" on public.reviews for select using (status = 'approved' and consent_publish);
create policy "reviews: anyone sends" on public.reviews for insert with check (status = 'pending');
create policy "reviews: editors" on public.reviews for all using (public.is_editor()) with check (public.is_editor());

create policy "requests: anyone sends" on public.contact_requests for insert with check (true);
create policy "requests: editors read" on public.contact_requests for select using (public.is_editor());
create policy "requests: editors delete" on public.contact_requests for delete using (public.is_editor());

create policy "audit: editors read" on public.audit_log for select using (public.is_editor());
create policy "audit: editors write" on public.audit_log for insert with check (public.is_editor());

-- Обмеження частоти коментарів: до 5 за хвилину
create or replace function public.comments_rate_limit() returns trigger language plpgsql as $$
begin
  if (select count(*) from public.comments where author_id = new.author_id and created_at > now() - interval '1 minute') >= 5 then
    raise exception 'Too many comments, try again in a minute';
  end if;
  return new;
end $$;
create trigger comments_rate_limit before insert on public.comments for each row execute function public.comments_rate_limit();

-- Доступ через Data API
grant usage on schema public to anon, authenticated;
grant select on public.posts, public.events, public.photos, public.comments, public.reviews to anon, authenticated;
grant insert on public.reviews, public.contact_requests to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;
grant execute on function public.my_role, public.is_member, public.is_editor, public.is_admin to anon, authenticated;

-- ---------- Storage: публічні фото ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('public-media', 'public-media', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;
create policy "media: read all" on storage.objects for select using (bucket_id = 'public-media');
create policy "media: members upload" on storage.objects for insert to authenticated with check (bucket_id = 'public-media' and public.is_member());
create policy "media: editors delete" on storage.objects for delete to authenticated using (bucket_id = 'public-media' and public.is_editor());
