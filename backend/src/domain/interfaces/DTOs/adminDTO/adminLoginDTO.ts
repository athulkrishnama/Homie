import { ObjectId } from "mongoose";
import { adminEntity } from "../../../entities/admin/adminEntity";

export interface adminLoginDTO extends Omit<adminEntity, "password" | "_id"> {
    _id: ObjectId | string
}