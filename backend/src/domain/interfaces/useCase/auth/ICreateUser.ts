import { userEntity } from "../../../entities/user/userEntity";
import { createUserDTO } from "../../DTOs/userDTOs/createUserDTO";

export interface ICreateUserUseCase {
    createUser(user: userEntity): Promise<createUserDTO>
}