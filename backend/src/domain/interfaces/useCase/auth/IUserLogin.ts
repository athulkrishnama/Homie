import { loginUserDTO } from "../../DTOs/userDTOs/loginUserDTO";

export interface IUserLoginUseCase {
    userLogin(email: string, password: string): Promise<loginUserDTO>
}