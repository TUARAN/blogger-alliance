-- 运营支撑半年结算总结：公开元数据 + 设备密钥密文。
-- 只有 service_role 可直接读写；Worker 仅向 admin 下发密文。

create table if not exists public.ops_support_summaries (
  id text primary key,
  title text not null,
  period text not null,
  participant_count integer not null check (participant_count > 0),
  status text not null default '',
  updated_at text not null default '',
  settlement_cipher text not null default '',
  sort_order integer not null default 0
);

alter table public.ops_support_summaries enable row level security;

create or replace function public.replace_ops_support_summaries(records jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_count integer := 0;
begin
  if jsonb_typeof(records) <> 'array' then
    raise exception 'OPS_SUMMARIES_PAYLOAD_MUST_BE_ARRAY';
  end if;

  delete from public.ops_support_summaries;

  insert into public.ops_support_summaries (
    id,
    title,
    period,
    participant_count,
    status,
    updated_at,
    settlement_cipher,
    sort_order
  )
  select
    trim(record ->> 'id'),
    trim(record ->> 'title'),
    trim(record ->> 'period'),
    (record ->> 'participantCount')::integer,
    coalesce(trim(record ->> 'status'), ''),
    coalesce(trim(record ->> 'updatedAt'), ''),
    coalesce(record ->> 'settlement', ''),
    ordinality::integer - 1
  from jsonb_array_elements(records) with ordinality as item(record, ordinality);

  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;

create or replace function public.get_internal_data_counts()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'deals', (select count(*) from public.commercial_deals),
    'reports', (select count(*) from public.promotion_reports),
    'annualReports', (select count(*) from public.annual_reports),
    'opsSupportSummaries', (select count(*) from public.ops_support_summaries)
  )
$$;

revoke all on table public.ops_support_summaries from public, anon, authenticated;
grant select on table public.ops_support_summaries to service_role;
revoke all on function public.replace_ops_support_summaries(jsonb) from public, anon, authenticated;
grant execute on function public.replace_ops_support_summaries(jsonb) to service_role;
revoke all on function public.get_internal_data_counts() from public, anon, authenticated;
grant execute on function public.get_internal_data_counts() to service_role;
