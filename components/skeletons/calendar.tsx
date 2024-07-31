import { Skeleton } from '@/components/ui/skeleton';

export function CalendarSkeleton() {
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <Skeleton className="min-h-8 min-w-24" />
                <Skeleton className="min-h-8 min-w-24" />
            </div>
            <Skeleton className="min-h-16 min-w-full" />
            <Skeleton className="min-h-16 min-w-full" />
            <Skeleton className="min-h-16 min-w-full" />
            <Skeleton className="min-h-16 min-w-full" />
            <Skeleton className="min-h-16 min-w-full" />
        </div>
    );
}
