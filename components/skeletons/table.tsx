import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="min-h-4 min-w-full" />
            <Skeleton className="min-h-4 min-w-full" />
            <Skeleton className="min-h-4 min-w-full" />
            <Skeleton className="min-h-4 min-w-full" />
            <Skeleton className="min-h-4 min-w-full" />
        </div>
    );
}
