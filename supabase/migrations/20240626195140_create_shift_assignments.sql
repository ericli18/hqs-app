CREATE TABLE public.shift_assignments (
    assignment_id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    shift_id bigint,
    employee_id uuid,
    UNIQUE (shift_id, employee_id)
);

ALTER TABLE public.shift_assignments
ADD CONSTRAINT fk_employee
FOREIGN KEY (employee_id) REFERENCES public.employees(id);

ALTER TABLE public.shift_assignments
ADD CONSTRAINT fk_shift
FOREIGN KEY (shift_id) REFERENCES public.shifts(shift_id);
