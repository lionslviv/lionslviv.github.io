-- Lions Club Lviv Leopolis: початкова схема (етап 2, коли підключаємо Supabase)
-- Ролі: user < member < editor < admin. RLS увімкнено на всіх таблицях.

create type public.app_role as enum ('user', 'member', 'editor', 'admin');
create type public.post_type as enum ('news', 'project');
create type public.post_status as enum ('draft', 'scheduled', 'published');
create type public.visibility as enum ('public', 'members');
create type public.mod_status as enum ('pending', 'approved', 'hidden', 'private');
create type public.rsvp_status as enum ('yes', 'no', 'maybe');
create type public.review_kind as enum ('partner', 'beneficiary', 'volunteer', 'guest');

-- ---------- профілі ----------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  slug text unique,
  full_name_uk text not null default '',
  full_name_en text,
  role public.app_role not null default 'user',
  club_position text,
  profession text,
  bio_uk text check (char_length(bio_uk) <= 300),
  bio_en text check (char_length(bio_en) <= 300),
  quote text check (char_length(quote) <= 140),
  photo_path text,
  joined_year int,
  linkedin_url text,
  phone text,              -- бачать лише члени клубу (див. view members_public)
  is_public boolean not null default false,
  trusted_commenter boolean not null default false,
  created_at timestamptz not null default now()
);

-- Хелпери ролей (security definer, щоб уникнути рекурсії RLS)
create or replace function public.current_role() returns public.app_role
language sql stable security definer set search_path = public as $$
  select coalesce((select role from public.profiles where id = auth.uid()), 'user'::public.app_role)
$$;
create or replace function public.is_member() returns boolean language sql stable as $$ select public.current_role() in ('member', 'editor', 'admin') $$;
create or replace function public.is_editor() returns boolean language sql stable as $$ select public.current_role() in ('editor', 'admin') $$;
create or replace function public.is_admin() returns boolean language sql stable as $$ select public.current_role() = 'admin' $$;

-- Профіль створюється автоматично після реєстрації (роль user)
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name_uk) values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Публічний вигляд профілю без контактів
create view public.members_public with (security_invoker = true) as
  select id, slug, full_name_uk, full_name_en, club_position, profession, bio_uk, bio_en, quote, photo_path, joined_year, linkedin_url
  from public.profiles where is_public and role in ('member', 'editor', 'admin');

-- ---------- контент ----------
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  type public.post_type not null default 'news',
  slug text unique not null,
  title_uk text not null, title_en text,
  excerpt_uk text, excerpt_en text,
  body_uk jsonb, body_en jsonb,           -- Tiptap JSON
  cover_path text,
  tags text[] not null default '{}',
  status public.post_status not null default 'draft',
  published_at timestamptz,
  author_id uuid references public.profiles (id),
  seo jsonb, project_stats jsonb,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_uk text not null, title_en text,
  description_uk text, description_en text,
  starts_at timestamptz not null, ends_at timestamptz,
  rrule text,                              -- напр. FREQ=WEEKLY;INTERVAL=2;BYDAY=TU
  location_name text, address text, map_url text,
  visibility public.visibility not null default 'public',
  cover_path text,
  status public.post_status not null default 'published',
  created_at timestamptz not null default now()
);

create table public.event_rsvps (
  event_id uuid references public.events (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete cascade,
  status public.rsvp_status not null,
  primary key (event_id, user_id)
);

create table public.albums (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title_uk text not null, title_en text,
  event_id uuid references public.events (id) on delete set null,
  cover_photo_id uuid,
  visibility public.visibility not null default 'public',
  created_at timestamptz not null default now()
);

create table public.photos (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums (id) on delete cascade,
  storage_path text not null,
  width int, height int, blurhash text,
  caption_uk text, caption_en text,
  uploaded_by uuid references public.profiles (id),
  status public.mod_status not null default 'pending',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  target_type text not null check (target_type in ('post', 'album')),
  target_id uuid not null,
  parent_id uuid references public.comments (id) on delete cascade,
  author_id uuid not null references public.profiles (id) on delete cascade default auth.uid(),
  body text not null check (char_length(body) between 2 and 1500),
  status public.mod_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  author_name text not null,
  author_kind public.review_kind not null default 'guest',
  body text not null check (char_length(body) <= 1200),
  rating int check (rating between 1 and 5),
  consent_publish boolean not null default false,
  email text,                               -- не публікується
  status public.mod_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('join', 'contact')),
  name text not null, email text not null, message text not null,
  created_at timestamptz not null default now()
);

create table public.pages (slug text primary key, blocks_uk jsonb, blocks_en jsonb, updated_at timestamptz default now());
create table public.settings (key text primary key, value jsonb);
create table public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid default auth.uid(), action text not null, entity text, entity_id text, diff jsonb, at timestamptz default now()
);

