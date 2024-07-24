'use server';
import { formSchema } from './schema';
import { z } from 'zod';
import { db } from '@/drizzle/db';
import { eq } from 'drizzle-orm';
import { shifts, shift_assignments, locations } from '@/drizzle/schema';
import { toTimezone } from '@/lib/utils';

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
            const selectTimezone = await tx
                .select()
                .from(locations)
                .where(eq(locations.location_id, parsed.data.location))
                .limit(1);
            const { timezone = 'UTC' } = selectTimezone[0] || {};
            

            const startDateTime = toTimezone(parsed.data.startTime, parsed.data.startDate,  timezone);
            const endDateTime = toTimezone(parsed.data.endTime, parsed.data.endDate, timezone);

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
