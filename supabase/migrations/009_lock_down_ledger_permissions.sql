-- 登录用户只能修改自己的昵称、头像与资料更新时间。
-- 角色由站长 API 使用 service_role 管理，不能通过 profiles 自助升级。
revoke insert, update, delete on table public.profiles from public, anon, authenticated;
grant select on table public.profiles to authenticated;
grant update (display_name, avatar_url, updated_at) on table public.profiles to authenticated;
grant select, insert, update, delete on table public.profiles to service_role;

-- RLS 管行可见性；列授权另行确保客户端不能直接取得结算密文。
-- 合作台账只能经 Git 文件同步，登录用户不直接写表。
revoke select, insert, update, delete on table public.commercial_deals from public, anon, authenticated;
grant select (
  id, brand, service, progress, remark, category, referrer, owner,
  updated_at, muted, owner_only, report_cooperation_id, sort_order
) on table public.commercial_deals to authenticated;
grant select, insert, update, delete on table public.commercial_deals to service_role;
