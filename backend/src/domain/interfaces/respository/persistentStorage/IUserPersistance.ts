import { userEntity } from "../../../entities/user/userEntity";

export interface IUserPersistance{
    createUser(user:userEntity):Promise<userEntity>
    findByEmail(email:string):Promise<userEntity | null>
}