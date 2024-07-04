'use server';

import { formSchema } from './schema';
import { z } from 'zod';
import { db } from '@/drizzle/db';
import { shifts, shift_assignments } from '@/drizzle/schema';
import dayjs from 'dayjs';

type shift = typeof shifts.$inferInsert;

export const submit = async (
    values: z.infer<typeof formSchema>
): Promise<{
    success: boolean;
    message: string;
    issues?: string[];
    error?: string;
    data?: shift;
}> => {
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
        return {
            success: false,
            message: 'Invalid data',
            issues: parsed.error.issues.map((issue) => issue.message),
        };
    }

    try {
        const result = await db.transaction(async (tx) => {
            const startDateTime = dayjs(parsed.data.startDate + ' ' + parsed.data.startTime).toDate();
            const endDateTime = dayjs(parsed.data.endDate + ' ' + parsed.data.endTime).toDate();

            const [insertedShift] = await tx
                .insert(shifts)
                .values({
                    location: parsed.data.location,
                    start_time: startDateTime,
                    end_time: endDateTime,
                })
                .returning();

            const shiftAssignments = parsed.data.employees.map((employee) => ({
                shift_id: insertedShift.shift_id,
                employee_id: employee.value,
            }));

            await tx.insert(shift_assignments).values(shiftAssignments);

            return insertedShift;
        });

        return {
            success: true,
            message: 'Shift created successfully',
            data: result,
        };
    } catch (error) {
        console.error('Error inserting shift:', error);
        return {
            success: false,
            message: 'Error creating shift',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};
