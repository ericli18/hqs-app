
--Location seeding
INSERT INTO public.locations (name)
VALUES
('Fremont'),
('Austin'),
('Germany');

--Employees seeding and shifts seeding 
INSERT INTO public.clock_types (label)
VALUES
('CLOCK_IN'),
('CLOCK_OUT'),
('LUNCH_IN'),
('LUNCH_OUT');

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
    INSERT INTO public.clocks (employee_id, supervisor_id, clock_type, clock_time, location_id)
    VALUES
    ( user_id_jane, user_id_eric, 1, '2024-06-09 08:08:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-09 11:15:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-09 12:06:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-09 16:08:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-06-07 23:58:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-08 02:55:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-08 03:50:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-08 07:52:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-06-05 07:51:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-05 10:42:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-05 11:45:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-05 15:48:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-06-09 07:52:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-09 10:59:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-09 12:03:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-09 15:59:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-06-05 16:07:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-06-05 19:17:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-06-05 20:17:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-06-06 00:17:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-06-03 00:00:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-06-03 03:07:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-06-03 04:09:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-06-03 07:52:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-06-05 15:55:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-05 18:56:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-05 19:51:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-06 00:01:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-06-08 07:56:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-06-08 10:46:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-06-08 11:53:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-06-08 16:04:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-06-09 07:59:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-09 11:04:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-09 11:59:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-09 15:59:00-05:00', 1);
 END
$$;

