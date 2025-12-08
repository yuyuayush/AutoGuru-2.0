"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { useCarMakes, useCarModels } from "@/hooks/useCarData";
import { useQuoteStore } from "@/store/useQuoteStore";
import { SearchableSelect } from "@/components/ui/SearchableSelect";

interface SearchHeroProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
}

export default function SearchHero({ title, subtitle, backgroundImage }: SearchHeroProps) {
    const router = useRouter();
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [location, setLocation] = useState("");
    const [isLocating, setIsLocating] = useState(false);

    const { setCustomerDetails, setVehicle } = useQuoteStore();

    // Fetch dynamic car data
    const { data: makesData, isLoading: isMakesLoading } = useCarMakes();
    const { data: modelsData, isLoading: isModelsLoading } = useCarModels(make);

    const makes = makesData?.makes || [];
    const models = modelsData?.models || [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!make || !model) {
            toast.error("Please select both make and model");
            return;
        }

        // Generate a random UUID for the quote
        const quoteId = crypto.randomUUID();

        // Save to store
        setVehicle({
            id: 'manual-entry',
            name: `${make} ${model}`,
            details: '',
            make: make,
            model: model
        });

        if (location) {
            setCustomerDetails("", "", location);
        }

        // Construct query parameters
        // Redirect to task-select step
        const params = new URLSearchParams({
            step: 'task-select',
            isProductFlow: 'false',
            isFleet: 'false'
        });

        router.push(`/quote/${quoteId}?${params.toString()}`);
    };

    const handleLocationClick = async () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                    );
                    const data = await response.json();

                    const suburb = data.locality || data.city || data.principalSubdivision;
                    const postcode = data.postcode;

                    const locationString = [suburb, postcode].filter(Boolean).join(" ");

                    if (locationString) {
                        setLocation(locationString);
                        toast.success("Location detected successfully");
                    } else {
                        toast.error("Could not determine your location");
                    }
                } catch (error) {
                    console.error("Error fetching location:", error);
                    toast.error("Failed to fetch location details");
                } finally {
                    setIsLocating(false);
                }
            },
            (error) => {
                console.error("Geolocation error:", error);
                let errorMessage = "Failed to detect location";
                if (error.code === error.PERMISSION_DENIED) {
                    errorMessage = "Location permission denied";
                }
                toast.error(errorMessage);
                setIsLocating(false);
            }
        );
    };

    return (
        <div className="relative w-full">
            {/* Hero Section with Background */}
            <div className="relative h-[500px] w-full flex flex-col items-center justify-center text-center px-4">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={backgroundImage}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto text-white mt-[-60px]">
                    <h1 className="text-4xl md:text-5xl font-serif mb-4 tracking-wide">
                        {title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 font-light">
                        {subtitle}
                    </p>
                </div>

                {/* Search Form - Overlapping the bottom of the hero image */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded shadow-xl flex flex-col md:flex-row items-center p-2 md:p-0"
                        >
                            {/* Make Dropdown */}
                            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 py-6 px-4">
                                <SearchableSelect
                                    value={make}
                                    onChange={(value) => {
                                        setMake(value);
                                        setModel(""); // Reset model when make changes
                                    }}
                                    options={makes}
                                    placeholder={isMakesLoading ? "Loading makes..." : "What do you drive?"}
                                    disabled={isMakesLoading}
                                    className="w-full border-none shadow-none text-gray-700 font-medium px-0 py-0 hover:border-none focus:ring-0"
                                    dropdownClassName="max-h-80"
                                />
                            </div>

                            {/* Model Dropdown */}
                            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 py-6 px-4">
                                <SearchableSelect
                                    value={model}
                                    onChange={(value) => setModel(value)}
                                    options={models}
                                    placeholder={isModelsLoading ? "Loading models..." : "Which model?"}
                                    disabled={!make || isModelsLoading}
                                    className="w-full border-none shadow-none text-gray-700 font-medium px-0 py-0 hover:border-none focus:ring-0"
                                    dropdownClassName="max-h-80"
                                />
                            </div>

                            {/* Location Input */}
                            <div className="w-full md:w-1/3 py-8 px-6 flex items-center relative">
                                <input
                                    type="text"
                                    className="w-full bg-transparent outline-none text-gray-700 font-medium placeholder-gray-500"
                                    placeholder="Postcode or Suburb"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={handleLocationClick}
                                    disabled={isLocating}
                                    className="ml-2 text-gray-400 hover:text-emerald-500 transition-colors disabled:opacity-50"
                                    title="Use my current location"
                                >
                                    {isLocating ? (
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <MapPin className="w-4 h-4" />
                                    )}
                                </button>
                            </div>

                            {/* Submit Button */}
                            <div className="w-full md:w-auto p-2">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-black text-white font-medium px-8 py-5 rounded flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors whitespace-nowrap"
                                >
                                    Let's go <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Features Bar - Below the hero and form */}
            <div className="bg-white pt-24 pb-12 px-4 border-b border-gray-100">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0" />
                        <div>
                            <h3 className="font-serif text-lg text-gray-900">Australia's #1 booking site</h3>
                            <p className="text-sm text-gray-500">for car services & car repairs</p>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0" />
                        <div>
                            <h3 className="font-serif text-lg text-gray-900">Book now, pay later</h3>
                            <p className="text-sm text-gray-500">Interest-free payments</p>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0" />
                        <div>
                            <h3 className="font-serif text-lg text-gray-900">Transparent prices</h3>
                            <p className="text-sm text-gray-500">no surprises</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
