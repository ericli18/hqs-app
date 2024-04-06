ALTER TABLE IF EXISTS public.shifts
ADD COLUMN shift_type smallint;

ALTER TABLE public.shifts
ADD CONSTRAINT fk_type
FOREIGN KEY (shift_type) REFERENCES public.shift_types(shift_type_id);
