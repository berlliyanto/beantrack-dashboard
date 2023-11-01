import { axiosInstance } from "../../lib/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const getAllIotService = (token: string, page: number, limit: number) => {
    return useQuery({
        queryKey: ['getAllIot'],
        queryFn: async () => {
            return await axiosInstance.get(`/iot?page=${page}&limit=${limit}&search`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        },
    })
}