-- Контакти членів клубу на сторінках профілів: бачать лише члени клубу (member, editor, admin).
--
-- Хто що робить:
--  * член клубу сам заповнює свої контакти в кабінеті і вмикає «показувати членам клубу»;
--  * редактор у адмінці привʼязує акаунт до профілю на сайті (member_slug, напр. 'lars-vestbjerg');
--  * сторінка профілю викликає member_contacts(slug): функція повертає дані лише члену клубу
--    і лише якщо власник увімкнув показ. Самі профілі іншим членам, як і раніше, не видно.

alter table public.profiles
  add column if not exists member_slug text unique check (member_slug ~ '^[a-z0-9-]{2,64}$'),
  add column if not exists phone text check (char_length(phone) <= 40),
  add column if not exists contact_email text check (char_length(contact_email) <= 120),
  add column if not exists telegram text check (char_length(telegram) <= 64),
  add column if not exists linkedin text check (char_length(linkedin) <= 200),
  add column if not exists show_contacts boolean not null default false;

-- Привʼязку до профілю на сайті змінює лише редактор через set_member_slug().
create or replace function public.protect_role() returns trigger
language plpgsql security invoker set search_path = public as $$
begin
  if current_user in ('postgres', 'service_role', 'supabase_admin') then
    return new;
  end if;
  if new.role is distinct from old.role and not public.is_admin() then
    new.role := old.role;
  end if;
  if new.email is distinct from old.email then
    new.email := old.email;
  end if;
  if new.member_slug is distinct from old.member_slug then
    new.member_slug := old.member_slug;
  end if;
  return new;
end $$;

create or replace function public.set_member_slug(p_profile uuid, p_slug text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_editor() then
    raise exception 'Only editors can link profiles' using errcode = '42501';
  end if;
  update public.profiles set member_slug = nullif(lower(trim(p_slug)), '') where id = p_profile;
end $$;

create or replace function public.member_contacts(p_slug text)
returns table (full_name text, phone text, contact_email text, telegram text, linkedin text)
language sql stable security definer set search_path = public as $$
  select p.full_name, p.phone, p.contact_email, p.telegram, p.linkedin
  from public.profiles p
  where public.is_member() and p.show_contacts and p.member_slug = p_slug
$$;

revoke all on function public.set_member_slug(uuid, text) from public, anon;
revoke all on function public.member_contacts(text) from public, anon;
grant execute on function public.set_member_slug(uuid, text) to authenticated;
grant execute on function public.member_contacts(text) to authenticated;
