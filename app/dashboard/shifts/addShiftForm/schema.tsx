import { z } from 'zod';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

const baseSchema = z.object({
    employees: z
        .array(
            z.object({
                label: z.string(),
                value: z.string(),
            })
        )
        .refine(
            (employees) => {
                const values = employees.map((e) => e.value);
                return new Set(values).size === values.length;
            },
            {
                message: 'Duplicate employees are not allowed',
            }
        ),
    startDate: z.string().date('Invalid start date format'),

    startTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid start time format. Use HH:mm (24-hour format).',
    }),

    endDate: z.string().date('Invalid end date format'),

    endTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'Invalid end time format. Use HH:mm (24-hour format).',
    }),
    location: z.number(),
});

export const formSchema = baseSchema.refine(
    (values) => {
        const startDateTime = dayjs(values.startDate + ' ' + values.startTime, 'YYYY-MM-DD HH:mm');
        const endDateTime = dayjs(values.endDate + ' ' + values.endTime, 'YYYY-MM-DD HH:mm');
        return startDateTime.isSameOrBefore(endDateTime);
    },
    {
        message: 'End of the shift must be after the start of the shift',
        path: ['endDate'],
    }
);

const keys = [...baseSchema.keyof().options];
export type schemaKeys = typeof keys

