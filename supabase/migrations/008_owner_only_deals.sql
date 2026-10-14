-- 站长私有合作：非 admin 不能通过直接查询或 Worker 读取整条记录。
alter table public.commercial_deals
  add column if not exists owner_only boolean not null default false;

drop policy if exists "commercial_deals_select_internal" on public.commercial_deals;
create policy "commercial_deals_select_internal"
  on public.commercial_deals
  for select
  to authenticated
  using (public.can_read_internal_data() and (not owner_only or public.current_app_role() = 'admin'));

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
    id, brand, service, progress, remark, category, referrer, owner,
    updated_at, muted, owner_only, report_cooperation_id, settlement_cipher, sort_order
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
    coalesce((record ->> 'ownerOnly')::boolean, false),
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
