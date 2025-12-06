"use client";

import { useParams } from "next/navigation";
import { useVehicleCompanies } from "@/hooks/useVehicleCompany";
import { useVehicleModels } from "@/hooks/useVehicleModel";
import Link from "next/link";

import ServiceCosts from "@/components/car-servicing/ServiceCosts";
import ModelComparison from "@/components/car-servicing/ModelComparison";
import CommonRepairs from "@/components/car-servicing/CommonRepairs";
import ServiceLocations from "@/components/car-servicing/ServiceLocations";

const CarMakePage = () => {
    const params = useParams();
    const { data: companiesData, isLoading: companiesLoading } = useVehicleCompanies();
    const makeSlug = params.make as string;

    const details = companiesData?.brands?.find((b: any) => b.slug === makeSlug);
    const { data: modelsData, isLoading: modelsLoading } = useVehicleModels(details?._id);

    if (companiesLoading || (details && modelsLoading)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!details) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Car Not Found</h1>
                    <p className="text-gray-600 mb-8">Sorry, we don't have details for this car make yet.</p>
                    <Link href="/car-servicing" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Back to Car Servicing
                    </Link>
                </div>
            </div>
        );
    }

    // Prepare data for ModelComparison
    const allModels = modelsData?.models || [];
    const popularModels = allModels.slice(0, 4).map((model: any) => ({
        name: model.name,
        image: model.imageUrl || "/car-service/car-image.png", // Fallback image
        slug: model.slug
    }));
    const otherModels = allModels.slice(4).map((model: any) => model.name);

    return (
        <div className="min-h-screen bg-white">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="flex items-center gap-4 mb-6">
                            {details.image && (
                                <img src={details.image} alt={details.name} className="w-16 h-16 object-contain" />
                            )}
                            <h1 className="text-4xl font-extrabold text-gray-900">{details.name}</h1>
                        </div>

                        <div className="prose prose-lg text-gray-600 mb-8">
                            <p className="mb-6">{details.description || `Expert servicing and repairs for your ${details.name}.`}</p>
                            {details.facts && (
                                <p className="mb-6"><span className="font-bold">{details.name} facts:</span> {details.facts}</p>
                            )}
                        </div>

                        <ServiceCosts
                            makeName={details.name}
                            costs={{
                                logbook: details.logbookCost || 0,
                                basic: details.basicCost || 0
                            }}
                        />

                        <ModelComparison
                            makeName={details.name}
                            popularModels={popularModels}
                            otherModels={otherModels}
                        />

                        <CommonRepairs makeName={details.name} repairs={details.commonRepairs || []} />

                        <ServiceLocations
                            makeName={details.name}
                            serviceCentres={details.serviceCentres || {}}
                            mobileMechanics={details.mobileMechanics || {}}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 p-6 rounded-xl sticky top-24">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href={`/car-servicing/${makeSlug}/logbook-service`} className="text-blue-600 hover:underline hover:text-blue-800 transition-colors block py-1">
                                        Logbook Service
                                    </Link>
                                </li>
                                <li>
                                    <Link href={`/car-servicing/${makeSlug}/repairs`} className="text-blue-600 hover:underline hover:text-blue-800 transition-colors block py-1">
                                        Common Repairs
                                    </Link>
                                </li>
                            </ul>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-2">Need help?</h4>
                                <p className="text-gray-600 text-sm mb-4">
                                    Our team is here to assist you with any questions about servicing your {details.name}.
                                </p>
                                <button className="w-full bg-emerald-500 text-white py-2 rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                                    Contact Support
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CarMakePage;
