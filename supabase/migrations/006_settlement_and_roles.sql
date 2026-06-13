-- 数据台账改造：结算字段级加密 + 新增 manager（普通管理员）角色
--
-- 1) commercial_deals 增加 settlement_cipher：只存密文信封（AES-256-GCM），
--    服务端 / DB / service-role 都只看得到密文，没有密码短语无法还原明文。
-- 2) 新增角色 manager：可维护台账、查看内部数据，但看不到结算金额（解密由密码短语把守）。
--    角色等级：member(0) < internal(1) < manager(2) < admin(3)。

-- ---- 1. 结算密文列 ----
alter table public.commercial_deals
  add column if not exists settlement_cipher text not null default '';

-- ---- 2. 放开角色约束到含 manager ----
alter table public.profiles
  drop constraint if exists profiles_role_check;

alter table public.profiles
  add constraint profiles_role_check
  check (role in ('member', 'internal', 'manager', 'admin'));

-- ---- 3. 读权限放给 manager（仍不含金额；金额是密文，且 API 仅对 admin 下发） ----
create or replace function public.can_read_internal_data()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() in ('internal', 'manager', 'admin')
$$;

-- ---- 4. 重建 replace_commercial_deals，纳入 settlement_cipher ----
create or replace function public.replace_commercial_deals(records jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_count integer := 0;
begin
  if jsonb_typeof(records) <> 'array' then
    raise exception 'DEALS_PAYLOAD_MUST_BE_ARRAY';
  end if;

  delete from public.commercial_deals;

  insert into public.commercial_deals (
    id,
    brand,
    service,
    progress,
    remark,
    category,
    referrer,
    owner,
    updated_at,
    muted,
    report_cooperation_id,
    settlement_cipher,
    sort_order
  )
  select
    trim(record ->> 'id'),
    trim(record ->> 'brand'),
    trim(record ->> 'service'),
    trim(record ->> 'progress'),
    coalesce(trim(record ->> 'remark'), ''),
    coalesce(trim(record ->> 'category'), ''),
    coalesce(trim(record ->> 'referrer'), ''),
    coalesce(trim(record ->> 'owner'), ''),
    coalesce(trim(record ->> 'updatedAt'), ''),
    coalesce((record ->> 'muted')::boolean, false),
    coalesce(trim(record ->> 'reportCooperationId'), ''),
    coalesce(record ->> 'settlement', ''),
    ordinality::integer - 1
  from jsonb_array_elements(records) with ordinality as item(record, ordinality);

  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;

revoke all on function public.replace_commercial_deals(jsonb) from public, anon, authenticated;
grant execute on function public.replace_commercial_deals(jsonb) to service_role;
