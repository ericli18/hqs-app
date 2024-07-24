"use server"

import dayjs from 'dayjs';
import { selectProfile } from '@/lib/data';
import { db } from '@/drizzle/db';
import { employeeAvailabilities } from '@/drizzle/schema';
import { formSchema } from './schema';
import { z } from 'zod';

type SubmitResult = 
  | { success: true; message: string; id: number | string }
  | { success: false; error: string };
  
//TODO: To local and to shift time functions

export const submit = async (values: z.infer<typeof formSchema>): Promise<SubmitResult> => {
    try {
        const user = await selectProfile();
        if (!user) {
            return { success: false, error: "User not found or not authenticated" };
        }

        const parsed = formSchema.safeParse(values);
        if (!parsed.success) {
            return { 
                success: false, 
                error: "Invalid form data: " + parsed.error.errors.map(e => e.message).join(", ")
            };
        }

        const { data } = parsed;
        
        const res = await db.insert(employeeAvailabilities).values({
            startDate: dayjs(data.startDate).format(),
            endDate: dayjs(data.endDate).format(),
            startTime: data.isFullDayEvent? data.startTime : null,
            endTime: data.isFullDayEvent? data.endTime : null,
            isFullDayEvent: data.isFullDayEvent,
            rrule: '',
            employeeId: user.employees.id,
            description: data.reason
        }).returning({ insertedId: employeeAvailabilities.employeeAvailabilityId });

        if (!res[0]) {
            return { success: false, error: "Failed to insert availability" };
        }

        return { 
            success: true, 
            message: "Availability successfully added", 
            id: res[0].insertedId 
        };
    } catch (error) {
        console.error("Error in submit action:", error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "An unexpected error occurred" 
        };
    }
}