insert into public.groups (
  name,
  leader_name,
  campus,
  meeting_day,
  meeting_time,
  capacity,
  current_size,
  accepting_members,
  accepting_shadow_leaders,
  status
)
values
  ('Young Families East', 'Angela Ruiz', 'East Campus', 'Thursday', '7:00 PM', 12, 8, true, true, 'active'),
  ('Men''s Tuesday Night', 'David Brooks', 'Central Campus', 'Tuesday', '7:00 PM', 10, 10, false, false, 'full'),
  ('Women''s Morning Circle', 'Rachel Kim', 'North Campus', 'Wednesday', '9:30 AM', 14, 9, true, false, 'active');

with created_people as (
  insert into public.people (first_name, last_name, email, phone, campus, life_stage, notes)
  values
    ('Maria', 'Johnson', 'maria@example.com', '555-0101', 'East Campus', 'Young Family', 'Looking for a weekday evening group.'),
    ('Nathan', 'Lee', 'nathan@example.com', '555-0102', 'Central Campus', 'Adult', 'Interested in leadership and open to shadowing.'),
    ('Chris', 'Benton', 'chris@example.com', '555-0103', 'North Campus', 'Adult', 'Feels ready to launch a new group this fall.')
  returning id, first_name
),
created_journeys as (
  insert into public.journeys (person_id, type, status, source, next_follow_up_at)
  select
    id,
    case
      when first_name = 'Maria' then 'join_group'
      else 'leader_interest'
    end,
    case
      when first_name = 'Maria' then 'matching'
      when first_name = 'Nathan' then 'shadowing'
      else 'ready_to_launch'
    end,
    'seed',
    now() + interval '2 days'
  from created_people
  returning id, person_id, type
)
insert into public.tasks (person_id, journey_id, title, task_type, status, due_at)
select
  person_id,
  id,
  case
    when type = 'join_group' then 'Reach out with 2 nearby group options'
    else 'Schedule leadership follow-up conversation'
  end,
  'follow_up',
  'open',
  now() + interval '2 days'
from created_journeys;

insert into public.notes (person_id, journey_id, note_type, body)
select
  j.person_id,
  j.id,
  'note',
  case
    when j.type = 'join_group' then 'Seed note: interested in joining a current group.'
    else 'Seed note: leadership conversation started.'
  end
from public.journeys j
where j.source = 'seed';
