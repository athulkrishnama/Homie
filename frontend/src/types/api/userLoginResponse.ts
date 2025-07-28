import type { UserEntity } from "../entities/userEntitiy";
import type { IBaseResponse } from "./baseResponse";

export interface UserLoginResponseDTO extends IBaseResponse {
    accessToken: string,
    user: Omit<UserEntity, 'password'>
}