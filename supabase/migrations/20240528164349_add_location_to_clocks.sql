ALTER TABLE IF EXISTS public.clocks
ADD COLUMN location_id SMALLINT;

ALTER TABLE public.clocks
ADD CONSTRAINT fk_location
FOREIGN KEY (location_id) REFERENCES public.locations(location_id);