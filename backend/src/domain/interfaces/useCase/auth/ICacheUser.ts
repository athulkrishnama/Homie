import { loginUserDTO } from "../../DTOs/userDTOs/loginUserDTO";

export interface ICacheUserUseCase {
    cacheUser(user: loginUserDTO): void
}