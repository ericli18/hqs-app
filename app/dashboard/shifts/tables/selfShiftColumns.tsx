'use client';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export type Shift = {
    location: string,
    start_time: string,
    end_time: string,
    employee_id: string
}

const columnHelper = createColumnHelper<Shift>();

const formatLocalTime = (date: string) => {
    return dayjs(date).local().format('ddd MM/DD/YY - hh:mm A');
};

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
        cell: (info) => formatLocalTime(info.getValue()),
    }),
    columnHelper.accessor('end_time', {
        header: 'End',
        cell: (info) => formatLocalTime(info.getValue()),
    })
];