import { userEntity } from "../../../entities/user/userEntity";

export interface ICreateUserUseCase{
    createUser(user:userEntity):Promise<userEntity>
}