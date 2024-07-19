CREATE TABLE IF NOT EXISTS employee_availabilities 
(
    employee_availability_id int primary key generated always as identity,
    description text NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    is_full_day_event boolean NOT NULL,
    start_time timestamptz,
    end_time timestamptz,
    rrule text NOT NULL,
    id uuid NOT NULL references public.employees ON DELETE CASCADE,
    CONSTRAINT check_dates CHECK (end_date >= start_date)
);

CREATE INDEX idx_employee_avail_dates ON employee_availabilities(start_date, end_date);
CREATE INDEX idx_employee_avail_employee ON employee_availabilities(id);