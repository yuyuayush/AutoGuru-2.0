"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash, Wrench, Edit } from "lucide-react";
import { VehicleMake, VehicleModel, CarService, SubService } from "@/types";

export const getVehicleMakeColumns = (
    onView: (make: VehicleMake) => void,
    onDelete: (make: VehicleMake) => void
): ColumnDef<VehicleMake>[] => [
        {
            accessorKey: "name",
            header: "Company",
            cell: ({ row }) => (
                <div className="flex items-center">
                    <img src={row.original.image} alt={row.original.name} className="w-8 h-8 mr-3 object-contain" />
                    <div className="font-medium text-[var(--table-text-cell)]">{row.getValue("name")}</div>
                </div>
            ),
        },
        {
            accessorKey: "models",
            header: "Models",
            cell: ({ row }) => <div className="text-gray-400">{row.original.models.length} Models</div>,
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <div className="text-gray-400 truncate max-w-md">{row.getValue("description")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Details"
                            onClick={() => onView(row.original)}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                            onClick={() => onDelete(row.original)}
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];

export const getVehicleModelColumns = (
    onView: (model: VehicleModel) => void,
    onDelete: (model: VehicleModel) => void
): ColumnDef<VehicleModel>[] => [
        {
            accessorKey: "name",
            header: "Model Name",
            cell: ({ row }) => (
                <div className="flex items-center">
                    <img src={row.original.image} alt={row.original.name} className="w-10 h-8 mr-3 object-cover rounded" />
                    <div className="font-medium text-[var(--table-text-cell)]">{row.getValue("name")}</div>
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <div className="text-gray-400 truncate max-w-md">{row.getValue("description")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Details"
                            onClick={() => onView(row.original)}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                            onClick={() => onDelete(row.original)}
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];

export const getServiceColumns = (
    onEdit: (service: CarService) => void,
    onDelete: (service: CarService) => void
): ColumnDef<CarService>[] => [
        {
            accessorKey: "title",
            header: "Service Name",
            cell: ({ row }) => (
                <div className="flex items-center">
                    {row.original.image ? (
                        <img src={row.original.image} alt={row.original.title} className="w-10 h-10 mr-3 object-cover rounded-lg" />
                    ) : (
                        <div className="p-2 bg-gray-100 rounded-lg mr-3">
                            <Wrench className="w-5 h-5 text-gray-500" />
                        </div>
                    )}
                    <div>
                        <div className="font-medium text-[var(--table-text-cell)]">{row.getValue("title")}</div>
                        <div className="text-xs text-gray-500">/{row.original.slug}</div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <div className="text-gray-400 truncate max-w-xs">{row.getValue("description")}</div>,
        },
        {
            accessorKey: "features",
            header: "Features",
            cell: ({ row }) => <div className="text-gray-400">{row.original.features?.length || 0} features</div>,
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.original.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {row.original.isActive ? 'Active' : 'Inactive'}
                </span>
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Details"
                            onClick={() => onEdit(row.original)}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                            onClick={() => onDelete(row.original)}
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];

export const getSubServiceColumns = (
    onView: (subService: SubService) => void,
    onDelete: (subService: SubService) => void
): ColumnDef<SubService>[] => [
        {
            accessorKey: "name",
            header: "Sub-Service Name",
            cell: ({ row }) => (
                <div className="flex items-center">
                    {row.original.image && (
                        <img src={row.original.image} alt={row.original.name} className="w-8 h-8 mr-3 object-cover rounded" />
                    )}
                    <div className="font-medium text-[var(--table-text-cell)]">{row.getValue("name")}</div>
                </div>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => {
                const description = row.getValue("description") as string;
                const plainText = description?.replace(/<[^>]*>?/gm, '') || "";
                return <div className="text-gray-400 truncate max-w-xs">{plainText}</div>;
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => <div className="text-gray-400">${row.getValue("price")}</div>,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end space-x-2">
                        <button
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="View Details"
                            onClick={() => onView(row.original)}
                        >
                            <Eye className="w-4 h-4" />
                        </button>
                        <button
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                            onClick={() => onDelete(row.original)}
                        >
                            <Trash className="w-4 h-4" />
                        </button>
                    </div>
                );
            },
        },
    ];
