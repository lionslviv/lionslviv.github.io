-- Виправлення безпеки після ревʼю (26.11.2026).

-- 1) protect_role був security definer: усередині current_user = власник функції (postgres),
--    тож перевірка ніколи не спрацьовувала і користувач міг сам підняти собі роль.
--    Тепер функція працює з правами того, хто викликає (security invoker).
--    Заодно забороняємо змінювати email у профілі: email береться лише з auth.users.
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
  return new;
end $$;

-- 2) Запрошення застосовуємо за справжнім email з auth.users, а не за полем профілю.
create or replace function public.apply_invite() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  update public.profiles p set role = new.role
  from auth.users u
  where u.id = p.id and lower(u.email) = lower(new.email);
  return new;
end $$;

-- 3) Імʼя автора коментаря задає база (з профілю), а не браузер.
create or replace function public.set_comment_author() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  select coalesce(nullif(p.full_name, ''), split_part(coalesce(p.email, ''), '@', 1), '')
    into new.author_name
  from public.profiles p where p.id = new.author_id;
  return new;
end $$;
drop trigger if exists comments_set_author on public.comments;
create trigger comments_set_author before insert on public.comments for each row execute function public.set_comment_author();

-- 4) Профілі (з email) бачать лише власник і редактори/адміни, а не всі члени клубу.
drop policy if exists "profiles: own or members" on public.profiles;
create policy "profiles: own or editors" on public.profiles for select using (id = auth.uid() or public.is_editor());

-- 5) Імʼя в журналі дій теж задає база.
create or replace function public.set_audit_actor() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  new.actor_id := auth.uid();
  select coalesce(nullif(p.full_name, ''), split_part(coalesce(p.email, ''), '@', 1)) into new.actor_name
  from public.profiles p where p.id = auth.uid();
  return new;
end $$;
drop trigger if exists audit_set_actor on public.audit_log;
create trigger audit_set_actor before insert on public.audit_log for each row execute function public.set_audit_actor();
