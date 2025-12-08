import React from "react";

const CarRepairServiceSkeleton = () => {
    return (
        <div className="bg-white min-h-screen animate-pulse">
            {/* Header Section Skeleton */}
            <section className="py-8 bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-left py-2">
                        <div className="h-10 bg-gray-200 rounded w-48"></div>
                    </div>
                </div>
            </section>

            {/* Services List Section Skeleton */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Generate dummy card skeletons */}
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm flex flex-col h-full">
                                {/* Card Header / Title Area */}
                                <div className="p-6">
                                    <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
                                    <div className="space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                                    </div>
                                </div>
                                <div className="flex-1"></div>
                                <div className="p-6 border-t border-gray-100">
                                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CarRepairServiceSkeleton;
