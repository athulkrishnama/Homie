import { axiosInstance } from "@/axios/instance";
import { AxiosError } from "axios";

export const adminLoginApi = async<T>(data: T) => {
    try {
        const response = await axiosInstance.post("/auth/adminLogin", data);
        return response.data
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error ?? "Error while login")
        }
        throw new Error("Error while login")
    }
}