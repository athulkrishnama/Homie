import { userLogin } from "@/services/api/userApiService"
import type { userLoginDTO } from "@/types/api/userLogin"
import type { UserLoginResponseDTO } from "@/types/api/userLoginResponse"
import { useMutation } from "@tanstack/react-query"

export const useUserLoginMutation = () => {
    return useMutation<UserLoginResponseDTO, Error, userLoginDTO>({
        mutationFn: ({ email, password }: userLoginDTO) => userLogin({ email, password })
    })
}