CREATE TABLE IF NOT EXISTS 
clocks
(
    clock_id bigint primary key generated always as identity,
    start_time timestamptz
)

