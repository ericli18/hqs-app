import { db } from '@/drizzle/db';
import { employees } from '@/drizzle/schema';
import { createClient } from '@/utils/supabase/server';
import { eq } from 'drizzle-orm';

export const selectProfile = async () => {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    const id = user?.id;
    console.log(user);
    if (!id) {
        return;
    }

    const self = await db.select().from(employees).where(eq(employees.id, id));
    return self[0];
};

export const selectAllEmployees = async () => {
    const selectedEmployees = await db.select().from(employees);
    return selectedEmployees;
};
