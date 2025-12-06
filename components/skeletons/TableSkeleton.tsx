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

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                {showSearch && <Skeleton className="h-10 w-full max-w-sm" />}

                <div className=" rounded-md">
                    {/* Header */}
                    <div className="flex items-center p-4 bg-gray-50 gap-4">
                        {Array.from({ length: columnCount }).map((_, i) => (
                            <Skeleton key={`header-${i}`} className="h-4 w-full" />
                        ))}
                    </div>

                    {/* Rows */}
                    {Array.from({ length: rowCount }).map((_, rowIndex) => (
                        <div key={`row-${rowIndex}`} className="flex items-center p-4 gap-4">
                            {Array.from({ length: columnCount }).map((_, colIndex) => (
                                <Skeleton key={`cell-${rowIndex}-${colIndex}`} className="h-4 w-full" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
