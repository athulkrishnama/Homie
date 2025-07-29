import { adminLoginApi } from "@/services/api/adminApiService"
import type { userLoginRequestType } from "@/types/api/requestTypes/userLogin"
import type { UserLoginResponse } from "@/types/api/responseTypes/userLoginResponse"
import { useMutation } from "@tanstack/react-query"

export const useAdminLoginMutation = ()=>{
    return useMutation<UserLoginResponse, Error, userLoginRequestType>({
        mutationFn: (data:userLoginRequestType)=> adminLoginApi<userLoginRequestType>(data)
    })
}