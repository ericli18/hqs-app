import { Employee } from './columns';
import { EmployeeDataTable } from './datatable';
export default async function Page() {
    const data: Employee[] = [];
    return (
        <div>
            <EmployeeDataTable data={data} />
        </div>
    );
}
