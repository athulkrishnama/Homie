import { Model } from "mongoose";
import { IBasePersistance } from "../../../../domain/interfaces/respository/persistentStorage/IBasePersistance";

export abstract class BasePersistance<T> implements IBasePersistance<T> {
    constructor(protected _model: Model<T>) {

    }

    async create(data: T): Promise<T> {
        return await this._model.create(data) as T;
    }

    async findById(id: string): Promise<T | null> {
        return await this._model.findById(id);
    }

    async deleteById(id: string): Promise<void> {
        await this._model.findByIdAndDelete(id);
    }
}