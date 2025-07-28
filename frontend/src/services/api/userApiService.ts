import { axiosInstance } from "@/axios/instance";
import type { userLoginDTO } from "@/types/api/userLogin";
import { AxiosError } from "axios";

export const userLogin = async (data: userLoginDTO) => {
    try {
        const response = await axiosInstance.post('/auth/login', data);
        return response.data
    } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
            throw new Error(err?.response?.data?.error ?? "Error while loggin in")
        }
        throw new Error("Error while login")
    }
}