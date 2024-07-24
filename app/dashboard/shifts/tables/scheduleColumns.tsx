'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { formatISOPrintable, fromTimezone } from '@/lib/utils';

export type Schedule = {
    location: string,
    start_time: string,
    end_time: string,
    employee_id: string
}

const columnHelper = createColumnHelper<Schedule>();

export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor('location', {
        header: 'Location',
        cell: (info) => info.getValue() as string
    }),
    columnHelper.accessor('start_time', {
        header: 'Start',
        cell: (info) => formatISOPrintable(fromTimezone(info.getValue())),
    }),
    columnHelper.accessor('end_time', {
        header: 'End',
        cell: (info) =>formatISOPrintable(fromTimezone(info.getValue())),
    })

];
