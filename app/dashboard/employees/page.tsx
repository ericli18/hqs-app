import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Employee } from './columns';
import { EmployeeDataTable } from './datatable';
import { selectAllEmployees } from '@/lib/data';
import { InviteButton } from './invite/invite-button';
export default async function Page() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    }
    const employees: Employee[] = await selectAllEmployees();
    return (
        <div>
            <h1>Team</h1>
            <p>Invite new members in your team</p>
            <InviteButton />
            <EmployeeDataTable data={employees} />
        </div>
    );
}
