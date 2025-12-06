"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useVehicleCompanies } from "@/hooks/useVehicleCompany";
import { useVehicleModels } from "@/hooks/useVehicleModel";
import { useServiceIntervals } from "@/hooks/useServiceInterval";
import ServiceIntervals from "@/components/car-servicing/ServiceIntervals";
import ModelSidebarLeft from "@/components/car-servicing/ModelSidebarLeft";
import ModelSidebarRight from "@/components/car-servicing/ModelSidebarRight";

const CarModelPage = () => {
    const params = useParams();
    const makeSlug = params.make as string;
    const modelSlug = params.model as string;

    const { data: companiesData, isLoading: companiesLoading } = useVehicleCompanies();
    const makeDetails = companiesData?.brands?.find((b: any) => b.slug === makeSlug);

    const { data: modelsData, isLoading: modelsLoading } = useVehicleModels(makeDetails?._id);
    const modelDetails = modelsData?.models?.find((m: any) => m.slug === modelSlug);

    const { data: intervalsData, isLoading: intervalsLoading } = useServiceIntervals(modelDetails?._id);

    if (companiesLoading || (makeDetails && modelsLoading) || (modelDetails && intervalsLoading)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    if (!makeDetails || !modelDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Not Found</h1>
                    <p className="text-gray-600 mb-8">Sorry, we don't have details for this car model yet.</p>
                    <Link href={`/car-servicing/${makeSlug}`} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Back to {makeDetails?.name || "Car Servicing"}
                    </Link>
                </div>
            </div>
        );
    }

    // Prepare other models for the sidebar
    const otherModels = modelsData?.models
        ?.filter((m: any) => m.slug !== modelSlug)
        .map((m: any) => ({ name: m.name, slug: m.slug })) || [];

    // Format intervals for display
    const formattedIntervals = intervalsData?.intervals?.map((i: any) => 
        `${i.distance} kms / ${i.timeInMonths} months`
    ) || [];

    return (
        <div className="min-h-screen bg-white">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Sidebar */}
                    <div className="lg:w-1/4">
                        <ModelSidebarLeft
                            makeName={makeDetails.name}
                            modelName={modelDetails.name}
                            image={modelDetails.imageUrl || "/car-service/car-image.png"}
                            rating={modelDetails.rating || 4.5}
                            quotesProvided={modelDetails.quotesProvided || "1000+"}
                            expertMechanics={modelDetails.expertMechanics || "500+"}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-1/2">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">What else should I know about {modelDetails.name}?</h1>

                        <div className="prose prose-lg text-gray-600 mb-8">
                            <p>
                                <span className="text-blue-600 font-medium">{makeDetails.name}</span> {modelDetails.name} car servicing costs can vary significantly when comparing local independent workshops, franchise servicing chains, and dealerships. Our car service guide provides a comprehensive list of scheduled service intervals for logbook servicing, the work required, and the cost. Simply select your {modelDetails.name}, the car service you need, and then add your postcode or town/suburb.
                            </p>
                            {modelDetails.description && (
                                <p className="mt-4">{modelDetails.description}</p>
                            )}
                        </div>

                        <ServiceIntervals
                            makeName={makeDetails.name}
                            modelName={modelDetails.name}
                            intervals={formattedIntervals}
                        />

                        {modelDetails.commonRepairs && modelDetails.commonRepairs.length > 0 && (
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">What are some common {modelDetails.name} repairs?</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {modelDetails.commonRepairs.map((repair: string, index: number) => (
                                        <div key={index} className="flex items-start">
                                            <span className="text-gray-700">{repair}</span>
                                        </div>
                                    ))}
                                    <div className="col-span-1 md:col-span-2 mt-4">
                                        <Link href={`/car-servicing/${makeSlug}/repairs`} className="text-blue-600 font-medium hover:underline flex items-center">
                                            See all repairs
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:w-1/4">
                        <ModelSidebarRight 
                            makeName={makeDetails.name}
                            modelName={modelDetails.name}
                            otherModels={otherModels}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CarModelPage;
