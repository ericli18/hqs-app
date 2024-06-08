'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { type Clock } from './selfClockColumns';
import { type ClockSeries, defaultColumns } from './selfTimeColumns';
import dayjs from 'dayjs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export function SelfTimeTable({ data, id }: { data: Clock[], id: string }) {
    //this function will assume that everything is already grouped for 
    const filtered = data.filter((val) => val.employee_id == id);
    const sorted = filtered.toSorted((a, b) => dayjs(b.clock_time).diff(dayjs(a.clock_time)));
    console.log(sorted);
    
    const newData: ClockSeries[] = [];


    const table = useReactTable({
        data: newData,
        columns: defaultColumns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={defaultColumns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}