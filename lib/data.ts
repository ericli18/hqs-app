import { db } from '@/drizzle/db';
import { employees, shifts, locations, shift_types} from '@/drizzle/schema';
import { createClient } from '@/utils/supabase/server';
import { eq, getTableColumns } from 'drizzle-orm';
import { type Employee } from '@/app/dashboard/employees/columns';
import { type Shift } from '@/app/dashboard/shifts/columns';

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

export const getShiftTimes = async () : Promise<Shift[]> => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    if (!id) {
        return [];
    }

const selectedShifts = await db
    .select({
        ...getTableColumns(shifts),
        shift_type: shift_types.label
    })
    .from(shifts)
    .innerJoin(shift_types, eq(shifts.shift_type, shift_types.shift_type_id))
    .where(eq(shifts.employee_id, id))
    return selectedShifts;
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
