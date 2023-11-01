import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/AxiosInstance";

export const profileService = (token: string, key: string) => {
    return useQuery({
        queryKey: [key],
        queryFn: async () =>
            await axiosInstance.get("/user/profile", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }),
    })
}


export const updateProfileService = ( onSuccess: (data: any) => void, onError: (error: any) => void, token: string) => {
    return useMutation({
        mutationFn: async (body: FormData) => await axiosInstance.post('/user/update', body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }),
        onSuccess,
        onError,
    })
}