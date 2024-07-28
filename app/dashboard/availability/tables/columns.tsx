'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { employeeAvailabilities } from '@/drizzle/schema';

type availabilities = InferSelectModel<typeof employeeAvailabilities>;
export type Availability = availabilities;
const columnHelper = createColumnHelper<Availability>();
export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor('description', {
        header: 'Reason',
        cell: (info) => info.getValue(),
    }),
];
