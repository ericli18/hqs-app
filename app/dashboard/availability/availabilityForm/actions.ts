'use server';

import dayjs from 'dayjs';
import { selectProfile } from '@/lib/data';
import { db } from '@/drizzle/db';
import { employeeAvailabilities } from '@/drizzle/schema';
import { formSchema } from './schema';
import { z } from 'zod';
import { toTimezone } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

type SubmitResult = { success: true; message: string; id: number | string } | { success: false; error: string };

export const submit = async (values: z.infer<typeof formSchema>): Promise<SubmitResult> => {
    try {
        const user = await selectProfile();
        if (!user) {
            return { success: false, error: 'User not found or not authenticated' };
        }

        const parsed = formSchema.safeParse(values);
        if (!parsed.success) {
            return {
                success: false,
                error: 'Invalid form data: ' + parsed.error.errors.map((e) => e.message).join(', '),
            };
        }

        const { data } = parsed;
        const startDate = dayjs(data.startDate).format('YYYY-MM-DD');
        const endDate = dayjs(data.endDate).format('YYYY-MM-DD');
        const startTime = !data.isFullDayEvent ? toTimezone(data.startTime) : null;
        const endTime = !data.isFullDayEvent ? toTimezone(data.endTime) : null;

        const res = await db
            .insert(employeeAvailabilities)
            .values({
                startDate,
                endDate,
                startTime,
                endTime,
                isFullDayEvent: data.isFullDayEvent,
                rrule: '',
                employeeId: user.employees.id,
                description: data.reason,
            })
            .returning({ insertedId: employeeAvailabilities.employeeAvailabilityId });

        if (!res[0]) {
            return { success: false, error: 'Failed to insert availability' };
        }

        revalidatePath('/dashboard/availability');

        return {
            success: true,
            message: 'Availability successfully added',
            id: res[0].insertedId,
        };
    } catch (error) {
        console.error('Error in submit action:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unexpected error occurred',
        };
    }
};
