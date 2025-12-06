import { Skeleton } from "@/components/skeletons/Skeleton";

export function ServiceIntervalsSkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
        </div>
    );
}
