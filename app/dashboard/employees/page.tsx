import { redirect } from 'next/navigation';
import { selectProfile } from '@/lib/data';
import { EmployeeTable } from './table/EmployeeTable';
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
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-xl">Your team</h1>
                    <p>View and manage the people you work with</p>
                </div>
                <InviteButton defaultLocation={user.employees.location}/>
            </div>
            <div className="mt-6">
                <EmployeeTable />
            </div>
        </div>
    );
}
