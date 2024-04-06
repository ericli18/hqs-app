-- --Location seeding
-- INSERT INTO public.locations (name)
-- VALUES
-- ('Fremont'),
-- ('Austin'),
-- ('Germany');

-- --Shift type seeding
-- INSERT INTO public.shift_types (label)
-- VALUES
-- ('Morning'),
-- ('Afternoon'),
-- ('Night');

-- --Employees seeding
-- INSERT INTO public.employees (name, email, location)
-- VALUES
-- ('John Doe', 'john.doe@example.com', 1),
-- ('Jane Smith', 'jane.smith@example.com', 2),
-- ('Eric Li', 'eric.li.8736@gmail.com', 3);

-- --Shifts seeding
-- INSERT INTO public.shifts (start_time, end_time, shift_type, employee_id)
-- VALUES
-- ('2024-04-01 08:00:00+00', '2024-04-01 16:00:00+00', 1, 1),
-- ('2024-04-02 08:00:00+00', '2024-04-02 16:00:00+00', 2, 2),
-- ('2024-04-03 08:00:00+00', '2024-04-03 16:00:00+00', 3, 3);

SELECT public.create_user('eric@example.com', '123ABC');
