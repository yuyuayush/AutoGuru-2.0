"use client";

import Link from "next/link";
import { useVehicleCompanies } from "@/hooks/useVehicleCompany";
import { Skeleton } from "@/components/skeletons/Skeleton";

const CarBrandList = () => {
    const { data: VehicleCompanies, isLoading } = useVehicleCompanies();

    if (isLoading) {
        return (
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {[...Array(15)].map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full rounded-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const brands = VehicleCompanies?.brands || [];

    return (
        <div className="py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header removed to make component reusable */}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {brands.map((brand: any) => (
                        <Link
                            key={brand.slug}
                            href={`/car-servicing/${brand.slug}`}
                            className="group flex items-center justify-center p-4 bg-emerald-400 rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            <span className="text-gray-900 font-semibold text-lg group-hover:text-white transition-colors">
                                {brand.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarBrandList;
