import { Employee } from './columns';
import { EmployeeDataTable } from './datatable';
import {selectAllEmployees } from '@/lib/data'
export default async function Page() {
    const data: Employee[] = await selectAllEmployees();
    return (
        <div>
            <EmployeeDataTable data={data} />
        </div>
    );
}
