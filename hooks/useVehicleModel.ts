import { vehicleModelApi } from "@/lib/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useVehicleModels = (makeId: string) => {
    return useQuery({
        queryKey: ["vehicle-models", makeId],
        queryFn: () => vehicleModelApi.getModelsByCompany(makeId),
        enabled: !!makeId,
    })
}

export const useVehicleModel = (id: string) => {
    return useQuery({
        queryKey: ["vehicle-model", id],
        queryFn: () => vehicleModelApi.getModelById(id),
        select: (data) => data.model,
        enabled: !!id,
    })
}

export const useCreateVehicleModel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: vehicleModelApi.createModel,
        onSuccess: (_, variables: any) => {
            queryClient.invalidateQueries({ queryKey: ["vehicle-models", variables.brand || variables.makeId] })
            toast.success("Vehicle model created successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create vehicle model")
        }
    })
}

export const useUpdateVehicleModel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => vehicleModelApi.updateModel(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["vehicle-models"] }) // Invalidate broadly or pass makeId if available
            queryClient.invalidateQueries({ queryKey: ["vehicle-model", variables.id] })
            toast.success("Vehicle model updated successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update vehicle model")
        }
    })
}

export const useDeleteVehicleModel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: vehicleModelApi.deleteModel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicle-models"] })
            toast.success("Vehicle model deleted successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete vehicle model")
        }
    })
}
