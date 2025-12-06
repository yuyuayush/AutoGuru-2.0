"use client";

import { useCarSubServices, useCreateCarSubService, useUpdateCarSubService, useDeleteCarSubService } from "@/hooks/useCarSubService";
import { useCarServices } from "@/hooks/useCarService";
import { DataTable } from "@/components/ui/DataTable";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { SubService } from "@/types";
import { getSubServiceColumns } from "@/constants/tableColumns";
import { toast } from "sonner";

export default function SubServicesPage() {
    const { data: subServicesData, isLoading } = useCarSubServices();
    const { data: servicesData } = useCarServices();

    const createSubService = useCreateCarSubService();
    const updateSubService = useUpdateCarSubService();
    const deleteSubService = useDeleteCarSubService();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        image: "",
        serviceId: ""
    });

    const handleEdit = (subService: SubService) => {
        setSelectedSubService(subService);
        setFormData({
            name: subService.name,
            description: subService.description,
            price: subService.price,
            image: subService.image || "",
            serviceId: subService.serviceId || ""
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = (subService: SubService) => {
        setSelectedSubService(subService);
        setIsDeleteModalOpen(true);
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createSubService.mutateAsync(formData);
            setIsAddModalOpen(false);
            setFormData({ name: "", description: "", price: 0, image: "", serviceId: "" });
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSubService) return;
        try {
            await updateSubService.mutateAsync({
                id: selectedSubService.id,
                data: formData
            });
            setIsEditModalOpen(false);
            setSelectedSubService(null);
        } catch (error) {
            // Error handled in hook
        }
    };

    const confirmDelete = async () => {
        if (!selectedSubService) return;
        try {
            await deleteSubService.mutateAsync(selectedSubService.id);
            setIsDeleteModalOpen(false);
            setSelectedSubService(null);
        } catch (error) {
            // Error handled in hook
        }
    };

    const columns = getSubServiceColumns(handleEdit, handleDelete);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            </div>
        );
    }

    const data = subServicesData?.subServices || [];
    const services = servicesData?.services || [];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sub-Services</h1>
                    <p className="text-gray-500 mt-1">Manage all sub-services across categories</p>
                </div>
                <button
                    onClick={() => {
                        setFormData({ name: "", description: "", price: 0, image: "", serviceId: "" });
                        setIsAddModalOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Sub-Service
                </button>
            </div>

            <DataTable columns={columns} data={data} searchKey="name" searchPlaceholder="Search sub-services..." />

            {/* Add Sub-Service Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Sub-Service">
                <form className="space-y-4" onSubmit={handleAddSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Service</label>
                        <select
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.serviceId}
                            onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        >
                            <option value="">Select a service</option>
                            {services.map((service: any) => (
                                <option key={service._id} value={service._id}>
                                    {service.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="e.g. Oil Change"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <ImageUpload
                            label="Sub-Service Image"
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
                            placeholder="Description..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
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

            {/* Edit Sub-Service Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Sub-Service">
                <form className="space-y-4" onSubmit={handleEditSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Parent Service</label>
                        <select
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.serviceId}
                            onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                        >
                            <option value="">Select a service</option>
                            {services.map((service: any) => (
                                <option key={service._id} value={service._id}>
                                    {service.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
                            label="Sub-Service Image"
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                            type="number"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" disabled={updateSubService.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                            {updateSubService.isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                loading={deleteSubService.isPending}
                title="Delete Sub-Service"
                description={`Are you sure you want to delete ${selectedSubService?.name}? This action cannot be undone.`}
            />
        </div>
    );
}
