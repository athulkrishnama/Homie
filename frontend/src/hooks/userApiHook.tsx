import { userLogin, userSignupResendOtp, userSignupSendOtp as userSignupSendOtpApi, userSignupVerify } from "@/services/api/userApiService"
import type { userLoginDTO } from "@/types/api/requestTypes/userLogin"
import { type IBaseResponse } from "@/types/api/responseTypes/baseResponse"
import type { UserLoginResponse } from "@/types/api/responseTypes/userLoginResponse"
import { useMutation } from "@tanstack/react-query";
import type { userSignup } from '@/types/api/requestTypes/userSignup'
import type { userSignupSendOtp } from "@/types/api/requestTypes/userSignupSendOtp";

export const useUserLoginMutation = () => {
    return useMutation<UserLoginResponse, Error, userLoginDTO>({
        mutationFn: ({ email, password }: userLoginDTO) => userLogin<userLoginDTO>({ email, password })
    })
}

export const useUserSignupSendOtpMutation = () => {
    return useMutation<IBaseResponse, Error, userSignupSendOtp>({
        mutationFn: ({ email }: userSignupSendOtp) => userSignupSendOtpApi<userSignupSendOtp>({ email })
    })
}

export const useUserSignupVerifyMutation = ()=>{
    return useMutation<IBaseResponse, Error, userSignup>({
        mutationFn:(signupData:userSignup)=> userSignupVerify<userSignup>(signupData)
    })
}

export const useUserSignupResendOtpMutation = ()=>{
    return useMutation<IBaseResponse, Error, userSignupSendOtp>({
        mutationFn: ({email}:userSignupSendOtp)=> userSignupResendOtp<userSignupSendOtp>({email})
    })
}