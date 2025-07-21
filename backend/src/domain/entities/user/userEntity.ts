import { baseUserEntity } from "../baseUser/baseUserEntity";

export interface userEntity extends baseUserEntity{
    fullname:string,
    phone:string,
    isBlocked:boolean,
    profileImage:string,
    hostStatus:'disabled' | 'active' | 'blocked'
}