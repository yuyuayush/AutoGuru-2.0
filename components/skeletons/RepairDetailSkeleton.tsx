import React from "react";
import { Star, MapPin } from "lucide-react";

const RepairDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Sidebar Skeleton */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Rating Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="flex items-center space-x-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-gray-200 fill-current" />
                                ))}
                            </div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                        </div>

                        {/* Payment Options */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <div className="flex justify-center items-center space-x-4 mb-4">
                                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                                <div className="h-4 w-12 bg-gray-200 rounded"></div>
                            </div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        </div>
                    </div>

                    {/* Main Content Skeleton */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>

                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>

                    {/* Right Sidebar Skeleton */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Top Repairers */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <MapPin className="w-4 h-4 text-gray-200" />
                            </div>
                            <div className="space-y-0 border-t border-gray-100">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="border-b border-gray-100 py-3 flex justify-between">
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 w-3 bg-gray-200 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Related Articles */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <Star className="w-4 h-4 text-gray-200" />
                            </div>
                            <div className="space-y-0 border-t border-gray-100">
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <div key={item} className="border-b border-gray-100 py-3 flex justify-between">
                                        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-3 w-3 bg-gray-200 rounded"></div>
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
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 text-gray-200" />
                            ))}
                            <div className="h-3 bg-gray-200 rounded w-24 ml-1"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-auto h-12 bg-gray-200 rounded-md w-32"></div>
                </div>
            </div>

            {/* Spacer for sticky footer */}
            <div className="h-24"></div>
        </div>
    );
};

export default RepairDetailSkeleton;
