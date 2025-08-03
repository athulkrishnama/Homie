import { userEntity } from "../../domain/entities/user/userEntity";
import { createUserDTO } from "../../domain/interfaces/DTOs/userDTOs/createUserDTO";
import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { IHashService } from "../../domain/interfaces/service/IHashService";
import { ICreateUserUseCase } from "../../domain/interfaces/useCase/auth/ICreateUser";

export class CreateUserUseCase implements ICreateUserUseCase {
    private _userPersistance: IUserPersistance;
    private _hashService: IHashService

    constructor(userPersistance: IUserPersistance, hashService: IHashService) {
        this._userPersistance = userPersistance;
        this._hashService = hashService
    }

    async createUser(user: userEntity): Promise<createUserDTO> {
        const existingUser: userEntity | null = await this._userPersistance.findByEmail(user.email);

        if (existingUser) {
            throw new Error("User with same email already exists")
        }

        const hashedPassword = await this._hashService.hash(user.password);

        if (!user.password) {
            throw new Error("Password is required")
        }
        user.password = hashedPassword;

        const newUser = await this._userPersistance.create(user);

        if (!newUser) {
            throw new Error("Error while creating new user")
        }

        const result: createUserDTO = {
            _id: newUser._id!,
            email: newUser.email,
            fullname: newUser.fullname,
            phone: newUser.phone,
            profileImage: newUser.profileImage,
            hostStatus: newUser.hostStatus,
            isBlocked: newUser.isBlocked,
            isAdmin: newUser.isAdmin,
            lastLogin: newUser.lastLogin
        }

        return result;
    }
}