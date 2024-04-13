
--Location seeding
INSERT INTO public.locations (name)
VALUES
('Fremont'),
('Austin'),
('Germany');

--Shift type seeding
INSERT INTO public.shift_types (label)
VALUES
('Morning'),
('Afternoon'),
('Night');

--Employees seeding and shifts seeding 

DO $$
DECLARE
    user_id_john uuid;
    user_id_jane uuid;
    user_id_eric uuid;
BEGIN
    -- Creating users
    user_id_john := public.create_user('john@example.com', '123ABC', 'John', 'Doe', 'HQS0002', 2::smallint);
    user_id_jane := public.create_user('jane@example.com', '123ABC', 'Jane', 'Doe', 'HQS0003', 1::smallint);
    user_id_eric := public.create_user('eric@hqs.com', '123ABC', 'Eric', 'Li', 'HQS0001', 1::smallint);

    -- Assign random shifts
    INSERT INTO public.shifts (start_time, end_time, shift_type, employee_id)
    VALUES
    ('2024-04-11 00:00:00-05:00', '2024-04-11 08:00:00-05:00', 3, user_id_eric),
    ('2024-04-12 08:00:00-05:00', '2024-04-12 16:00:00-05:00', 1, user_id_eric),
    ('2024-04-11 16:00:00-05:00', '2024-04-12 00:00:00-05:00', 2, user_id_eric),
    ('2024-04-13 16:00:00-05:00', '2024-04-14 00:00:00-05:00', 2, user_id_eric),
    ('2024-04-12 16:00:00-05:00', '2024-04-13 00:00:00-05:00', 2, user_id_eric),
    ('2024-04-12 00:00:00-05:00', '2024-04-12 08:00:00-05:00', 3, user_id_eric),
    ('2024-04-14 00:00:00-05:00', '2024-04-14 08:00:00-05:00', 3, user_id_john),
    ('2024-04-09 16:00:00-05:00', '2024-04-10 00:00:00-05:00', 2, user_id_john),
    ('2024-04-12 00:00:00-05:00', '2024-04-12 08:00:00-05:00', 3, user_id_john),
    ('2024-04-11 00:00:00-05:00', '2024-04-11 08:00:00-05:00', 3, user_id_john),
    ('2024-04-10 00:00:00-05:00', '2024-04-10 08:00:00-05:00', 3, user_id_john),
    ('2024-04-12 16:00:00-05:00', '2024-04-13 00:00:00-05:00', 2, user_id_john),
    ('2024-04-12 16:00:00-05:00', '2024-04-13 00:00:00-05:00', 2, user_id_jane),
    ('2024-04-12 08:00:00-05:00', '2024-04-12 16:00:00-05:00', 1, user_id_jane),
    ('2024-04-12 16:00:00-05:00', '2024-04-13 00:00:00-05:00', 2, user_id_jane),
    ('2024-04-08 16:00:00-05:00', '2024-04-09 00:00:00-05:00', 2, user_id_jane),
    ('2024-04-10 00:00:00-05:00', '2024-04-10 08:00:00-05:00', 3, user_id_jane);
END
$$;

