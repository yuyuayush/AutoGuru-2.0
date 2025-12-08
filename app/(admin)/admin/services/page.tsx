"use client";

import { MOCK_SERVICES } from "@/constants/dummyData";
import { useCarServices, useCreateCarService, useUpdateCarService, useDeleteCarService } from "@/hooks/useCarService";
import { DataTable } from "@/components/ui/DataTable";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useRouter } from "next/navigation";
import { CarService } from "@/types";
import { getServiceColumns } from "@/constants/tableColumns";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";

export default function ServicesPage() {
    const router = useRouter();
    const { data: services, isLoading } = useCarServices();
    // const services = MOCK_SERVICES;
    // const isLoading = false;
    const createService = useCreateCarService();
    const updateService = useUpdateCarService();
    const deleteService = useDeleteCarService();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<CarService | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: "Wrench",
        features: "",
        image: ""
    });

    const handleEdit = (service: CarService) => {
        router.push(`/admin/services/${service._id}`);
    };

    const handleDelete = (service: CarService) => {
        setSelectedService(service);
        setIsDeleteModalOpen(true);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createService.mutateAsync({
                ...formData,
                features: formData.features.split(",").map(f => f.trim()).filter(f => f)
            });
            setIsAddModalOpen(false);
            setFormData({ name: "", description: "", icon: "Wrench", features: "", image: "" });
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedService) return;
        try {
            await updateService.mutateAsync({
                id: selectedService._id,
                data: {
                    ...formData,
                    features: formData.features.split(",").map(f => f.trim()).filter(f => f)
                }
            });
            setIsEditModalOpen(false);
            setSelectedService(null);
        } catch (error) {
            // Error handled in hook
        }
    };

    const confirmDelete = async () => {
        if (!selectedService) return;
        try {
            await deleteService.mutateAsync(selectedService._id);
            setIsDeleteModalOpen(false);
            setSelectedService(null);
        } catch (error) {
            // Error handled in hook
        }
    };

    const columns = getServiceColumns(handleEdit, handleDelete);



    const data = services?.services || [];
    console.log(data);
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Services</h1>
                    <p className="text-gray-400 mt-1">Manage car repair services</p>
                </div>
                <button
                    onClick={() => {
                        setFormData({ name: "", description: "", icon: "Wrench", features: "", image: "" });
                        setIsAddModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Service
                </button>
            </div>
            {isLoading ? (
                <TableSkeleton showSearch={true} showAddButton={false} />
            ) : (
                <DataTable columns={columns} data={data} searchKey="title" searchPlaceholder="Search services..." />
            )}

            {/* Add Service Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Service">
                <form className="space-y-4" onSubmit={handleAddSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="e.g. Air Conditioning"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <ImageUpload
                            label="Service Image"
                            value={formData.image}
                            onChange={(base64) => setFormData({ ...formData, image: base64 })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Service description..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Regas, Leak Test, Repairs"
                            value={formData.features}
                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" disabled={createService.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                            {createService.isPending ? 'Adding...' : 'Add Service'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Edit Service Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Service">
                <form className="space-y-4" onSubmit={handleEditSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <ImageUpload
                            label="Service Image"
                            value={formData.image}
                            onChange={(base64) => setFormData({ ...formData, image: base64 })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            required
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.features}
                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" disabled={updateService.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                            {updateService.isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                loading={deleteService.isPending}
                title="Delete Service"
                description={`Are you sure you want to delete ${selectedService?.title}? This action cannot be undone.`}
            />
        </div>
    );
}
