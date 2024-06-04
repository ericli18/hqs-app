ALTER TABLE IF EXISTS public.clocks
ADD COLUMN employee_id uuid;

ALTER TABLE public.clocks
ADD CONSTRAINT fk_employee
FOREIGN KEY (employee_id) REFERENCES public.employees(id);
