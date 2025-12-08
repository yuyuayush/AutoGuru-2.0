import React from "react";
import SearchHero from "@/components/general/SearchHero";
import DynamicBreadcrumbs from "@/components/general/DynamicBreadcrumbs";

export default function AirConditioningLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <SearchHero
                title={
                    <span>
                        CAR AIR CONDITIONING <span className="text-[#bf953f]">SERVICE</span> & REPAIR
                    </span>
                }
                subtitle="KEEP YOUR COOL WITH A CAR AIR CONDITIONING SERVICE"
                backgroundImage="/car-service/air-conditioning.png"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <DynamicBreadcrumbs />
            </div>
            {children}
        </div>
    );
}
