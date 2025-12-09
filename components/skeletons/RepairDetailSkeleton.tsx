import React from "react";
import { Star, MapPin } from "lucide-react";
import { Skeleton } from "./Skeleton";

const RepairDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Sidebar Skeleton */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Rating Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <Skeleton className="h-4 w-3/4 mb-4" />
                            <div className="flex items-center space-x-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-gray-200 fill-current" />
                                ))}
                            </div>
                            <Skeleton className="h-3 w-full" />
                        </div>

                        {/* Payment Options */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <div className="flex justify-center items-center space-x-4 mb-4">
                                <Skeleton className="h-4 w-12 rounded" />
                                <Skeleton className="h-4 w-12 rounded" />
                                <Skeleton className="h-4 w-12 rounded" />
                            </div>
                            <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
                            <Skeleton className="h-3 w-3/4 mx-auto mb-4" />
                            <Skeleton className="h-3 w-3/4 mx-auto" />
                        </div>
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-6 space-y-6">
                        <Skeleton className="h-10 w-3/4 mb-6" />

                        <div className="space-y-4">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-full" />
                        </div>

                        <div className="mt-8 space-y-4">
                            <Skeleton className="h-6 w-1/2 mb-3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>

                    {/* Right Sidebar Skeleton */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Top Repairers */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <Skeleton className="h-4 w-1/2" />
                                <MapPin className="w-4 h-4 text-gray-200" />
                            </div>
                            <div className="space-y-0 border-t border-gray-100">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="border-b border-gray-100 py-3 flex justify-between">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-3 w-3" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Related Articles */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <Skeleton className="h-4 w-1/2" />
                                <Star className="w-4 h-4 text-gray-200" />
                            </div>
                            <div className="space-y-0 border-t border-gray-100">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="border-b border-gray-100 py-3 flex justify-between">
                                        <Skeleton className="h-3 w-3/4" />
                                        <Skeleton className="h-3 w-3" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Sticky Bottom Bar Skeleton */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="hidden md:block w-1/3">
                        <Skeleton className="h-4 w-1/2 mb-2" />
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 text-gray-200" />
                            ))}
                            <Skeleton className="h-3 w-24 ml-1" />
                        </div>
                    </div>
                    <Skeleton className="h-12 w-32 rounded-md" />
                </div>
            </div>

            {/* Spacer for sticky footer */}
            <div className="h-24"></div>
        </div>
    );
};

export default RepairDetailSkeleton;
