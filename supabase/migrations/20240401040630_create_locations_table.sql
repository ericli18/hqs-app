
create table
locations
(
    location_id smallint primary key generated always as identity,
    name text,
    created_at timestamptz default now()
)