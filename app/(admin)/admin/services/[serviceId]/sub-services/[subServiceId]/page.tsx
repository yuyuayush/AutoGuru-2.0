"use client";

import { useCarSubService, useUpdateCarSubService } from "@/hooks/useCarSubService";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { RichTextEditor } from "@/components/ui/RichTextEditor";

export default function SubServiceDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const serviceId = params.serviceId as string;
    const subServiceId = params.subServiceId as string;

    const { data: subServiceData, isLoading } = useCarSubService(subServiceId);
    const updateSubService = useUpdateCarSubService();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        image: ""
    });

    useEffect(() => {
        if (subServiceData?.subService) {
            setFormData({
                name: subServiceData.subService.name,
                description: subServiceData.subService.description,
                price: subServiceData.subService.price,
                image: subServiceData.subService.image || ""
            });
        }
    }, [subServiceData]);

    const handleSaveSubService = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateSubService.mutateAsync({
                id: subServiceId,
                data: formData
            });
        } catch (error) {
            // Error handled in hook
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            </div>
        );
    }

    if (!subServiceData?.subService) return <div>Sub-Service not found</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href={`/admin/services/${serviceId}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{subServiceData.subService.name}</h1>
                    <p className="text-gray-500 mt-1">Sub-Service Details</p>
                </div>
            </div>

            <form onSubmit={handleSaveSubService} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Basic Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button type="submit" disabled={updateSubService.isPending} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors disabled:opacity-50">
                            <Save className="w-4 h-4" />
                            {updateSubService.isPending ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                {/* Right Column: Description */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm h-full flex flex-col">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
                        <div className="flex-1">
                            <RichTextEditor
                                value={formData.description}
                                onChange={(value) => setFormData({ ...formData, description: value })}
                                placeholder="Write a detailed description..."
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
