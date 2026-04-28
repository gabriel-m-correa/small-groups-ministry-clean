create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.people (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text,
  phone text,
  campus text,
  life_stage text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.journeys (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  type text not null check (type in ('join_group', 'leader_interest')),
  status text not null check (
    status in (
      'new',
      'contacted',
      'matching',
      'assigned_to_group',
      'joined',
      'discerning',
      'shadowing',
      'ready_to_launch',
      'launched',
      'not_now',
      'closed'
    )
  ),
  source text default 'website',
  outcome text,
  next_follow_up_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  leader_name text not null,
  campus text,
  meeting_day text,
  meeting_time text,
  capacity integer not null default 10,
  current_size integer not null default 0,
  accepting_members boolean not null default true,
  accepting_shadow_leaders boolean not null default false,
  status text not null default 'active' check (status in ('active', 'paused', 'full', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.group_assignments (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid not null references public.journeys(id) on delete cascade,
  group_id uuid not null references public.groups(id) on delete cascade,
  assignment_type text not null check (assignment_type in ('member', 'shadow_leader')),
  status text not null default 'proposed' check (status in ('proposed', 'active', 'completed', 'declined')),
  created_at timestamptz not null default now()
);

create table if not exists public.launch_plans (
  id uuid primary key default gen_random_uuid(),
  journey_id uuid not null references public.journeys(id) on delete cascade,
  target_area text,
  target_audience text,
  status text not null default 'planning' check (status in ('planning', 'approved', 'launched', 'paused')),
  launch_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  journey_id uuid references public.journeys(id) on delete cascade,
  title text not null,
  task_type text not null default 'follow_up' check (task_type in ('call', 'text', 'email', 'meeting', 'follow_up')),
  status text not null default 'open' check (status in ('open', 'done', 'canceled')),
  due_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references public.people(id) on delete cascade,
  journey_id uuid references public.journeys(id) on delete cascade,
  note_type text not null default 'note' check (note_type in ('note', 'call', 'text', 'email', 'meeting', 'status_change')),
  body text not null,
  created_at timestamptz not null default now()
);

drop trigger if exists people_set_updated_at on public.people;
create trigger people_set_updated_at
before update on public.people
for each row execute function public.set_updated_at();

drop trigger if exists journeys_set_updated_at on public.journeys;
create trigger journeys_set_updated_at
before update on public.journeys
for each row execute function public.set_updated_at();

drop trigger if exists groups_set_updated_at on public.groups;
create trigger groups_set_updated_at
before update on public.groups
for each row execute function public.set_updated_at();

drop trigger if exists launch_plans_set_updated_at on public.launch_plans;
create trigger launch_plans_set_updated_at
before update on public.launch_plans
for each row execute function public.set_updated_at();

drop trigger if exists tasks_set_updated_at on public.tasks;
create trigger tasks_set_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

alter table public.people enable row level security;
alter table public.journeys enable row level security;
alter table public.groups enable row level security;
alter table public.group_assignments enable row level security;
alter table public.launch_plans enable row level security;
alter table public.tasks enable row level security;
alter table public.notes enable row level security;

drop policy if exists "authenticated_people_all" on public.people;
create policy "authenticated_people_all" on public.people
for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_journeys_all" on public.journeys;
create policy "authenticated_journeys_all" on public.journeys
for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_groups_all" on public.groups;
create policy "authenticated_groups_all" on public.groups
for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_group_assignments_all" on public.group_assignments;
create policy "authenticated_group_assignments_all" on public.group_assignments
for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_launch_plans_all" on public.launch_plans;
create policy "authenticated_launch_plans_all" on public.launch_plans
for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_tasks_all" on public.tasks;
create policy "authenticated_tasks_all" on public.tasks
for all
to authenticated
using (true)
with check (true);

drop policy if exists "authenticated_notes_all" on public.notes;
create policy "authenticated_notes_all" on public.notes
for all
to authenticated
using (true)
with check (true);
