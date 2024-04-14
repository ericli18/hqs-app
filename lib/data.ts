import { db } from '@/drizzle/db';
import { employees } from '@/drizzle/schema';

export const selectAllEmployees = async () => {
    const selectedEmployees = await db.select().from(employees);
    return selectedEmployees;
};
