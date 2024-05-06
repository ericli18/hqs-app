'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { shifts } from '@/drizzle/schema';
import dayjs from 'dayjs';

export type Shift = InferSelectModel<typeof shifts>;
const columnHelper = createColumnHelper<Shift>();
export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor('shift_type', {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('start_time', {
        cell: (info) => dayjs(info.getValue()).format(),
    }),
    columnHelper.accessor('end_time', {
        cell: (info) => dayjs(info.getValue()).format(),
    }),
];