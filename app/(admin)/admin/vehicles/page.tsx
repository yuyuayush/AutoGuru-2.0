"use client";

import { DataTable } from "@/components/ui/DataTable";
import { Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { VehicleMake } from "@/types";
import { getVehicleMakeColumns } from "@/constants/tableColumns";
import { useVehicleCompanies, useCreateVehicleCompany, useDeleteVehicleCompany } from "@/hooks/useVehicleCompany";
import { TableSkeleton } from "@/components/skeletons/TableSkeleton";

export default function VehiclesPage() {
    const router = useRouter();
    const { data: vehiclesData, isLoading } = useVehicleCompanies();
    const createCompany = useCreateVehicleCompany();
    const deleteCompany = useDeleteVehicleCompany();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMake, setSelectedMake] = useState<VehicleMake | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        description: ""
    });

    const handleView = (make: VehicleMake) => {
        router.push(`/admin/vehicles/${make.id}`);
    };

    const handleDelete = (make: VehicleMake) => {
        setSelectedMake(make);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!selectedMake) return;
        try {
            await deleteCompany.mutateAsync(selectedMake.id);
            setIsDeleteModalOpen(false);
            setSelectedMake(null);
        } catch (error) {
            // Error handled in hook
        }
    };

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createCompany.mutateAsync(formData);
            setIsAddModalOpen(false);
            setFormData({ name: "", image: "", description: "" });
        } catch (error) {
            // Error handled in hook
        }
    };

    const columns = getVehicleMakeColumns(handleView, handleDelete);

    const vehicles = (vehiclesData?.brands || []).map((v: any) => ({
        ...v,
        id: v._id || v.id,
        models: v.models || []
    }));




    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Vehicle Companies</h1>
                    <p className="text-gray-500 mt-1">Manage vehicle companies and models</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Company
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                {isLoading ? (
                    <TableSkeleton showSearch={true} showAddButton={false} />
                ) : (
                    <DataTable columns={columns} data={vehicles} searchKey="name" searchPlaceholder="Search companies..." />
                )}
            </div>

            {/* Add Company Modal */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Add New Vehicle Company">
                <form className="space-y-4" onSubmit={handleAddSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="e.g. BMW"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <ImageUpload
                            label="Logo"
                            value={formData.image}
                            onChange={(base64) => setFormData({ ...formData, image: base64 })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Description..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md text-sm font-medium">Cancel</button>
                        <button type="submit" disabled={createCompany.isPending} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium disabled:opacity-50">
                            {createCompany.isPending ? 'Adding...' : 'Add Company'}
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                loading={deleteCompany.isPending}
                title="Delete Vehicle Make"
                description={`Are you sure you want to delete ${selectedMake?.name}? This action cannot be undone.`}
            />
        </div>
    );
}
