import { ObjectId } from "mongoose";
import { userEntity } from "../../../entities/user/userEntity";

export interface loginUserDTO extends Omit<userEntity, "password" | "_id">{
    _id:ObjectId | string,
}