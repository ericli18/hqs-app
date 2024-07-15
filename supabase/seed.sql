
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

INSERT INTO public.roles (name)
VALUES
('admin'),
('supervisor');

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
    ( user_id_jane, user_id_eric, 1, '2024-07-17 00:02:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-07-17 02:55:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-07-17 03:57:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-07-17 08:02:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-07-19 07:50:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-07-19 10:50:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-07-19 11:47:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-07-19 15:52:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-07-21 15:59:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-07-21 18:51:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-07-21 19:49:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-07-21 23:52:00-05:00', 3),
( user_id_jane, user_id_eric, 1, '2024-07-23 08:00:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-07-23 11:06:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-07-23 12:10:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-07-23 16:00:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-07-25 00:06:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-07-25 03:10:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-07-25 04:09:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-07-25 07:56:00-05:00', 1),
    ( user_id_john, user_id_eric, 1, '2024-07-16 23:59:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-07-17 02:59:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-07-17 03:56:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-07-17 08:02:00-05:00', 2),
( user_id_john, user_id_eric, 1, '2024-07-19 07:51:00-05:00', 1),
( user_id_john, user_id_eric, 3, '2024-07-19 10:58:00-05:00', 1),
( user_id_john, user_id_eric, 4, '2024-07-19 11:50:00-05:00', 1),
( user_id_john, user_id_eric, 2, '2024-07-19 16:01:00-05:00', 1),
( user_id_john, user_id_eric, 1, '2024-07-21 16:03:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-07-21 18:53:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-07-21 19:50:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-07-22 00:01:00-05:00', 2),
( user_id_john, user_id_eric, 1, '2024-07-23 00:04:00-05:00', 3),
( user_id_john, user_id_eric, 3, '2024-07-23 02:55:00-05:00', 3),
( user_id_john, user_id_eric, 4, '2024-07-23 03:50:00-05:00', 3),
( user_id_john, user_id_eric, 2, '2024-07-23 08:09:00-05:00', 3),
( user_id_john, user_id_eric, 1, '2024-07-25 08:01:00-05:00', 1),
( user_id_john, user_id_eric, 3, '2024-07-25 11:00:00-05:00', 1),
( user_id_john, user_id_eric, 4, '2024-07-25 11:53:00-05:00', 1),
( user_id_john, user_id_eric, 2, '2024-07-25 16:10:00-05:00', 1);
 END
$$;

