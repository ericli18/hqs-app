import { redirect } from 'next/navigation';
import { getLocations, selectProfile } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddShiftForm from './addShiftForm/AddShiftForm';
import AvailabilityForm from './availabilityForm/AvailabilityForm';
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
        <Tabs defaultValue="calendar" className="flex w-full flex-col">
            <TabsList className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="shifts">Your shifts</TabsTrigger>
                <TabsTrigger value="request">Availability</TabsTrigger>
                <TabsTrigger value="trade">Trade shifts</TabsTrigger>
                {role && <TabsTrigger value="assign">Assign shifts</TabsTrigger>}
                {role && <TabsTrigger value="all">View all shifts</TabsTrigger>}
            </TabsList>

            <TabsContent value="calendar">{/* Calendar content goes here */}</TabsContent>

            <TabsContent value="shifts">{<ShiftTable userId={user.employees.id} />}</TabsContent>

            <TabsContent value="request">{<AvailabilityForm />}</TabsContent>

            <TabsContent value="trade">{/* Trade shifts content goes here */}</TabsContent>

            {role && (
                <TabsContent value="assign" className='grid place-items-center'>
                    <AddShiftForm employees={emps} locations={locs} />
                </TabsContent>
            )}

            {role && <TabsContent value="all">{/* View all shifts content goes here */}</TabsContent>}
        </Tabs>
    );
}
