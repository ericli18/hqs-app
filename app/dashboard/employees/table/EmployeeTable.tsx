import { Suspense } from 'react';
import { Employee } from './columns';
import { EmployeeDataTable } from './datatable';
import { selectAllEmployees } from '@/lib/data';
import { TableSkeleton } from '@/components/skeletons/table';

async function EmployeeTableContent() {
  const employees: Employee[] = await selectAllEmployees();
  return <EmployeeDataTable data={employees} />;
}

export function EmployeeTable() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <EmployeeTableContent />
    </Suspense>
  );
}
