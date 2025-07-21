import { ObjectId } from "mongoose";
import { userEntity } from "../../../entities/user/userEntity";

export interface createUserDTO extends Omit<userEntity, 'password' | '_id' | 'createdAt'> {
    _id: string | ObjectId
}