import { Suspense } from 'react';
import { SelfShifTable } from './selfShiftTable';
import { TableSkeleton } from '@/components/skeletons/table';
import { getShifts } from '@/lib/data';

async function ShiftTableContent({ userId }: { userId: string }) {
    const shifts = await getShifts(userId);

    return <SelfShifTable data={shifts} />;
}

export function ShiftTable({ userId }: { userId: string }) {
    return (
        <Suspense fallback={<TableSkeleton />}>
            <ShiftTableContent userId={userId} />
        </Suspense>
    );
}
