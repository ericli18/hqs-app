ALTER TABLE IF EXISTS public.shifts
ADD COLUMN employee_id uuid;

ALTER TABLE public.shifts
ADD CONSTRAINT fk_employee
FOREIGN KEY (employee_id) REFERENCES public.employees(id);
