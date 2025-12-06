"use client";

import { DataTable } from "@/components/ui/DataTable";
import { useCarService, useUpdateCarService } from "@/hooks/useCarService";
import { useCarSubServices, useCreateCarSubService, useDeleteCarSubService, useUpdateCarSubService } from "@/hooks/useCarSubService";
import { ArrowLeft, Plus, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { RichTextEditor } from "@/components/ui/RichTextEditor";
import { CarService, SubService } from "@/types";
import { getSubServiceColumns } from "@/constants/tableColumns";

export default function ServiceDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const serviceId = params.serviceId as string;

    const { data: serviceData, isLoading: isServiceLoading } = useCarService(serviceId);
    const { data: subServicesData, isLoading: isSubServicesLoading } = useCarSubServices(serviceId);

    const updateService = useUpdateCarService();
    const createSubService = useCreateCarSubService();
    const updateSubService = useUpdateCarSubService();
    const deleteSubService = useDeleteCarSubService();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);

    // Service form state
    const [serviceFormData, setServiceFormData] = useState<Partial<CarService>>({});

    // Sub-service form state
    const [subServiceFormData, setSubServiceFormData] = useState({
        name: "",
        description: "",
        price: 0,
        image: ""
    });

    useEffect(() => {
        if (serviceData) {
            setServiceFormData(serviceData);
        }
    }, [serviceData]);

    const handleViewSubService = (subService: SubService) => {
        router.push(`/admin/services/${serviceId}/sub-services/${subService._id}`);
    };

    const handleDeleteSubService = (subService: SubService) => {
        setSelectedSubService(subService);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteSubService = async () => {
        if (!selectedSubService) return;
        try {
            await deleteSubService.mutateAsync(selectedSubService._id);
            setIsDeleteModalOpen(false);
            setSelectedSubService(null);
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleSaveService = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateService.mutateAsync({ id: serviceId, data: serviceFormData });
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleAddSubService = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createSubService.mutateAsync({
                ...subServiceFormData,
                service: serviceId
            });
            setIsAddModalOpen(false);
            setSubServiceFormData({ name: "", description: "", price: 0, image: "" });
        } catch (error) {
            // Error handled in hook
        }
    };

    const columns = getSubServiceColumns(handleViewSubService, handleDeleteSubService);

    if (isServiceLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            </div>
        );
    }

    if (!serviceData) return <div>Service not found</div>;

    return (
        <div className="space-y-6">
            {/* ... (Header and Service Details Form remain same) ... */}
            <div className="flex items-center gap-4">
                <Link href="/admin/services" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{serviceData.title}</h1>
                    <p className="text-gray-500 mt-1">Manage service details and sub-services</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Service Details Form */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h2>
                        <form onSubmit={handleSaveService} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={serviceFormData.name || ""}
                                    onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                                <input
                                    type="text"
                                    value={serviceFormData.slug || ""}
                                    onChange={(e) => setServiceFormData({ ...serviceFormData, slug: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <ImageUpload
                                    label="Service Image"
                                    value={serviceFormData.image || ""}
                                    onChange={(base64) => setServiceFormData({ ...serviceFormData, image: base64 })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={4}
                                    value={serviceFormData.description || ""}
                                    onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <input
                                    type="text"
                                    value={serviceFormData.icon || ""}
                                    onChange={(e) => setServiceFormData({ ...serviceFormData, icon: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <button type="submit" disabled={updateService.isPending} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors disabled:opacity-50">
                                <Save className="w-4 h-4" />
                                {updateService.isPending ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Sub-Services List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Sub-Services</h2>
                            <button
                                onClick={() => {
                                    setSubServiceFormData({ name: "", description: "", price: 0, image: "" });
                                    setIsAddModalOpen(true);
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                Add Sub-Service
                            </button>
                        </div>
                        <DataTable columns={columns} data={subServicesData?.subServices || []} searchKey="name" searchPlaceholder="Search sub-services..." />
                    </div>
                </div>
            </div>

            {/* Add Sub-Service Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Sub-Service">
                <form className="space-y-4" onSubmit={handleAddSubService}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="e.g. Oil Change"
                            value={subServiceFormData.name}
                            onChange={(e) => setSubServiceFormData({ ...subServiceFormData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <ImageUpload
                            label="Sub-Service Image"
                            value={subServiceFormData.image || ""}
                            onChange={(base64) => setSubServiceFormData({ ...subServiceFormData, image: base64 })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                            value={subServiceFormData.price}
                            onChange={(e) => setSubServiceFormData({ ...subServiceFormData, price: Number(e.target.value) })}
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" disabled={createSubService.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                            {createSubService.isPending ? 'Adding...' : 'Add Sub-Service'}
                        </button>
                    </div>
                </form>
            </Modal>
            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteSubService}
                loading={deleteSubService.isPending}
                title="Delete Sub-Service"
                description={`Are you sure you want to delete ${selectedSubService?.name}? This action cannot be undone.`}
            />
        </div>
    );
}
