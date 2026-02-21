-- ===========================================================
-- KittyType – Supabase Migration
-- Run this in your Supabase SQL Editor
-- ===========================================================

-- ── EXTENSIONS ──────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ── USERS ───────────────────────────────────────────────────
-- Mirrors Supabase Auth; extra profile columns live here.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  username    text unique not null,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-create a profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── TEST RESULTS ─────────────────────────────────────────────
create table if not exists public.test_results (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references public.profiles (id) on delete cascade,
  wpm           integer not null check (wpm >= 0),
  accuracy      integer not null check (accuracy between 0 and 100),
  correct_chars integer not null check (correct_chars >= 0),
  total_chars   integer not null check (total_chars >= 0),
  errors        integer generated always as (total_chars - correct_chars) stored,
  difficulty    text not null check (difficulty in ('easy', 'medium', 'hard')),
  duration      integer not null check (duration in (15, 30, 60)),
  played_at     timestamptz not null default now()
);

-- Index for fast leaderboard queries
create index if not exists test_results_wpm_idx    on public.test_results (wpm desc);
create index if not exists test_results_user_idx   on public.test_results (user_id);
create index if not exists test_results_played_idx on public.test_results (played_at desc);

-- ── LEADERBOARD VIEWS ────────────────────────────────────────

-- All-time best WPM per user per difficulty
create or replace view public.leaderboard_alltime as
select distinct on (tr.user_id, tr.difficulty)
  tr.id,
  tr.user_id,
  p.username,
  p.avatar_url,
  tr.wpm,
  tr.accuracy,
  tr.difficulty,
  tr.played_at
from public.test_results tr
join public.profiles p on p.id = tr.user_id
order by tr.user_id, tr.difficulty, tr.wpm desc;

-- Daily best WPM per user per difficulty
create or replace view public.leaderboard_daily as
select distinct on (tr.user_id, tr.difficulty)
  tr.id,
  tr.user_id,
  p.username,
  p.avatar_url,
  tr.wpm,
  tr.accuracy,
  tr.difficulty,
  tr.played_at
from public.test_results tr
join public.profiles p on p.id = tr.user_id
where tr.played_at >= current_date
order by tr.user_id, tr.difficulty, tr.wpm desc;

-- ── ROW LEVEL SECURITY ───────────────────────────────────────
alter table public.profiles     enable row level security;
alter table public.test_results enable row level security;

-- Profiles: anyone can read, only owner can update
create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Test results: anyone can read, only owner can insert/delete
create policy "Test results are viewable by everyone"
  on public.test_results for select using (true);

create policy "Authenticated users can insert own results"
  on public.test_results for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own results"
  on public.test_results for delete using (auth.uid() = user_id);
