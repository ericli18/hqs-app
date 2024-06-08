
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
    ( user_id_jane, user_id_eric, 1, '2024-06-05 15:50:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-06-05 18:48:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-06-05 19:41:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-06-05 23:52:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-06-07 15:52:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-06-07 18:53:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-06-07 19:52:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-06-07 23:55:00-05:00', 3),
( user_id_jane, user_id_eric, 1, '2024-06-09 08:02:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-06-09 10:57:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-06-09 11:50:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-06-09 16:11:00-05:00', 3),
( user_id_jane, user_id_eric, 1, '2024-06-11 07:50:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-06-11 10:55:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-06-11 12:01:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-06-11 15:53:00-05:00', 3),
( user_id_jane, user_id_eric, 1, '2024-06-13 07:56:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-13 10:58:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-13 11:54:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-13 15:51:00-05:00', 1),
    ( user_id_john, user_id_eric, 1, '2024-06-05 16:00:00-05:00', 3),
( user_id_john, user_id_eric, 3, '2024-06-05 18:56:00-05:00', 3),
( user_id_john, user_id_eric, 4, '2024-06-05 20:01:00-05:00', 3),
( user_id_john, user_id_eric, 2, '2024-06-06 00:02:00-05:00', 3),
( user_id_john, user_id_eric, 1, '2024-06-07 08:07:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-06-07 11:15:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-06-07 12:23:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-06-07 16:04:00-05:00', 2),
( user_id_john, user_id_eric, 1, '2024-06-09 08:09:00-05:00', 3),
( user_id_john, user_id_eric, 3, '2024-06-09 11:16:00-05:00', 3),
( user_id_john, user_id_eric, 4, '2024-06-09 12:18:00-05:00', 3),
( user_id_john, user_id_eric, 2, '2024-06-09 16:15:00-05:00', 3),
( user_id_john, user_id_eric, 1, '2024-06-11 07:59:00-05:00', 3),
( user_id_john, user_id_eric, 3, '2024-06-11 10:55:00-05:00', 3),
( user_id_john, user_id_eric, 4, '2024-06-11 11:49:00-05:00', 3),
( user_id_john, user_id_eric, 2, '2024-06-11 15:53:00-05:00', 3),
( user_id_john, user_id_eric, 1, '2024-06-12 23:54:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-06-13 02:45:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-06-13 03:41:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-06-13 07:48:00-05:00', 2);
 END
$$;

