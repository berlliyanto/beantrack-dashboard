import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/AxiosInstance";

interface LoginParams {
  email: string;
  password: string;
}

const loginService = (
  onSuccess: (data: any) => void,
  onError: (error: any) => void
) => {
  return useMutation({
    mutationFn: async (body: LoginParams) =>
      await axiosInstance.post("/auth/login", body),
    onSuccess,
    onError,
  });
};

export default loginService;
