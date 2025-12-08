import React from "react";
import SearchHero from "@/components/general/SearchHero";
import DynamicBreadcrumbs from "@/components/general/DynamicBreadcrumbs";

export default function MechanicsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black">
            <SearchHero
                title={
                    <span>
                        INSTANTLY BOOK YOUR NEXT CAR <span className="text-[#bf953f]">SERVICE</span>
                    </span>
                }
                subtitle="BOOK ONE OF OUR 1,700 AWESOME MECHANICS."
                backgroundImage="/car-service/engine.jpg"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <DynamicBreadcrumbs />
            </div>
            {children}
        </div>
    );
}
