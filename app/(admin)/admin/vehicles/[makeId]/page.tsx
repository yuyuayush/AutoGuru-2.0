"use client";

import { DataTable } from "@/components/ui/DataTable";
import { ArrowLeft, Plus, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { VehicleMake, VehicleModel } from "@/types";
import { getVehicleModelColumns } from "@/constants/tableColumns";
import { useVehicleCompany, useUpdateVehicleCompany } from "@/hooks/useVehicleCompany";
import { useVehicleModels, useCreateVehicleModel, useDeleteVehicleModel } from "@/hooks/useVehicleModel";
import { Skeleton } from "@/components/skeletons/Skeleton";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";

export default function MakeDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const makeId = params.makeId as string;

    const { data: makeData, isLoading: isMakeLoading } = useVehicleCompany(makeId);
    const { data: modelsData, isLoading: isModelsLoading } = useVehicleModels(makeId);

    const updateCompany = useUpdateVehicleCompany();
    const createModel = useCreateVehicleModel();
    const deleteModel = useDeleteVehicleModel();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState<VehicleModel | null>(null);

    // Make form state
    const [makeFormData, setMakeFormData] = useState<Partial<VehicleMake>>({});

    // Model form state
    const [modelFormData, setModelFormData] = useState({
        name: "",
        imageUrl: "",
        description: "",
        logbookCost: 0,
        basicCost: 0
    });

    useEffect(() => {
        if (makeData?.brand) {
            setMakeFormData({
                ...makeData.brand,
                serviceCosts: {
                    logbook: makeData.brand.logbookCost || 0,
                    basic: makeData.brand.basicCost || 0
                }
            });
        }
    }, [makeData]);

    const handleViewModel = (model: VehicleModel) => {
        router.push(`/admin/vehicles/${makeId}/models/${model.id}`);
    };

    const handleDeleteModel = (model: VehicleModel) => {
        setSelectedModel(model);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteModel = async () => {
        if (!selectedModel) return;
        try {
            await deleteModel.mutateAsync(selectedModel.id);
            setIsDeleteModalOpen(false);
            setSelectedModel(null);
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleSaveMake = async (e: React.FormEvent) => {
        e.preventDefault();

        // Extract costs from serviceCosts to top-level fields for backend
        const dataToSend = {
            ...makeFormData,
            logbookCost: (makeFormData.serviceCosts as any)?.logbookCost || makeFormData.serviceCosts?.logbook || 0,
            basicCost: (makeFormData.serviceCosts as any)?.basicCost || makeFormData.serviceCosts?.basic || 0
        };

        try {
            await updateCompany.mutateAsync({ id: makeId, data: dataToSend });
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleAddModelSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createModel.mutateAsync({
                ...modelFormData,
                brand: makeId
            });
            setIsAddModalOpen(false);
            setModelFormData({ name: "", imageUrl: "", description: "", logbookCost: 0, basicCost: 0 });
        } catch (error) {
            // Error handled in hook
        }
    };

    const columns = getVehicleModelColumns(handleViewModel, handleDeleteModel);

    if (isMakeLoading) {
        return (
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-6">
                            <Skeleton className="h-6 w-32" />
                            <div className="space-y-4">
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-40 w-full" />
                                <Skeleton className="h-24 w-full" />
                                <Skeleton className="h-24 w-full" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <TableSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    const make = makeData?.brand ? {
        ...makeData.brand,
        id: makeData.brand._id || makeData.brand.id,
        serviceCosts: {
            logbook: makeData.brand.logbookCost || 0,
            basic: makeData.brand.basicCost || 0
        }
    } : null;

    const models = (modelsData?.models || []).map((m: any) => ({
        ...m,
        id: m._id || m.id
    }));

    console.log("Models Data:", models);


    if (!make) return <div>Make not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/vehicles" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{make.name}</h1>
                    <p className="text-gray-500 mt-1">Manage company details and models</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Company Details Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h2>
                        <form onSubmit={handleSaveMake} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={makeFormData.name || ""}
                                    onChange={(e) => setMakeFormData({ ...makeFormData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    label="image"
                                    value={makeFormData.image || ""}
                                    onChange={(base64) => setMakeFormData({ ...makeFormData, image: base64 })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={4}
                                    value={makeFormData.description || ""}
                                    onChange={(e) => setMakeFormData({ ...makeFormData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facts</label>
                                <textarea
                                    rows={4}
                                    value={makeFormData.facts || ""}
                                    onChange={(e) => setMakeFormData({ ...makeFormData, facts: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Logbook Cost</label>
                                    <input
                                        type="number"
                                        value={makeFormData.serviceCosts?.logbook || 0}
                                        onChange={(e) => setMakeFormData({
                                            ...makeFormData,
                                            serviceCosts: { ...makeFormData.serviceCosts, logbook: Number(e.target.value) } as any
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Basic Cost</label>
                                    <input
                                        type="number"
                                        value={makeFormData.serviceCosts?.basic || 0}
                                        onChange={(e) => setMakeFormData({
                                            ...makeFormData,
                                            serviceCosts: { ...makeFormData.serviceCosts, basic: Number(e.target.value) } as any
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <button type="submit" disabled={updateCompany.isPending} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors disabled:opacity-50">
                                <Save className="w-4 h-4" />
                                {updateCompany.isPending ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Models List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Models</h2>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Model
                            </button>
                        </div>
                        {isModelsLoading ? (
                            <TableSkeleton showSearch={true} showAddButton={false} />
                        ) : (
                            <DataTable columns={columns} data={models} searchKey="name" searchPlaceholder="Search models..." />
                        )}
                    </div>
                </div>
            </div>

            {/* Add Model Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Model">
                <form className="space-y-4" onSubmit={handleAddModelSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="e.g. Corolla"
                            value={modelFormData.name}
                            onChange={(e) => setModelFormData({ ...modelFormData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <ImageUpload
                            label="Image"
                            value={modelFormData.imageUrl}
                            onChange={(base64) => setModelFormData({ ...modelFormData, imageUrl: base64 })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Description..."
                            value={modelFormData.description}
                            onChange={(e) => setModelFormData({ ...modelFormData, description: e.target.value })}
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" disabled={createModel.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                            {createModel.isPending ? 'Adding...' : 'Add Model'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteModel}
                loading={deleteModel.isPending}
                title="Delete Model"
                description={`Are you sure you want to delete ${selectedModel?.name}? This action cannot be undone.`}
            />
        </div>
    );
}
