create table public.employees (
  id uuid not null references auth.users on delete cascade,
  first_name text,
  last_name text,
  hqs_id text,
  email varchar,

  primary key (id)
);
