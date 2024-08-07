import { db } from '@/drizzle/db';
import { employees, clocks, locations, clock_types, roles, shift_assignments, shifts } from '@/drizzle/schema';
import { createClient } from '@/utils/supabase/server';
import { desc, eq, getTableColumns, or } from 'drizzle-orm';
import { type Employee } from '@/app/dashboard/employees/table/columns';
import { type Clock } from '@/app/dashboard/clocks/tables/selfClockColumns';
import { alias } from 'drizzle-orm/pg-core';

export const selectProfile = async () => {
    const supabase = createClient();
    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();

        if (error || !user?.id) {
            console.error('Authentication error:', error);
            return null;
        }

        const self = await db
            .select()
            .from(employees)
            .leftJoin(roles, eq(employees.role, roles.role_id))
            .where(eq(employees.id, user.id))
            .limit(1)
            .execute();

        return self[0] || null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};

export const getLocations = async () => {
    const selectLocations = await db
        .select({
            label: locations.name,
            value: locations.location_id,
            timezone: locations.timezone
        })
        .from(locations);
    return selectLocations;
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
    const supervisors = alias(employees, 'supervisor');

    const selectedClocks = await db
        .select({
            ...getTableColumns(clocks),
            location: locations.name,
            clock_type: clock_types.label,
            supervisor: {
                id: supervisors.id,
                first_name: supervisors.first_name,
                last_name: supervisors.last_name,
            },
            employee: {
                id: employees.id,
                first_name: employees.first_name,
                last_name: employees.last_name,
            },
        })
        .from(clocks)
        .innerJoin(locations, eq(clocks.location, locations.location_id))
        .innerJoin(clock_types, eq(clock_types.clock_type_id, clocks.clock_type))
        .innerJoin(employees, eq(clocks.employee_id, employees.id))
        .innerJoin(supervisors, eq(clocks.supervisor_id, supervisors.id))
        .groupBy(employees.id, clocks.clock_id, clock_types.label, locations.name, supervisors.id)
        .orderBy(desc(clocks.clock_time))
        .where(or(eq(clocks.supervisor_id, id), eq(clocks.employee_id, id)));
    return selectedClocks;
};

export const selectAllEmployees = async (): Promise<Employee[]> => {
    const selectedEmployees = await db.select().from(employees);
    return selectedEmployees;
};

export const getShifts = async (id: string) => {
    const selectedShifts = await db
        .select({
            location: locations.name,
            start_time: shifts.start_time,
            end_time: shifts.end_time,
            employee_id: employees.id,
        })

        .from(shift_assignments)
        .innerJoin(shifts, eq(shifts.shift_id, shift_assignments.shift_id))
        .innerJoin(employees, eq(employees.id, shift_assignments.employee_id))
        .innerJoin(locations, eq(locations.location_id, shifts.location))
        .where(eq(shift_assignments.employee_id, id));
    return selectedShifts;
};
