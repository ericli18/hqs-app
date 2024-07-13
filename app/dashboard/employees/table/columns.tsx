'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { type InferSelectModel } from 'drizzle-orm';
import { employees } from '@/drizzle/schema';

type SelectEmployee = InferSelectModel<typeof employees>;
export type Employee = SelectEmployee;
const columnHelper = createColumnHelper<Employee>();
export const defaultColumns = [
    columnHelper.display({
        id: 'actions',
    }),
    columnHelper.accessor((employee) => `${employee.first_name} ${employee.last_name}`, {
        header: 'Name',
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('hqs_id', {
        header: 'HQS ID',
        cell: (info) => info.getValue(),
    }),
];
