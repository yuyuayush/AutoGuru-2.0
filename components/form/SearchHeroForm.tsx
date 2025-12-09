"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCarMakes, useCarModels } from "@/hooks/useCarData";
import { useQuoteStore } from "@/store/useQuoteStore";
import { SearchableSelect } from "@/components/ui/SearchableSelect";

export default function SearchHeroForm() {
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
        <div className="w-full max-w-5xl bg-[#1a1a1a]/95 backdrop-blur-sm border border-[#bf953f]/30 rounded-xl p-8 shadow-2xl">
            <h2 className=" text-center font-bold tracking-[0.2em] mb-8 text-sm md:text-base">
                ENTER YOUR DETAILS TO GET STARTED
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">

                <div className="flex flex-col md:flex-row gap-4 w-full mb-8">
                    {/* Make Dropdown */}
                    <div className="w-full md:w-1/3">
                        <SearchableSelect
                            value={make}
                            onChange={(value) => {
                                setMake(value);
                                setModel(""); // Reset model when make changes
                            }}
                            options={makes}
                            placeholder={isMakesLoading ? "Loading makes..." : "What do you drive?"}
                            disabled={isMakesLoading}
                            className="w-full bg-[#111] border border-white/10  py-3 rounded-lg hover:border-white/30 transition-colors"
                            dropdownClassName="bg-[#1a1a1a] border-white/10 "
                        />
                    </div>

                    {/* Model Dropdown */}
                    <div className="w-full md:w-1/3">
                        <SearchableSelect
                            value={model}
                            onChange={(value) => setModel(value)}
                            options={models}
                            placeholder={isModelsLoading ? "Loading models..." : "Which model?"}
                            disabled={!make || isModelsLoading}
                            className="w-full bg-[#111] border border-white/10  py-3 rounded-lg hover:border-white/30 transition-colors"
                            dropdownClassName="bg-[#1a1a1a] border-white/10 "
                        />
                    </div>

                    {/* Location Input */}
                    <div className="w-full md:w-1/3 relative">
                        <input
                            type="text"
                            className="w-full bg-[#111] border border-white/10  py-3 px-4 rounded-lg outline-none focus:border-white/30 transition-colors placeholder-gray-500"
                            placeholder="Postcode or Suburb"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={handleLocationClick}
                            disabled={isLocating}
                            className="absolute right-3 top-1/2 -translate-y-1/2  hover:text-white transition-colors disabled:opacity-50"
                            title="Use my current location"
                        >
                            {isLocating ? (
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <MapPin className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-gold-gradient text-white font-semibold px-12 py-4 rounded-lg shadow-[0_0_20px_rgba(191,149,63,0.3)] hover:shadow-[0_0_30px_rgba(191,149,63,0.5)] transition-all transform hover:-translate-y-1 w-full md:w-auto min-w-[200px]"
                >
                    Get Quotes
                </button>
            </form>
        </div>
    );
}
