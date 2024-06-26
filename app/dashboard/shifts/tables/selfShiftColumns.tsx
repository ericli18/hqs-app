'use client';

import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';

export type Shift = {
    location: string,
    start_time: Date,
    end_time: Date,
    employee_id: string
}

const columnHelper = createColumnHelper<Shift>();

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
        cell: (info) => dayjs(info.getValue()).format('ddd MM/DD/YY - hh:mm A'),
    }),
    columnHelper.accessor('end_time', {
        header: 'Start',
        cell: (info) => dayjs(info.getValue()).format('ddd MM/DD/YY - hh:mm A'),
    })

];
