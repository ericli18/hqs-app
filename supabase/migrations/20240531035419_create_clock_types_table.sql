CREATE TABLE IF NOT EXISTS
clock_types (
    clock_type_id smallint primary key generated always as identity,
    label text
)