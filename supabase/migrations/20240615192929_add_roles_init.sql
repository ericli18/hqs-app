create table
roles
(
    role_id smallint primary key generated always as identity,
    name text,
    created_at timestamptz default now()
);

ALTER TABLE IF EXISTS public.employees
ADD COLUMN role smallint;

ALTER TABLE public.employees
ADD CONSTRAINT fk_role
FOREIGN KEY (role) REFERENCES public.roles(role_id);
