import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/AxiosInstance";

interface AddIotParams {
  name: string;
  code: string;
}

const addIotService = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void,
  token: string
) => {
  return useMutation({
    mutationFn: async (body: AddIotParams) =>
      await axiosInstance.post("/iot/create", body, {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
      }),
    onSuccess,
    onError,
  });
};

export default addIotService;
