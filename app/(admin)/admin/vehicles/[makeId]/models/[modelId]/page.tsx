"use client"

import { ArrowLeft, Save, Plus, Trash, Pencil, X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useVehicleModel, useUpdateVehicleModel } from "@/hooks/useVehicleModel";
import { useVehicleCompany } from "@/hooks/useVehicleCompany";
import { useServiceIntervals, useCreateServiceInterval, useDeleteServiceInterval, useUpdateServiceInterval } from "@/hooks/useServiceInterval";
import { ModelDetailsSkeleton } from "@/components/skeletons/ModelDetailsSkeleton";
import { ServiceIntervalsSkeleton } from "@/components/skeletons/ServiceIntervalsSkeleton";

export default function ModelDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const makeId = params.makeId as string;
    const modelId = params.modelId as string;

    const { data: makeData, isLoading: isMakeLoading } = useVehicleCompany(makeId);
    const { data: modelData, isLoading: isModelLoading } = useVehicleModel(modelId);
    const { data: intervalsData, isLoading: isIntervalsLoading } = useServiceIntervals(modelId);
    const updateModel = useUpdateVehicleModel();
    const createInterval = useCreateServiceInterval();
    const deleteInterval = useDeleteServiceInterval();
    const updateInterval = useUpdateServiceInterval();

    const [model, setModel] = useState<any>(null);

    type ServiceInterval = {
        _id?: string; // Add _id for editing
        distance: number;
        timeInMonths: number;
        price: number;
    };

    const [newInterval, setNewInterval] = useState<ServiceInterval>({ distance: 10000, timeInMonths: 6, price: 0 });
    const [editingIntervalId, setEditingIntervalId] = useState<string | null>(null);

    useEffect(() => {
        if (modelData) {
            setModel({
                ...modelData,
                id: modelData._id || modelData.id
            });
        }
    }, [modelData]);

    const handleSaveModel = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Exclude serviceIntervals from the update payload to prevent overwriting/deleting them
            // via the legacy backend logic. They are managed via separate API now.
            const { serviceIntervals, ...modelDataToSave } = model;
            await updateModel.mutateAsync({
                id: modelId,
                data: modelDataToSave
            });
            // Success toast handled in hook
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleAddInterval = async () => {
        if (newInterval.price > 0) {
            try {
                await createInterval.mutateAsync({
                    vehicleModel: modelId,
                    ...newInterval
                });
                setNewInterval({ distance: 10000, timeInMonths: 6, price: 0 }); // Reset to default
            } catch (error) {
                // Error handled in hook
            }
        } else {
            toast.error("Please enter a valid price");
        }
    };

    const handleUpdateInterval = async () => {
        if (!editingIntervalId) return;

        if (newInterval.price > 0) {
            try {
                await updateInterval.mutateAsync({
                    id: editingIntervalId,
                    data: {
                        vehicleModel: modelId,
                        distance: newInterval.distance,
                        timeInMonths: newInterval.timeInMonths,
                        price: newInterval.price
                    }
                });
                setEditingIntervalId(null);
                setNewInterval({ distance: 10000, timeInMonths: 6, price: 0 }); // Reset to default
            } catch (error) {
                // Error handled in hook
            }
        } else {
            toast.error("Please enter a valid price");
        }
    };

    const handleEditInterval = (interval: ServiceInterval) => {
        if (interval._id) {
            setEditingIntervalId(interval._id);
            setNewInterval({
                distance: interval.distance,
                timeInMonths: interval.timeInMonths,
                price: interval.price
            });
        }
    };

    const handleCancelEdit = () => {
        setEditingIntervalId(null);
        setNewInterval({ distance: 10000, timeInMonths: 6, price: 0 });
    };

    const handleDeleteInterval = async (id: string) => {
        if (!id) return;
        if (editingIntervalId === id) {
            handleCancelEdit();
        }
        try {
            await deleteInterval.mutateAsync(id);
        } catch (error) {
            // Error handled in hook
        }
    };

    if (isMakeLoading || isModelLoading || !model) {
        return <ModelDetailsSkeleton />;
    }

    const makeName = makeData?.brand?.name || "Unknown Make";

    const kmOptions = Array.from({ length: 40 }, (_, i) => (i + 1) * 5000); // 5,000 to 200,000
    const monthOptions = Array.from({ length: 20 }, (_, i) => (i + 1) * 6); // 6 to 120 months

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href={`/admin/vehicles/${makeId}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{model.name}</h1>
                    <p className="text-gray-500 mt-1">{makeName} Model Details</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Model Details Form */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-2">Model Information</h2>
                        <form onSubmit={handleSaveModel} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={model.name || ""}
                                    onChange={(e) => setModel({ ...model, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    label="Model Image"
                                    value={model.image || ""}
                                    onChange={(base64) => setModel({ ...model, image: base64 })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={4}
                                    value={model.description || ""}
                                    onChange={(e) => setModel({ ...model, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Quotes Provided</label>
                                    <input
                                        type="text"
                                        value={model.quotesProvided || ""}
                                        onChange={(e) => setModel({ ...model, quotesProvided: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expert Mechanics</label>
                                    <input
                                        type="text"
                                        value={model.expertMechanics || ""}
                                        onChange={(e) => setModel({ ...model, expertMechanics: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={updateModel.isPending} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm disabled:opacity-50">
                                <Save className="w-4 h-4" />
                                {updateModel.isPending ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Service Intervals */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6 border-b pb-2">Service Intervals</h2>

                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">
                                {editingIntervalId ? 'Edit Interval' : 'Add New Interval'}
                            </h3>
                            <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-4">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Distance</label>
                                    <select
                                        value={newInterval.distance}
                                        onChange={(e) => setNewInterval({ ...newInterval, distance: Number(e.target.value) })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                                    >
                                        {kmOptions.map(km => (
                                            <option key={km} value={km}>{km.toLocaleString()} km</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-4">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                                    <select
                                        value={newInterval.timeInMonths}
                                        onChange={(e) => setNewInterval({ ...newInterval, timeInMonths: Number(e.target.value) })}
                                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                                    >
                                        {monthOptions.map(m => (
                                            <option key={m} value={m}>{m} months</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-span-4">
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Price</label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                                            <input
                                                type="number"
                                                value={newInterval.price || ""}
                                                onChange={(e) => setNewInterval({ ...newInterval, price: Number(e.target.value) })}
                                                placeholder="0.00"
                                                className="w-full pl-6 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                                            />
                                        </div>
                                        {editingIntervalId ? (
                                            <>
                                                <button
                                                    onClick={handleUpdateInterval}
                                                    disabled={updateInterval.isPending}
                                                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm transition-all flex items-center justify-center disabled:opacity-50"
                                                    title="Update Interval"
                                                >
                                                    {updateInterval.isPending ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 shadow-sm transition-all flex items-center justify-center"
                                                    title="Cancel Edit"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={handleAddInterval}
                                                disabled={createInterval.isPending}
                                                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center disabled:opacity-50"
                                                title="Add Interval"
                                            >
                                                {createInterval.isPending ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus className="w-4 h-4" />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-1">
                            {isIntervalsLoading ? (
                                <ServiceIntervalsSkeleton />
                            ) : intervalsData?.intervals?.length > 0 ? (
                                <div className="space-y-2">
                                    {intervalsData.intervals.map((interval: any, index: number) => (
                                        <div key={interval._id || index} className={`group flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg border transition-all ${editingIntervalId === interval._id ? 'bg-blue-50 border-blue-200' : 'border-transparent hover:border-gray-100'}`}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium text-xs">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900 text-sm">{interval.distance.toLocaleString()} km</div>
                                                    <div className="text-xs text-gray-500">{interval.timeInMonths} months</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-900 mr-4">${interval.price.toLocaleString()}</span>
                                                <button
                                                    onClick={() => handleEditInterval(interval)}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                                    title="Edit Interval"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteInterval(interval._id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                                                    title="Delete Interval"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                                        <Plus className="w-6 h-6 text-gray-300" />
                                    </div>
                                    <p className="text-sm">No service intervals defined yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
