import { Skeleton } from "./Skeleton";

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-4 p-4 border border-white/10 rounded-xl bg-[#111]">
                    <Skeleton className="h-48 w-full rounded-lg bg-gray-800" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4 bg-gray-800" />
                        <Skeleton className="h-4 w-1/2 bg-gray-800" />
                    </div>
                    <div className="pt-4 mt-auto">
                        <Skeleton className="h-10 w-full rounded-lg bg-gray-800" />
                    </div>
                </div>
            ))}
        </div>
    );
}
