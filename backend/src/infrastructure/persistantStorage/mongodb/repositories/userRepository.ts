import { userEntity } from "../../../../domain/entities/user/userEntity";
import { IUserPersistance } from "../../../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { UserModel } from "../models/userModel";

export class userRepository implements IUserPersistance{
    async createUser(user: userEntity): Promise<userEntity> {
        return await UserModel.create(user);
    }
    async findByEmail(email: string): Promise<userEntity | null> {
        return await UserModel.findOne({email:email})
    }
}