import type { UserEntity } from "@/types/entities/userEntitiy"; 
import type { IBaseResponse } from "./baseResponse"; 
export interface UserLoginResponse extends IBaseResponse {
    accessToken: string,
    user: Omit<UserEntity, 'password'>
}