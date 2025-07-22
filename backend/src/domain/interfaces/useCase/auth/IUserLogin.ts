import { loginUserDTO } from "../../DTOs/userDTOs/loginUserDTO";

export interface IUserLogin {
    userLogin(email: string, password: string): Promise<loginUserDTO>
}