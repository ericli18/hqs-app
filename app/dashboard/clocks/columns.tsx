'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { clocks } from '@/drizzle/schema';
import dayjs from 'dayjs';

type SelectClock = InferSelectModel<typeof clocks>;

export type Clock = Omit<SelectClock, 'location' | 'clock_type'> & {
    location: string;
    clock_type: string;
};
const columnHelper = createColumnHelper<Clock>();
// PLANNED SHIFTS
// See if they're scheduled for work the next day
// DATE - LOCATION - TYPE - START - END - TOTAL TIME - MEAL TIME - For supervisors only see what shifts they've worked on
// SCHEDULED - WORKED
export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor((row) => `${dayjs(row.clock_time)}`, {
        id: 'clock_time',
        cell: (info) => dayjs(info.getValue()).format('ddd MM/DD/YY - hh:mm A'),
    }),
    columnHelper.accessor('clock_type', {
        cell: (info) => info.getValue(),
    }),
];
