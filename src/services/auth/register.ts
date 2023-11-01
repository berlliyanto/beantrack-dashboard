import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/AxiosInstance";


const registerService = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: async (body: FormData) =>
      await axiosInstance.post("/auth/register", body),
    onSuccess,
    onError,
  });
};

export default registerService;
