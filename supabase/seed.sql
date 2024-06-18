
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
    ( user_id_jane, user_id_eric, 1, '2024-06-18 23:59:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-19 02:53:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-19 03:58:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-19 07:54:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-06-20 23:55:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-21 03:00:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-21 03:55:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-21 07:54:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-06-23 08:04:00-05:00', 1),
( user_id_jane, user_id_eric, 3, '2024-06-23 11:14:00-05:00', 1),
( user_id_jane, user_id_eric, 4, '2024-06-23 12:05:00-05:00', 1),
( user_id_jane, user_id_eric, 2, '2024-06-23 16:03:00-05:00', 1),
( user_id_jane, user_id_eric, 1, '2024-06-25 15:53:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-06-25 18:55:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-06-25 19:55:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-06-26 00:03:00-05:00', 3),
( user_id_jane, user_id_eric, 1, '2024-06-27 15:58:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-06-27 19:06:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-06-27 20:09:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-06-27 23:51:00-05:00', 2),
    ( user_id_john, user_id_eric, 1, '2024-06-19 08:03:00-05:00', 1),
( user_id_john, user_id_eric, 3, '2024-06-19 11:02:00-05:00', 1),
( user_id_john, user_id_eric, 4, '2024-06-19 12:10:00-05:00', 1),
( user_id_john, user_id_eric, 2, '2024-06-19 16:01:00-05:00', 1),
( user_id_john, user_id_eric, 1, '2024-06-21 16:07:00-05:00', 1),
( user_id_john, user_id_eric, 3, '2024-06-21 19:16:00-05:00', 1),
( user_id_john, user_id_eric, 4, '2024-06-21 20:16:00-05:00', 1),
( user_id_john, user_id_eric, 2, '2024-06-21 23:59:00-05:00', 1),
( user_id_john, user_id_eric, 1, '2024-06-23 00:06:00-05:00', 3),
( user_id_john, user_id_eric, 3, '2024-06-23 03:00:00-05:00', 3),
( user_id_john, user_id_eric, 4, '2024-06-23 04:10:00-05:00', 3),
( user_id_john, user_id_eric, 2, '2024-06-23 08:15:00-05:00', 3),
( user_id_john, user_id_eric, 1, '2024-06-24 23:54:00-05:00', 1),
( user_id_john, user_id_eric, 3, '2024-06-25 02:51:00-05:00', 1),
( user_id_john, user_id_eric, 4, '2024-06-25 03:55:00-05:00', 1),
( user_id_john, user_id_eric, 2, '2024-06-25 08:04:00-05:00', 1),
( user_id_john, user_id_eric, 1, '2024-06-27 08:08:00-05:00', 1),
( user_id_john, user_id_eric, 3, '2024-06-27 11:08:00-05:00', 1),
( user_id_john, user_id_eric, 4, '2024-06-27 12:15:00-05:00', 1),
( user_id_john, user_id_eric, 2, '2024-06-27 16:01:00-05:00', 1);
 END
$$;

