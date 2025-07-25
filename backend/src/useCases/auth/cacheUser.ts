import { loginUserDTO } from "../../domain/interfaces/DTOs/userDTOs/loginUserDTO";
import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { ICacheUserUseCase } from "../../domain/interfaces/useCase/auth/ICacheUser";

export class CacheUserUseCase implements ICacheUserUseCase {
    constructor(private cacheDatabase: IkeyValueTTLCaching) {

    }

    cacheUser(user: loginUserDTO): void {
        this.cacheDatabase.setData(`user/${user._id}`, 15 * 60, JSON.stringify(user));
    }
}