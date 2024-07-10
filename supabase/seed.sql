
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
    ( user_id_jane, user_id_eric, 1, '2024-06-26 08:00:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-06-26 10:57:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-06-26 12:01:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-06-26 16:02:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-06-28 08:03:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-06-28 11:10:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-06-28 12:01:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-06-28 15:57:00-05:00', 3),
( user_id_jane, user_id_eric, 1, '2024-06-30 15:53:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-06-30 18:50:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-06-30 19:58:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-06-30 23:54:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-07-02 16:06:00-05:00', 2),
( user_id_jane, user_id_eric, 3, '2024-07-02 18:56:00-05:00', 2),
( user_id_jane, user_id_eric, 4, '2024-07-02 19:56:00-05:00', 2),
( user_id_jane, user_id_eric, 2, '2024-07-03 00:04:00-05:00', 2),
( user_id_jane, user_id_eric, 1, '2024-07-04 00:10:00-05:00', 3),
( user_id_jane, user_id_eric, 3, '2024-07-04 03:02:00-05:00', 3),
( user_id_jane, user_id_eric, 4, '2024-07-04 04:09:00-05:00', 3),
( user_id_jane, user_id_eric, 2, '2024-07-04 08:13:00-05:00', 3),
    ( user_id_john, user_id_eric, 1, '2024-06-26 16:00:00-05:00', 3),
( user_id_john, user_id_eric, 3, '2024-06-26 19:07:00-05:00', 3),
( user_id_john, user_id_eric, 4, '2024-06-26 20:14:00-05:00', 3),
( user_id_john, user_id_eric, 2, '2024-06-26 23:58:00-05:00', 3),
( user_id_john, user_id_eric, 1, '2024-06-28 00:07:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-06-28 03:06:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-06-28 04:13:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-06-28 08:14:00-05:00', 2),
( user_id_john, user_id_eric, 1, '2024-06-30 07:53:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-06-30 10:46:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-06-30 11:53:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-06-30 15:59:00-05:00', 2),
( user_id_john, user_id_eric, 1, '2024-07-01 23:58:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-07-02 02:54:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-07-02 04:03:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-07-02 07:48:00-05:00', 2),
( user_id_john, user_id_eric, 1, '2024-07-04 07:59:00-05:00', 2),
( user_id_john, user_id_eric, 3, '2024-07-04 11:06:00-05:00', 2),
( user_id_john, user_id_eric, 4, '2024-07-04 12:08:00-05:00', 2),
( user_id_john, user_id_eric, 2, '2024-07-04 16:05:00-05:00', 2);
 END
$$;

