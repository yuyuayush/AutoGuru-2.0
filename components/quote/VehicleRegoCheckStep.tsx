import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useVehicleLookup } from '@/hooks/useVehicle';
import { useQuoteStore } from '@/store/useQuoteStore';
import { toast } from 'sonner';
import { SearchableSelect } from '@/components/ui/SearchableSelect';
import { useCarMakes, useCarModels } from '@/hooks/useCarData';

const VehicleRegoCheckStep = () => {
    const router = useRouter();
    const params = useParams();
    const quoteId = params.quoteId as string;
    const { setVehicle } = useQuoteStore();

    const [mode, setMode] = useState<'rego' | 'manual'>('rego');
    const [rego, setRego] = useState('');
    const [state, setState] = useState('SA');

    // Manual Entry State
    const [manualData, setManualData] = useState({
        make: '',
        model: '',
        year: '',
        variant: ''
    });

    const vehicleLookup = useVehicleLookup();
    const isLoading = vehicleLookup.isPending;

    const { data: makesData } = useCarMakes();
    const { data: modelsData } = useCarModels(manualData.make);

    const handleFindCar = () => {
        if (!rego) {
            toast.error("Please enter a registration number");
            return;
        }

        vehicleLookup.mutate(
            { state, rego },
            {
                onSuccess: (vehicle) => {
                    setVehicle(vehicle);
                    toast.success("Vehicle found!");
                    router.push(`/quote/${quoteId}?step=task-select`);
                }
            }
        );
    };

    const handleManualSubmit = () => {
        const { make, model, year, variant } = manualData;
        if (!make || !model || !year) {
            toast.error("Please fill in Make, Model and Year");
            return;
        }

        const vehicle = {
            id: `manual-${Date.now()}`,
            name: `${make} ${model}`,
            details: `${year} ${variant}`.trim(),
            make,
            model,
            year,
            variant
        };

        setVehicle(vehicle);
        toast.success("Vehicle details saved!");
        router.push(`/quote/${quoteId}?step=task-select`);
    };

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => (currentYear + 1 - i).toString());

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Column - Main Content */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Let's find your exact car.
                    </h1>

                    <div className="max-w-xl">
                        {/* Toggle Tabs */}
                        <div className="flex p-1 bg-gray-100 rounded-lg mb-6 w-fit">
                            <button
                                onClick={() => setMode('rego')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${mode === 'rego'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                By Registration
                            </button>
                            <button
                                onClick={() => setMode('manual')}
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${mode === 'manual'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                By Make/Model
                            </button>
                        </div>

                        {mode === 'rego' ? (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex flex-col sm:flex-row gap-0 mb-4 border border-emerald-400 rounded-lg overflow-hidden shadow-sm h-14">
                                    {/* State Selector */}
                                    <div className="relative min-w-[80px] bg-[#00D09C]">
                                        <select
                                            className="w-full h-full appearance-none bg-transparent text-white font-medium px-4 py-3 pr-8 cursor-pointer focus:outline-none"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        >
                                            <option value="NSW">NSW</option>
                                            <option value="VIC">VIC</option>
                                            <option value="QLD">QLD</option>
                                            <option value="WA">WA</option>
                                            <option value="SA">SA</option>
                                            <option value="TAS">TAS</option>
                                            <option value="ACT">ACT</option>
                                            <option value="NT">NT</option>
                                        </select>
                                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
                                    </div>

                                    {/* Rego Input */}
                                    <div className="flex-1 bg-white">
                                        <input
                                            type="text"
                                            placeholder="Enter your rego"
                                            className="w-full h-full px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none uppercase"
                                            value={rego}
                                            onChange={(e) => setRego(e.target.value.toUpperCase())}
                                            onKeyDown={(e) => e.key === 'Enter' && handleFindCar()}
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <div className="bg-[#66E3C0] p-1">
                                        <button
                                            onClick={handleFindCar}
                                            disabled={isLoading}
                                            className="h-full px-6 py-2 bg-[#66E3C0] text-white font-medium hover:bg-[#5adbc8] transition-colors rounded disabled:opacity-70 flex items-center gap-2"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                </>
                                            ) : (
                                                "Find my car"
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Helper Text */}
                                <div className="flex items-start gap-3">
                                    <div className="border border-black rounded px-1 py-0.5 text-xs font-bold font-mono bg-white shrink-0">
                                        S123·ABC
                                        <div className="text-[6px] text-center leading-none mt-0.5">SOUTH AUSTRALIA</div>
                                    </div>
                                    <p className="text-gray-500 text-sm pt-1">
                                        Enter your registration number to quickly identify your car
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Brand</label>
                                        <SearchableSelect
                                            value={manualData.make}
                                            onChange={(value) => setManualData({ ...manualData, make: value, model: "" })}
                                            options={makesData?.makes || []}
                                            placeholder="Select Brand"
                                            className="border-gray-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Model</label>
                                        <SearchableSelect
                                            value={manualData.model}
                                            onChange={(value) => setManualData({ ...manualData, model: value })}
                                            options={modelsData?.models || []}
                                            placeholder="Select Model"
                                            disabled={!manualData.make}
                                            className="border-gray-200"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Year</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                                            value={manualData.year}
                                            onChange={(e) => setManualData({ ...manualData, year: e.target.value })}
                                        >
                                            <option value="">Select Year</option>
                                            {years.map(year => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Variant (Optional)</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            placeholder="e.g. Sport, LX"
                                            value={manualData.variant}
                                            onChange={(e) => setManualData({ ...manualData, variant: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleManualSubmit}
                                    disabled={!manualData.make || !manualData.model || !manualData.year}
                                    className="w-full mt-2 bg-[#1C2B39] text-white font-medium py-3 rounded hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    Confirm Vehicle <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="w-full lg:w-[300px] shrink-0">
                    <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <h2 className="text-[#1C2B39] text-2xl font-bold mb-1 font-sans uppercase tracking-tight">
                            BOOK NOW, PAY LATER
                        </h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Interest-free payments
                        </p>

                        <div className="space-y-4">
                            {/* Afterpay Placeholder */}
                            <div className="bg-[#B2FCE4] h-16 rounded flex items-center justify-center">
                                <span className="font-bold text-xl tracking-tighter">afterpay<span className="rotate-180 inline-block">v</span></span>
                            </div>

                            {/* Humm Placeholder */}
                            <div className="bg-white h-16 rounded border border-gray-100 flex items-center justify-center">
                                <span className="text-[#FF5A00] font-bold text-xl">humm</span>
                            </div>

                            {/* Zip Placeholder */}
                            <div className="bg-white h-16 rounded border border-gray-100 flex items-center justify-center">
                                <div className="flex items-center font-black italic text-2xl">
                                    <span>Z</span>
                                    <span className="bg-[#AA8FFF] w-6 h-6 block mx-0.5"></span>
                                    <span>P</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-[#1C2B39] text-2xl font-bold uppercase tracking-widest">
                                AVAILABLE
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleRegoCheckStep;
