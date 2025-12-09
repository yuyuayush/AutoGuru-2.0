import { Skeleton } from "@/components/skeletons/Skeleton"

interface TableSkeletonProps {
    rowCount?: number
    columnCount?: number
    showSearch?: boolean
    showAddButton?: boolean
}

export function TableSkeleton({
    rowCount = 5,
    columnCount = 4,
    showSearch = true,
    showAddButton = true
}: TableSkeletonProps) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            <div className="bg-[#111] p-6 rounded-lg border border-white/10 shadow-sm space-y-4">
                {showSearch && <Skeleton className="h-10 w-full max-w-sm bg-gray-800" />}

                <div className=" rounded-md">
                    {/* Header */}
                    <div className="flex items-center p-4 bg-black/50 gap-4">
                        {Array.from({ length: columnCount }).map((_, i) => (
                            <Skeleton key={`header-${i}`} className="h-4 w-full bg-gray-800" />
                        ))}
                    </div>

                    {/* Rows */}
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <div key={`row-${rowIndex}`} className="flex items-center p-4 gap-4 border-b border-white/5 last:border-0">
                            {Array.from({ length: columnCount }).map((_, colIndex) => (
                                <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4 w-full bg-gray-800" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
