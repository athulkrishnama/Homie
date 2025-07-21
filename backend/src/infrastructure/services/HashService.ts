import { IHashService } from "../../domain/interfaces/service/IHashService";
import bcrypt from 'bcrypt';
export class HashService implements IHashService {
    async hash(value: string): Promise<string> {
        return await bcrypt.hash(value, 10);
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(value, hash);
    }
}