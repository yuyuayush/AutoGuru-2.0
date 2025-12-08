"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Star, ChevronRight, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCarSubService } from "@/hooks/useCarSubService";
import RepairDetailSkeleton from "@/components/skeletons/RepairDetailSkeleton";

const RepairDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const { data: subServiceData, isLoading } = useCarSubService(slug);

    if (isLoading) {
        return <RepairDetailSkeleton />;
    }

    if (!subServiceData?.subService) {
        // Fallback for when data is not found, or while loading if not handled above
        // You might want a better 404 component here
        const title = slug ? decodeURIComponent(slug).replace(/-/g, " ") : "Repair";
        const formattedTitle = title.replace(/\b\w/g, (l) => l.toUpperCase());

        return (
            <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
                <p className="text-gray-600 mb-6">We couldn't find details for {formattedTitle}.</p>
                <Link href="/car-repair-service" className="text-blue-600 hover:underline">
                    Back to Services
                </Link>
            </div>
        )
    }

    const { name, description, price } = subServiceData.subService;

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Sidebar (Rating & Payment) */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Rating Card */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-900 mb-2">
                                Average rating for {name}
                            </h3>
                            <div className="flex items-center space-x-1 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                            <p className="text-xs text-gray-500">
                                4.6 • based on 357 reviews of 201 businesses
                            </p>
                        </div>

                        {/* Payment Options */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                            <div className="flex justify-center items-center space-x-4 mb-4 grayscale opacity-70">
                                {/* Placeholders for logos */}
                                <span className="font-bold text-xs italic">afterpay</span>
                                <span className="font-bold text-xs text-orange-500">humm</span>
                                <span className="font-bold text-xs">zip</span>
                            </div>
                            <div className="font-bold text-lg mb-1">AVAILABLE</div>
                            <p className="text-[10px] text-gray-400 mb-4">
                                *T&Cs apply. Participating service providers only
                            </p>
                            <p className="text-[10px] text-blue-500">
                                *Available at select service providers. T&Cs apply.
                            </p>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">
                            {name}
                        </h1>

                        <div className="prose prose-sm max-w-none text-gray-600 space-y-6">

                            {/* Dynamic Description from Rich Text Editor */}
                            <div dangerouslySetInnerHTML={{ __html: description }} />

                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-3">
                                    How much does {name.toLowerCase()} cost?
                                </h2>
                                <p>
                                    The average price of {name.toLowerCase()} starts around ${price} and depending on what needs to be repaired or replaced, can vary.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar (Top Repairers & Articles) */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Top Repairers */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-900">
                                    Top {name} Repairers
                                </h3>
                                <MapPin className="w-4 h-4 text-blue-500" />
                            </div>
                            <ul className="space-y-0 border-t border-gray-100">
                                {["Sydney", "Brisbane", "Melbourne", "Perth", "Adelaide"].map((city) => (
                                    <li key={city} className="border-b border-gray-100">
                                        <Link href="#" className="flex items-center justify-between py-3 group">
                                            <span className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors">
                                                Top {name} Repairers in {city}
                                            </span>
                                            <ChevronRight className="w-3 h-3 text-blue-500" />
                                        </Link>
                                    </li>
                                ))}
                                <li className="border-b border-gray-100">
                                    <Link href="#" className="flex items-center justify-between py-3 group">
                                        <span className="text-xs text-blue-600 font-medium">View all</span>
                                        <ChevronRight className="w-3 h-3 text-blue-500" />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Related Articles */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-900">
                                    Related Articles
                                </h3>
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            </div>
                            <ul className="space-y-0 border-t border-gray-100">
                                {[
                                    `Why Do I Need To Have My Car's ${name} Serviced?`,
                                    `What's The Difference Between ${name} & Climate Control?`,
                                    `Does the ${name.toLowerCase()} affect a car's performance?`,
                                    `How Does ${name} Work in An Electric Car?`,
                                    "How To Cool Down A Hot Car"
                                ].map((article, idx) => (
                                    <li key={idx} className="border-b border-gray-100">
                                        <Link href="#" className="flex items-center justify-between py-3 group">
                                            <span className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                {article}
                                            </span>
                                            <ChevronRight className="w-3 h-3 text-blue-500 flex-shrink-0 ml-2" />
                                        </Link>
                                    </li>
                                ))}
                                <li className="border-b border-gray-100">
                                    <Link href="#" className="flex items-center justify-between py-3 group">
                                        <span className="text-xs text-blue-600 font-medium">View all</span>
                                        <ChevronRight className="w-3 h-3 text-blue-500" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Sticky Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="hidden md:block">
                        <h4 className="text-sm font-bold text-gray-900">{name}</h4>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">4.6 • 357 reviews</span>
                        </div>
                    </div>
                    <button
                        onClick={() => {
                            const quoteId = crypto.randomUUID();
                            const subServiceId = subServiceData?.subService?._id;
                            const params = new URLSearchParams({
                                step: 'location',
                                isProductFlow: 'false',
                                isFleet: 'false',
                                ...(subServiceId && { repairInspectionIds: subServiceId })
                            });
                            router.push(`/quote/${quoteId}?${params.toString()}`);
                        }}
                        className="bg-[#00D26A] hover:bg-[#00b85c] text-white font-bold py-3 px-8 rounded-md transition-colors uppercase tracking-wide text-sm"
                    >
                        Get a Quote
                    </button>
                </div>
            </div>

            {/* Spacer for sticky footer */}
            <div className="h-24"></div>
        </div>
    );
};

export default RepairDetailPage;
