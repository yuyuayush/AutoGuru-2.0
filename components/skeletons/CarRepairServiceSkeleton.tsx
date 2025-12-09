import React from "react";
import { HeroSkeleton } from "./HeroSkeleton";
import { CardGridSkeleton } from "./CardGridSkeleton";

const CarRepairServiceSkeleton = () => {
    return (
        <div className="bg-black min-h-screen">
            <HeroSkeleton />
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <CardGridSkeleton count={6} />
                </div>
            </section>
        </div>
    );
};

export default CarRepairServiceSkeleton;
