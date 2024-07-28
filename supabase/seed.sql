
--Location seeding
INSERT INTO public.locations (name, timezone)
VALUES
('Fremont', 'America/Los_Angeles'),
('Livermore', 'America/Los_Angeles'),
('Lathrop', 'America/Los_Angeles'),
('GFTX', 'America/Chicago'),
('Kyle', 'America/Chicago'),
('Brussels', 'Europe/Brussels');

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
    ( user_id_jane, user_id_eric, 1, '2024-07-31 15:53:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-07-31 18:44:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-07-31 19:52:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-07-31 23:44:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-08-02 07:54:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-08-02 10:50:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-08-02 11:41:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-08-02 15:47:00-05:00', 3),
( user_id_jane, user_id_eric, 1, '2024-08-04 07:51:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-08-04 11:00:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-08-04 12:05:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-08-04 15:51:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-08-06 16:00:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-08-06 18:52:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-08-06 19:44:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-08-06 23:56:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-08-08 15:52:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-08-08 19:00:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-08-08 20:07:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-08-08 23:59:00-05:00', 3),
    ( user_id_john, user_id_eric, 1, '2024-07-30 23:54:00-05:00', 1),
( user_id_john, user_id_eric, 3, '2024-07-31 02:56:00-05:00', 1),
( user_id_john, user_id_eric, 4, '2024-07-31 03:59:00-05:00', 1),
( user_id_john, user_id_eric, 2, '2024-07-31 08:03:00-05:00', 1),
( user_id_john, user_id_eric, 1, '2024-08-02 08:10:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-08-02 11:13:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-08-02 12:06:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-08-02 16:04:00-05:00', 2),
( user_id_john, user_id_eric, 1, '2024-08-04 00:09:00-05:00', 3),
( user_id_john, user_id_eric, 3, '2024-08-04 03:12:00-05:00', 3),
( user_id_john, user_id_eric, 4, '2024-08-04 04:17:00-05:00', 3),
( user_id_john, user_id_eric, 2, '2024-08-04 08:09:00-05:00', 3),
( user_id_john, user_id_eric, 1, '2024-08-06 07:50:00-05:00', 3),
( user_id_john, user_id_eric, 3, '2024-08-06 10:56:00-05:00', 3),
( user_id_john, user_id_eric, 4, '2024-08-06 11:55:00-05:00', 3),
( user_id_john, user_id_eric, 2, '2024-08-06 15:54:00-05:00', 3),
( user_id_john, user_id_eric, 1, '2024-08-08 16:00:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-08-08 18:53:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-08-08 19:52:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-08-08 23:57:00-05:00', 2);
 END
$$;

