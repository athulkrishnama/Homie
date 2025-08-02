import { Model } from "mongoose";
import { userEntity } from "../../../../domain/entities/user/userEntity";
import { IUserPersistance } from "../../../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { BasePersistance } from "./basePersistance";

export class UserPersistance extends BasePersistance<userEntity> implements IUserPersistance {
    constructor(protected _model: Model<userEntity>){
        super(_model)
    }

    async findByEmail(email: string): Promise<userEntity | null> {
        return await this._model.findOne({email:email})
    }
}