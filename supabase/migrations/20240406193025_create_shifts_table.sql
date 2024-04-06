CREATE TABLE IF NOT EXISTS 
shifts
(
    shift_id bigint primary key generated always as identity,
    start_time timestamptz,
    end_time timestamptz
)

