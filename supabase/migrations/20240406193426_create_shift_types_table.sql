CREATE TABLE IF NOT EXISTS 
shift_types
(
    shift_type_id smallint primary key generated always as identity,
    label text
)

