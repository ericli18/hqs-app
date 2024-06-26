--We don't want to delete these when a user gets deleted
create table public.employees (
  id uuid not null references auth.users,
  first_name text,
  last_name text,
  hqs_id text unique,
  email varchar,

  primary key (id)
);
