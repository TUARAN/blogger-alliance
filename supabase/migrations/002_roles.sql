-- 为 profiles 增加角色字段：member（默认）/ internal（可读内部数据）/ admin（可管理）
alter table public.profiles
  add column if not exists role text not null default 'member';

alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('member', 'internal', 'admin'));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)),
    'member'
  );
  return new;
end;
$$;

-- 可选：将指定邮箱提升为 admin（按需修改邮箱后执行）
-- update public.profiles set role = 'admin' where email = 'you@example.com';
