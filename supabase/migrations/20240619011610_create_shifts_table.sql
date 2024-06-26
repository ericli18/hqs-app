create table public.shifts (
    shift_id bigint primary key generated always as identity,
    start_time timestamptz NOT NULL,
    end_time timestamptz NOT NULL,
    location smallint NOT NULL
);

ALTER TABLE public.shifts
ADD CONSTRAINT fk_location
FOREIGN KEY (location) REFERENCES public.locations(location_id);

