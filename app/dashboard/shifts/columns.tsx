'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { shifts } from '@/drizzle/schema';
import dayjs from 'dayjs';

type SelectShift = InferSelectModel<typeof shifts>;

export type Shift = Omit<SelectShift, 'shift_type'> & {
    shift_type: string;
};
const columnHelper = createColumnHelper<Shift>();
// PLANNED SHIFTS
// See if they're scheduled for work the next day
// DATE - LOCATION - TYPE - START - END - TOTAL TIME - MEAL TIME - For supervisors only see what shifts they've worked on
// SCHEDULED - WORKED
export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor('shift_type', {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('start_time', {
        cell: (info) => dayjs(info.getValue()).format('ddd MM/DD/YY - hh:mm A'),
    }),
    columnHelper.accessor('end_time', {
        cell: (info) => dayjs(info.getValue()).format('ddd MM/DD/YY - hh:mm A'),
    }),
];
