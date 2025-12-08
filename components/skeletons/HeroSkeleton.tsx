import { Skeleton } from "./Skeleton";

export function HeroSkeleton() {
    return (
        <div className="w-full bg-[#111] py-16 px-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-6">
                <Skeleton className="h-12 w-3/4 max-w-2xl bg-gray-800" />
                <Skeleton className="h-6 w-1/2 max-w-xl bg-gray-800" />
                <div className="w-full max-w-md space-y-4">
                    <Skeleton className="h-14 w-full rounded-lg bg-gray-800" />
                </div>
            </div>
        </div>
    );
}
