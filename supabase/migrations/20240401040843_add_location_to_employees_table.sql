ALTER TABLE IF EXISTS public.employees
ADD COLUMN location smallint;

ALTER TABLE public.employees
ADD CONSTRAINT fk_location
FOREIGN KEY (location) REFERENCES public.locations(location_id);
