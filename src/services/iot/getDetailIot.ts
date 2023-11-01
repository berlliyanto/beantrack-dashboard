import { axiosInstance } from "../../lib/AxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const getDetailIotService = (token: string, iotCode: string, sumBy: string, date: string) => {
    return useQuery({
        queryKey: ['getAllIot'],
        queryFn: async () => {
            return await axiosInstance.get(`/iot/${iotCode}?summary_by=${sumBy}&date=${date}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        },
    })
}