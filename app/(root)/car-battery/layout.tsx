import React from "react";
import SearchHero from "@/components/general/SearchHero";
import DynamicBreadcrumbs from "@/components/general/DynamicBreadcrumbs";

export default function CarBatteryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <SearchHero
                title={
                    <span>
                        CAR BATTERY <span className="text-[#bf953f]">REPLACEMENT</span>
                    </span>
                }
                subtitle="GET ROADSIDE ASSISTANCE OR FIND SPECIALISTS NEAR YOU"
                backgroundImage="/car-service/car-battery.jpg"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <DynamicBreadcrumbs />
            </div>
            {children}
        </div>
    );
}
