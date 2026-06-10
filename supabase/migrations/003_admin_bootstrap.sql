-- 指定管理员邮箱：注册时自动赋予 admin 角色
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
    case when lower(new.email) = lower('tuaran666@gmail.com') then 'admin' else 'member' end
  );
  return new;
end;
$$;
