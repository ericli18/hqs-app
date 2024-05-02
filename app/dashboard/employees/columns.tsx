'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { employees } from '@/drizzle/schema';

type SelectEmployee = InferSelectModel<typeof employees>;
export type Employee = Omit<SelectEmployee, 'location'> & {
    location: string;
};
const columnHelper = createColumnHelper<Employee>();
export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor('first_name', {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('last_name', {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('location', {
        cell: (info) => info.getValue(),
    }),
];
