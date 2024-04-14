import { selectAllEmployees } from '@/lib/data';

export default async function Page() {
    const employees = await selectAllEmployees();
    return (
        <div>
            {employees.map((employee) => (
                <p>{employee.first_name}</p>
            ))}
        </div>
    );
}
