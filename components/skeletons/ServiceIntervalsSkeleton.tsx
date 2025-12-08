import { Skeleton } from "@/components/skeletons/Skeleton";

export function ServiceIntervalsSkeleton() {
    return (
        <div className="space-y-2">
            <Skeleton className="h-16 w-full bg-gray-800" />
            <Skeleton className="h-16 w-full bg-gray-800" />
            <Skeleton className="h-16 w-full bg-gray-800" />
        </div>
    );
}
