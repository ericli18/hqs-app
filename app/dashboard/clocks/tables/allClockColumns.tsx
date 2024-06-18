'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { clocks } from '@/drizzle/schema';
import dayjs from 'dayjs';

type SelectClock = InferSelectModel<typeof clocks>;

export type Clock = Omit<SelectClock, 'location' | 'clock_type'> & {
    location: string;
    clock_type: string;
    employee: {
        id: string;
        first_name: string;
        last_name: string;
    };
    supervisor: {
        id: string;
        first_name: string;
        last_name: string;
    };
};
const columnHelper = createColumnHelper<Clock>();
//Export to excel, filters
// PLANNED SHIFTS
// See if they're scheduled for work the next day
// DATE - LOCATION - TYPE - START - END - TOTAL TIME - MEAL TIME - For supervisors only see what shifts they've worked on
// SCHEDULED - WORKED
export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor((clock) => clock.employee.first_name + " " + clock.employee.last_name, {
        header: 'Employee',
        cell: (info) => info.getValue()
    }),
    columnHelper.accessor('clock_time', {
        header: 'Time',
        id: 'clock_time',
        cell: (info) => dayjs(info.getValue()).format('ddd MM/DD/YY - hh:mm A'),
    }),
    columnHelper.accessor('clock_type', {
        header: 'Type',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('location', {
        header: 'Location',
        cell: (info) => info.getValue(),
    }),
];
