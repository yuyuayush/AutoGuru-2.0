import { Skeleton } from "./Skeleton";

export function ServiceListSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="space-y-4 w-full">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border border-white/10 rounded-xl bg-[#111]">
                    <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-1/3 bg-gray-800" />
                        <Skeleton className="h-3 w-1/4 bg-gray-800" />
                    </div>
                    <Skeleton className="h-8 w-20 rounded-md bg-gray-800" />
                </div>
            ))}
        </div>
    );
}
