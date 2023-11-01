import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/AxiosInstance";

interface LogoutServiceInterface {
    token: string;
}

export const logoutService = (
    onSuccess: (data: any) => void,
    onError: (error: any) => void
) => {
    return useMutation({
        mutationFn: async (body: LogoutServiceInterface) => await axiosInstance.post("/auth/logout", {}, {
            headers: {
                'Authorization': `Bearer ${body.token}`
            }
        }),
        onSuccess,
        onError
    });
}