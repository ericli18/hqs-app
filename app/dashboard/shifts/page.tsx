import { redirect } from 'next/navigation';
import { selectProfile } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddShiftForm from './AddShiftForm';
import { db } from '@/drizzle/db';
import { employees, locations } from '@/drizzle/schema';
import { getShifts } from '@/lib/data';
import { SelfShifTable } from './tables/selfShiftTable';

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
    const selectLocations = await db.select().from(locations);
    const locs = selectLocations.map((loc) => ({
        label: loc.name,
        value: loc.location_id,
    }));
    const shifts = await getShifts(user.employees.id);

    return (
        <Tabs defaultValue="shifts" className="w-full">
            <TabsList>
                <TabsTrigger value="shifts">Your upcoming shifts</TabsTrigger>
                <TabsTrigger value="modify">Trade shifts</TabsTrigger>
                {role && <TabsTrigger value="assign">Assign shifts</TabsTrigger>}
            </TabsList>
            <TabsContent value="shifts">{<SelfShifTable data={shifts} />}</TabsContent>
            <TabsContent value="modify"></TabsContent>
            {role && (
                <TabsContent value="assign">
                    <AddShiftForm employees={emps} locations={locs} />
                </TabsContent>
            )}
        </Tabs>
    );
}
