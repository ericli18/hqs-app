'use server';

import { db } from '@/drizzle/db';
import { employeeAvailabilities } from '@/drizzle/schema';
import { selectProfile } from '@/lib/data';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getAvailabilities = cache(async () => {
    const self = await selectProfile();
    if (!self) {
        return [];
    }

    const id = self.employees.id;

    const allAvailabilities = await db
        .select()
        .from(employeeAvailabilities)
        .where(eq(employeeAvailabilities.employeeId, id));

    return allAvailabilities;
});
