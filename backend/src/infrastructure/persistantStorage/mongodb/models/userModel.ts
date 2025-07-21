import { Document, model, ObjectId } from "mongoose";
import { userEntity } from "../../../../domain/entities/user/userEntity";
import { userSchema } from "../schema/userSchema";

export interface IUserModel extends Omit<userEntity, "_id">, Document{
    _id:ObjectId
}

export const UserModel = model<userEntity>("user", userSchema);