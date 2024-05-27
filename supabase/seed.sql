
--Location seeding
INSERT INTO public.locations (name)
VALUES
('Fremont'),
('Austin'),
('Germany');

--Clock type seeding
INSERT INTO public.clock_types (label)
VALUES
('PUNCH_IN'),
('PUNCH_OUT'),
('LUNCH_IN'),
('LUNCH_OUT');

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
    INSERT INTO public.clocks (start_time, clock_type, employee_id)
    VALUES
    ('2024-05-30 16:07:00-05:00', 1, user_id_eric),
('2024-05-30 19:05:00-05:00', 3, user_id_eric),
('2024-05-30 20:08:00-05:00', 4, user_id_eric),
('2024-05-31 00:15:00-05:00', 2, user_id_eric),
('2024-05-28 16:00:00-05:00', 1, user_id_eric),
('2024-05-28 18:55:00-05:00', 3, user_id_eric),
('2024-05-28 19:58:00-05:00', 4, user_id_eric),
('2024-05-29 00:00:00-05:00', 2, user_id_eric),
('2024-06-01 07:50:00-05:00', 1, user_id_eric),
('2024-06-01 10:49:00-05:00', 3, user_id_eric),
('2024-06-01 11:50:00-05:00', 4, user_id_eric),
('2024-06-01 15:56:00-05:00', 2, user_id_eric),
('2024-05-31 00:10:00-05:00', 1, user_id_eric),
('2024-05-31 03:05:00-05:00', 3, user_id_eric),
('2024-05-31 04:08:00-05:00', 4, user_id_eric),
('2024-05-31 08:05:00-05:00', 2, user_id_eric),
('2024-05-30 07:54:00-05:00', 1, user_id_eric),
('2024-05-30 10:46:00-05:00', 3, user_id_eric),
('2024-05-30 11:48:00-05:00', 4, user_id_eric),
('2024-05-30 16:00:00-05:00', 2, user_id_eric),
('2024-05-27 15:58:00-05:00', 1, user_id_eric),
('2024-05-27 19:05:00-05:00', 3, user_id_eric),
('2024-05-27 19:59:00-05:00', 4, user_id_eric),
('2024-05-28 00:07:00-05:00', 2, user_id_eric),
('2024-05-28 16:05:00-05:00', 1, user_id_eric),
('2024-05-28 19:15:00-05:00', 3, user_id_eric),
('2024-05-28 20:17:00-05:00', 4, user_id_eric),
('2024-05-29 00:02:00-05:00', 2, user_id_eric),
('2024-05-31 00:01:00-05:00', 1, user_id_eric),
('2024-05-31 02:57:00-05:00', 3, user_id_eric),
('2024-05-31 03:57:00-05:00', 4, user_id_eric),
('2024-05-31 07:58:00-05:00', 2, user_id_eric),
('2024-06-01 16:00:00-05:00', 1, user_id_eric),
('2024-06-01 19:01:00-05:00', 3, user_id_eric),
('2024-06-01 19:58:00-05:00', 4, user_id_eric),
('2024-06-02 00:03:00-05:00', 2, user_id_eric);
 END
$$;