-- ---------- RLS ----------
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.events enable row level security;
alter table public.event_rsvps enable row level security;
alter table public.albums enable row level security;
alter table public.photos enable row level security;
alter table public.comments enable row level security;
alter table public.reviews enable row level security;
alter table public.contact_requests enable row level security;
alter table public.pages enable row level security;
alter table public.settings enable row level security;
alter table public.audit_log enable row level security;

-- profiles
create policy "profiles: члени бачать членів" on public.profiles for select using (public.is_member() or id = auth.uid());
create policy "profiles: редагую себе" on public.profiles for update using (id = auth.uid())
  with check (id = auth.uid() and role = (select role from public.profiles where id = auth.uid())); -- роль не змінити самому
create policy "profiles: адмін керує" on public.profiles for all using (public.is_admin()) with check (public.is_admin());

-- posts
create policy "posts: публічні опубліковані" on public.posts for select using (status = 'published' and published_at <= now());
create policy "posts: редактори все" on public.posts for all using (public.is_editor()) with check (public.is_editor());
create policy "posts: члени пишуть чернетки" on public.posts for insert with check (public.is_member() and status = 'draft' and author_id = auth.uid());

-- events
create policy "events: публічні" on public.events for select using (visibility = 'public' and status = 'published');
create policy "events: члени бачать закриті" on public.events for select using (public.is_member());
create policy "events: редактори" on public.events for all using (public.is_editor()) with check (public.is_editor());

-- rsvp
create policy "rsvp: свої" on public.event_rsvps for all using (user_id = auth.uid() and public.is_member()) with check (user_id = auth.uid() and public.is_member());
create policy "rsvp: редактори бачать" on public.event_rsvps for select using (public.is_editor());

-- albums / photos
create policy "albums: публічні" on public.albums for select using (visibility = 'public' or public.is_member());
create policy "albums: редактори" on public.albums for all using (public.is_editor()) with check (public.is_editor());
create policy "photos: схвалені" on public.photos for select using (status = 'approved' or uploaded_by = auth.uid() or public.is_editor());
create policy "photos: члени завантажують" on public.photos for insert with check (public.is_member() and uploaded_by = auth.uid() and status = 'pending');
create policy "photos: редактори модерують" on public.photos for update using (public.is_editor()) with check (public.is_editor());
create policy "photos: редактори видаляють" on public.photos for delete using (public.is_editor());

-- comments
create policy "comments: схвалені і свої" on public.comments for select using (status = 'approved' or author_id = auth.uid() or public.is_editor());
create policy "comments: авторизовані пишуть" on public.comments for insert with check (
  auth.uid() is not null and author_id = auth.uid()
  and status = case when public.is_member() or (select trusted_commenter from public.profiles where id = auth.uid()) then 'approved'::public.mod_status else 'pending'::public.mod_status end
);
create policy "comments: автор править 15 хв" on public.comments for update using (author_id = auth.uid() and created_at > now() - interval '15 minutes') with check (author_id = auth.uid());
create policy "comments: редактори модерують" on public.comments for all using (public.is_editor()) with check (public.is_editor());

-- reviews: вставка лише через Edge Function (service role) після перевірки Turnstile
create policy "reviews: схвалені публічні" on public.reviews for select using (status = 'approved' and consent_publish);
create policy "reviews: редактори" on public.reviews for all using (public.is_editor()) with check (public.is_editor());

-- contact requests: вставка через Edge Function, читання редакторами
create policy "requests: редактори" on public.contact_requests for select using (public.is_editor());

-- pages / settings
create policy "pages: читання" on public.pages for select using (true);
create policy "pages: адмін" on public.pages for all using (public.is_admin()) with check (public.is_admin());
create policy "settings: читання" on public.settings for select using (true);
create policy "settings: адмін" on public.settings for all using (public.is_admin()) with check (public.is_admin());

-- audit
create policy "audit: адмін читає" on public.audit_log for select using (public.is_admin());
create policy "audit: редактори пишуть" on public.audit_log for insert with check (public.is_editor());

-- Rate limit коментарів: не більше 5 за хвилину від користувача
create or replace function public.comments_rate_limit() returns trigger language plpgsql as $$
begin
  if (select count(*) from public.comments where author_id = new.author_id and created_at > now() - interval '1 minute') >= 5 then
    raise exception 'Забагато коментарів. Спробуйте за хвилину.';
  end if;
  return new;
end $$;
create trigger comments_rate_limit before insert on public.comments for each row execute function public.comments_rate_limit();

-- Storage: бакети для медіа
insert into storage.buckets (id, name, public) values ('public-media', 'public-media', true), ('members-media', 'members-media', false)
on conflict (id) do nothing;
create policy "media: члени завантажують" on storage.objects for insert to authenticated
  with check (bucket_id in ('public-media', 'members-media') and public.is_member());
create policy "media: члени бачать закрите" on storage.objects for select to authenticated
  using (bucket_id = 'members-media' and public.is_member());
create policy "media: редактори видаляють" on storage.objects for delete to authenticated
  using (bucket_id in ('public-media', 'members-media') and public.is_editor());
