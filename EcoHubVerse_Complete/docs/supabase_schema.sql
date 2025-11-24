-- Supabase SQL schema
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp default now()
);

create table posts (
  id serial primary key,
  title text,
  content text,
  author text,
  created_at timestamp default now()
);

create table products (
  id serial primary key,
  name text,
  price numeric,
  eco_score integer default 0,
  carbon_footprint numeric default 0,
  created_at timestamp default now()
);

-- Gamification tables
create table user_gamification (
  user_id uuid primary key references users(id),
  level integer default 1,
  points integer default 0,
  rank text default 'Beginner',
  carbon_saved numeric default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table badges (
  id serial primary key,
  name text not null,
  description text,
  icon text,
  points_required integer default 0,
  created_at timestamp default now()
);

create table user_badges (
  user_id uuid references users(id),
  badge_id integer references badges(id),
  earned_at timestamp default now(),
  primary key (user_id, badge_id)
);

create table user_actions (
  id serial primary key,
  user_id uuid references users(id),
  action_type text not null,
  points_earned integer default 0,
  metadata jsonb,
  created_at timestamp default now()
);

-- EcoTokens tables
create table ecotoken_balances (
  user_id uuid primary key references users(id),
  balance numeric default 0,
  currency text default 'ECO',
  level text default 'Bronze',
  carbon_offset numeric default 0,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table ecotoken_transactions (
  id serial primary key,
  transaction_id text unique not null,
  from_user uuid references users(id),
  to_user uuid references users(id),
  amount numeric not null,
  transaction_type text,
  status text default 'pending',
  carbon_saved numeric default 0,
  created_at timestamp default now()
);

create table green_nfts (
  id text primary key,
  name text not null,
  description text,
  owner_id uuid references users(id),
  carbon_impact numeric default 0,
  mint_date timestamp default now(),
  metadata jsonb
);

-- AI Moderation tables
create table moderation_logs (
  id serial primary key,
  content_id text,
  content_type text,
  is_safe boolean default true,
  sentiment text,
  confidence numeric,
  categories jsonb,
  created_at timestamp default now()
);

create table community_summaries (
  id serial primary key,
  summary_text text,
  key_topics text[],
  sentiment text,
  action_items text[],
  period_start timestamp,
  period_end timestamp,
  created_at timestamp default now()
);

-- Recommendations tables
create table user_preferences (
  user_id uuid primary key references users(id),
  preferred_categories text[],
  interests text[],
  eco_level text default 'beginner',
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table recommendation_history (
  id serial primary key,
  user_id uuid references users(id),
  item_type text not null,
  item_id integer not null,
  score numeric,
  shown_at timestamp default now(),
  clicked boolean default false
);
