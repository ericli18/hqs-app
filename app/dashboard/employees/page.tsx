import { redirect } from 'next/navigation';
import { selectProfile } from '@/lib/data';
import { Employee } from './columns';
import { EmployeeDataTable } from './datatable';
import { selectAllEmployees } from '@/lib/data';
import { InviteButton } from './invite/invite-button';
export default async function Page() {
    const user = await selectProfile();
    if (!user) {
        redirect('/login');
    }
    const role = user.roles?.name;
    if(!role)
    {
        return <div>You are not allowed to access this page</div>
    }
    const employees: Employee[] = await selectAllEmployees();
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl">Your team</h1>
                    <p>View and manage the people you work with</p>
                </div>
                <InviteButton />
            </div>
            <div className="mt-6">
                <EmployeeDataTable data={employees} />
            </div>
        </div>
    );
}
