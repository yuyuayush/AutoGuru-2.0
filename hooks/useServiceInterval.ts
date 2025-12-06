import { serviceIntervalApi } from "@/lib/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useServiceIntervals = (modelId: string) => {
    return useQuery({
        queryKey: ["service-intervals", modelId],
        queryFn: () => serviceIntervalApi.getIntervalsByModel(modelId),
        enabled: !!modelId,
    })
}

export const useCreateServiceInterval = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: serviceIntervalApi.createInterval,
        onSuccess: (_, variables: any) => {
            queryClient.invalidateQueries({ queryKey: ["service-intervals", variables.vehicleModel] })
            toast.success("Service interval created successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to create service interval")
        }
    })
}

export const useUpdateServiceInterval = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => serviceIntervalApi.updateInterval(id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["service-intervals"] })

            toast.success("Service interval updated successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to update service interval")
        }
    })
}

export const useDeleteServiceInterval = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: serviceIntervalApi.deleteInterval,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["service-intervals"] })
            toast.success("Service interval deleted successfully")
        },
        onError: (error: any) => {
            toast.error(error.message || "Failed to delete service interval")
        }
    })
}
