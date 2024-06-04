ALTER TABLE IF EXISTS public.clocks
ADD COLUMN clock_type smallint;

ALTER TABLE public.clocks
ADD CONSTRAINT fk_clock
FOREIGN KEY (clock_type) REFERENCES public.clock_types(clock_type_id);
