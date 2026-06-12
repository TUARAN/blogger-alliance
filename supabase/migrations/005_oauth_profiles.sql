-- 支持 GitHub / Google OAuth 注册：
-- 1) 昵称从 OAuth 元数据兜底取值（GitHub: user_name/name，Google: full_name/name）
-- 2) 头像写入 avatar_url（GitHub: avatar_url，Google: picture）
-- 3) 保留管理员邮箱注册即 admin 的引导逻辑
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'display_name', ''),
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'name', ''),
      nullif(new.raw_user_meta_data ->> 'user_name', ''),
      split_part(new.email, '@', 1)
    ),
    coalesce(
      nullif(new.raw_user_meta_data ->> 'avatar_url', ''),
      nullif(new.raw_user_meta_data ->> 'picture', '')
    ),
    case when lower(new.email) = lower('tuaran666@gmail.com') then 'admin' else 'member' end
  );
  return new;
end;
$$;
