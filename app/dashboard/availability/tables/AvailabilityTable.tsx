import { Suspense } from 'react';
import { Availability } from './columns';
import { AvailabilityDataTable } from './datatable';
import { TableSkeleton } from '@/components/skeletons/table';
import { db } from '@/drizzle/db';
import { employeeAvailabilities } from '@/drizzle/schema';

async function AvailabilityTableContent() {
  const availabilities: Availability[] = await db.select().from(employeeAvailabilities);
  return <AvailabilityDataTable data={availabilities} />;
}

export function AvailabilityTable() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <AvailabilityTableContent />
    </Suspense>
  );
}
