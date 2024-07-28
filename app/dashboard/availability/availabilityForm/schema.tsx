import { z } from 'zod';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore' 

dayjs.extend(isSameOrBefore);
export const formSchema = z
    .object({
        startDate: z.string().refine((date) => dayjs(date, 'YYYY-MM-DD').isValid(), {
            message: 'Invalid start date format',
        }),
        endDate: z.string().refine((date) => dayjs(date, 'YYYY-MM-DD').isValid(), {
            message: 'Invalid end date format',
        }),
        startTime: z.union([
            z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
                message: 'Invalid start time format. Use HH:mm (24-hour format).',
            }),
            z.literal(''),
        ]),
        endTime: z.union([
            z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
                message: 'Invalid start time format. Use HH:mm (24-hour format).',
            }),
            z.literal(''),
        ]),
        isFullDayEvent: z.boolean(),
        reason: z.string().min(1, 'Reason must be provided'),
    })
    .refine(
        (values) => {
            if (!values.isFullDayEvent) {
                return values.startTime !== '' && values.endTime !== '';
            }
            return true;
        },
        {
            message: 'Start time and end time must be provided for non-full day events',
            path: ['isFullDayEvent'],
        }
    )
    .refine(
        (values) => {
            if (!values.isFullDayEvent) {
                const startDateTime = dayjs(`${values.startDate} ${values.startTime}`, 'YYYY-MM-DD HH:mm');
                const endDateTime = dayjs(`${values.endDate} ${values.endTime}`, 'YYYY-MM-DD HH:mm');
                return startDateTime.isBefore(endDateTime);
            }
            const startDate = dayjs(values.startDate)
            const endDate = dayjs(values.endDate)
            return startDate.isSameOrBefore(endDate);
        },
        {
            message: 'End of the shift must be after the start of the shift',
            path: ['endDate'],
        }
    );
