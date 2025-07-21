import { ObjectId } from "mongoose";

export interface baseUserEntity{
    _id?: ObjectId,
    email:string,
    password:string,
    createdAt:Date,
    lastLogin:Date,
    isAdmin:boolean
}