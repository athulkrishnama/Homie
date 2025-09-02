import { axiosInstance } from "@/axios/instance";
import { AxiosError } from "axios";

export const userLogin = async <T>(data: T) => {
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

export const userSignupSendOtp = async <T>(data: T) => {
    try {
        const response = await axiosInstance.post('/auth/signup', data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error?.response?.data?.error ?? "Error while signup");
        }
    }
    throw new Error("Error while sending OTP");
}

export const userSignupVerify = async <T>(data: T) => {
    try {
        const response = await axiosInstance.post('/auth/verify', data);
        return response.data;
    } catch (err) {
        console.log(err);
        if (err instanceof AxiosError) {
            throw new Error(err.response?.data.error ?? "Error while verifying");
        }
        throw new Error("Error while Verifying")
    }
}


export const userSignupResendOtp = async<T>(data: T) => {
    try {
        const response = await axiosInstance.post('/auth/resendOtp', data);
        return response.data
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error ?? "Error while resending OTP");
        }
        throw new Error("Error while resending OTP")
    }
}

export const userForgetPasswordRequestOtp = async<T>(data: T) => {
    try {
        const response = await axiosInstance.post('/auth/forget', data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const userForgetPasswordVerifyOtp = async<T>(data: T) => {
    try {
        const response = await axiosInstance.post('/auth/verifyForgetPassword', data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error)
        }
    }
}

export const userForgetPasswordResendOtp = async<T>(data: T) => {
    try {
        const response = await axiosInstance.post("/auth/forgetPasswordResendOtp", data);
        return response.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data.error)
        }
    }
}