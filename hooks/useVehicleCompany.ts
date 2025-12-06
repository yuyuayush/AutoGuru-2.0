import { vehicleCompanyApi } from "@/lib/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useVehicleCompanies = () => {
    return useQuery({
        queryKey: ["vehicle-companies"],
        queryFn: vehicleCompanyApi.getAllCompanies,
    })
}

export const useVehicleCompany = (id: string) => {
    return useQuery({
        queryKey: ["vehicle-company", id],
        queryFn: () => vehicleCompanyApi.getCompanyById(id),
        enabled: !!id,
    })
}

export const useCreateVehicleCompany = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: vehicleCompanyApi.createCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicle-companies"] })
            toast.success("Vehicle company created successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create vehicle company")
        }
    })
}

export const useUpdateVehicleCompany = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => vehicleCompanyApi.updateCompany(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["vehicle-companies"] })
            queryClient.invalidateQueries({ queryKey: ["vehicle-company", variables.id] })
            toast.success("Vehicle company updated successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update vehicle company")
        }
    })
}

export const useDeleteVehicleCompany = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: vehicleCompanyApi.deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicle-companies"] })
            toast.success("Vehicle company deleted successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete vehicle company")
        }
    })
}
