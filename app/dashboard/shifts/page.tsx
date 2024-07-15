import { redirect } from 'next/navigation';
import { getLocations, selectProfile } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddShiftForm from './AddShiftForm';
import { db } from '@/drizzle/db';
import { employees } from '@/drizzle/schema';
import { ShiftTable } from './tables/ShiftTable';

export default async function Page() {
    const user = await selectProfile();
    if (!user) {
        redirect('/login');
    }

    const role = user.roles?.name;

    const selectEmployees = await db.select().from(employees);
    const emps = selectEmployees.map((emp) => ({
        label: emp.first_name + ' ' + emp.last_name,
        value: emp.id,
    }));
    const locs = await getLocations();

    return (
        <Tabs defaultValue="shifts" className="w-full">
            <TabsList>
                <TabsTrigger value="shifts">Your upcoming shifts</TabsTrigger>
                <TabsTrigger value="modify">Trade shifts</TabsTrigger>
                {role && <TabsTrigger value="assign">Assign shifts</TabsTrigger>}
            </TabsList>
            <TabsContent value="shifts">{<ShiftTable userId={user.employees.id} />}</TabsContent>
            <TabsContent value="modify"></TabsContent>
            {role && (
                <TabsContent value="assign">
                    <AddShiftForm employees={emps} locations={locs} />
                </TabsContent>
            )}
        </Tabs>
    );
}
