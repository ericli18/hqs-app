ALTER TABLE IF EXISTS public.clocks
ADD COLUMN supervisor_id uuid;

--We don't want to delete shifts when employees are deleted
ALTER TABLE public.clocks
ADD CONSTRAINT fk_supervisor
FOREIGN KEY (supervisor_id) REFERENCES public.employees(id);