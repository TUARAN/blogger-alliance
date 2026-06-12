-- 内部业务数据表：替代 Cloudflare D1，统一存放在 Supabase Postgres。
create table if not exists public.commercial_deals (
  id text primary key,
  brand text not null,
  service text not null,
  progress text not null,
  remark text not null default '',
  category text not null default '',
  referrer text not null default '',
  owner text not null default '',
  updated_at text not null default '',
  muted boolean not null default false,
  report_cooperation_id text not null default '',
  sort_order integer not null default 0
);

create index if not exists idx_commercial_deals_updated_at
  on public.commercial_deals(updated_at desc);

create table if not exists public.promotion_reports (
  id text primary key,
  title text not null,
  article_title text not null default '',
  project text not null,
  author text not null,
  period text not null default '',
  published_at text not null default '',
  cooperation_id text not null default '',
  platforms jsonb not null default '[]'::jsonb,
  stats jsonb not null default '{}'::jsonb,
  platform_stats jsonb not null default '{}'::jsonb,
  author_sections jsonb not null default '[]'::jsonb,
  content text not null,
  sort_order integer not null default 0
);

create index if not exists idx_promotion_reports_published_at
  on public.promotion_reports(published_at desc);

create index if not exists idx_promotion_reports_cooperation_id
  on public.promotion_reports(cooperation_id);

create table if not exists public.annual_reports (
  year integer primary key,
  partners jsonb not null default '[]'::jsonb,
  summary_cards jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  intro text not null default '',
  updated_at text not null default ''
);

alter table public.commercial_deals enable row level security;
alter table public.promotion_reports enable row level security;
alter table public.annual_reports enable row level security;

create or replace function public.current_app_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((
    select role
    from public.profiles
    where id = auth.uid()
    limit 1
  ), 'member')
$$;

create or replace function public.can_read_internal_data()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() in ('internal', 'admin')
$$;

create or replace function public.can_manage_internal_data()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.current_app_role() = 'admin'
$$;

drop policy if exists "commercial_deals_select_internal" on public.commercial_deals;
create policy "commercial_deals_select_internal"
  on public.commercial_deals
  for select
  to authenticated
  using (public.can_read_internal_data());

drop policy if exists "commercial_deals_manage_admin" on public.commercial_deals;
create policy "commercial_deals_manage_admin"
  on public.commercial_deals
  for all
  to authenticated
  using (public.can_manage_internal_data())
  with check (public.can_manage_internal_data());

drop policy if exists "promotion_reports_select_internal" on public.promotion_reports;
create policy "promotion_reports_select_internal"
  on public.promotion_reports
  for select
  to authenticated
  using (public.can_read_internal_data());

drop policy if exists "promotion_reports_manage_admin" on public.promotion_reports;
create policy "promotion_reports_manage_admin"
  on public.promotion_reports
  for all
  to authenticated
  using (public.can_manage_internal_data())
  with check (public.can_manage_internal_data());

drop policy if exists "annual_reports_select_internal" on public.annual_reports;
create policy "annual_reports_select_internal"
  on public.annual_reports
  for select
  to authenticated
  using (public.can_read_internal_data());

drop policy if exists "annual_reports_manage_admin" on public.annual_reports;
create policy "annual_reports_manage_admin"
  on public.annual_reports
  for all
  to authenticated
  using (public.can_manage_internal_data())
  with check (public.can_manage_internal_data());

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
    ordinality::integer - 1
  from jsonb_array_elements(records) with ordinality as item(record, ordinality);

  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;

create or replace function public.replace_promotion_reports(records jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_count integer := 0;
begin
  if jsonb_typeof(records) <> 'array' then
    raise exception 'REPORTS_PAYLOAD_MUST_BE_ARRAY';
  end if;

  delete from public.promotion_reports;

  insert into public.promotion_reports (
    id,
    title,
    article_title,
    project,
    author,
    period,
    published_at,
    cooperation_id,
    platforms,
    stats,
    platform_stats,
    author_sections,
    content,
    sort_order
  )
  select
    trim(record ->> 'id'),
    trim(record ->> 'title'),
    coalesce(trim(record ->> 'articleTitle'), ''),
    trim(record ->> 'project'),
    trim(record ->> 'author'),
    coalesce(trim(record ->> 'period'), ''),
    coalesce(trim(record ->> 'publishedAt'), ''),
    coalesce(trim(record ->> 'cooperationId'), ''),
    case when jsonb_typeof(record -> 'platforms') = 'array' then record -> 'platforms' else '[]'::jsonb end,
    case when jsonb_typeof(record -> 'stats') = 'object' then record -> 'stats' else '{}'::jsonb end,
    case when jsonb_typeof(record -> 'platformStats') = 'object' then record -> 'platformStats' else '{}'::jsonb end,
    case when jsonb_typeof(record -> 'authorSections') = 'array' then record -> 'authorSections' else '[]'::jsonb end,
    record ->> 'content',
    ordinality::integer - 1
  from jsonb_array_elements(records) with ordinality as item(record, ordinality);

  get diagnostics inserted_count = row_count;
  return inserted_count;
end;
$$;

create or replace function public.replace_annual_reports(records jsonb)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  inserted_count integer := 0;
begin
  if jsonb_typeof(records) <> 'array' then
    raise exception 'ANNUAL_REPORTS_PAYLOAD_MUST_BE_ARRAY';
  end if;

  delete from public.annual_reports;

  insert into public.annual_reports (
    year,
    partners,
    summary_cards,
    highlights,
    intro,
    updated_at
  )
  select
    (record ->> 'year')::integer,
    case when jsonb_typeof(record -> 'partners') = 'array' then record -> 'partners' else '[]'::jsonb end,
    case when jsonb_typeof(record -> 'summaryCards') = 'array' then record -> 'summaryCards' else '[]'::jsonb end,
    case when jsonb_typeof(record -> 'highlights') = 'array' then record -> 'highlights' else '[]'::jsonb end,
    coalesce(trim(record ->> 'intro'), ''),
    coalesce(trim(record ->> 'updatedAt'), '')
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
    'annualReports', (select count(*) from public.annual_reports)
  )
$$;

revoke all on function public.replace_commercial_deals(jsonb) from public, anon, authenticated;
revoke all on function public.replace_promotion_reports(jsonb) from public, anon, authenticated;
revoke all on function public.replace_annual_reports(jsonb) from public, anon, authenticated;
revoke all on function public.get_internal_data_counts() from public, anon, authenticated;

grant execute on function public.replace_commercial_deals(jsonb) to service_role;
grant execute on function public.replace_promotion_reports(jsonb) to service_role;
grant execute on function public.replace_annual_reports(jsonb) to service_role;
grant execute on function public.get_internal_data_counts() to service_role;
