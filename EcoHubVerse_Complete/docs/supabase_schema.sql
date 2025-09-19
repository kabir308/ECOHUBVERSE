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
  created_at timestamp default now()
);
