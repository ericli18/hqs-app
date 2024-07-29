import { Suspense } from 'react';
import { Availability } from './columns';
import { AvailabilityDataTable } from './datatable';
import { TableSkeleton } from '@/components/skeletons/table';
import { getAvailabilities } from '@/services/availability';

async function AvailabilityTableContent() {
    const availabilities: Availability[] = await getAvailabilities();
    return <AvailabilityDataTable data={availabilities} />;
}

export function AvailabilityTable() {
    return (
        <Suspense fallback={<TableSkeleton />}>
            <AvailabilityTableContent />
        </Suspense>
    );
}
