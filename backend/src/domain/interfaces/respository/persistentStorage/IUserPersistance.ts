import { userEntity } from "../../../entities/user/userEntity";
import { IBasePersistance } from "./IBasePersistance";

export interface IUserPersistance extends IBasePersistance<userEntity> {
    findByEmail(email: string): Promise<userEntity | null>
}