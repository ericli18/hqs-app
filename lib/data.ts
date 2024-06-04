import { db } from '@/drizzle/db';
import { employees, clocks, locations, clock_types } from '@/drizzle/schema';
import { createClient } from '@/utils/supabase/server';
import { eq, getTableColumns, or} from 'drizzle-orm';
import { type Employee } from '@/app/dashboard/employees/columns';
import { type Clock } from '@/app/dashboard/clocks/columns';

export const selectProfile = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    if (!id) {
        return;
    }

    const self = await db.select().from(employees).where(eq(employees.id, id));
    return self[0];
};

export const getClockTimes = async (): Promise<Clock[]> => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    if (!id) {
        return [];
    }
    const selectedClocks = await db
        .select({
            ...getTableColumns(clocks),
            location: locations.name,
            clock_type: clock_types.label
        })
        .from(clocks)
        .innerJoin(locations, eq(clocks.location, locations.location_id))
        .innerJoin(clock_types, eq(clock_types.clock_type_id, clocks.clock_type))
        .where(or(eq(clocks.supervisor_id, id), eq(clocks.employee_id, id)));
    return selectedClocks;
};

export const selectAllEmployees = async (): Promise<Employee[]> => {
    const selectedEmployees = await db
        .select({
            id: employees.id,
            first_name: employees.first_name,
            last_name: employees.last_name,
            hqs_id: employees.hqs_id,
            location: locations.name,
        })
        .from(employees)
        .innerJoin(locations, eq(employees.location, locations.location_id));
    return selectedEmployees;
};
