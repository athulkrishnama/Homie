import { loginUserDTO } from "../../domain/interfaces/DTOs/userDTOs/loginUserDTO";
import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { IHashService } from "../../domain/interfaces/service/IHashService";
import { IUserLogin } from "../../domain/interfaces/useCase/auth/IUserLogin";

export class UserLoginUseCase implements IUserLogin {
    private userPersistance;
    private hashService;

    constructor(userPersistance: IUserPersistance, hashService: IHashService) {
        this.userPersistance = userPersistance;
        this.hashService = hashService;
    }

    async userLogin(email: string, password: string): Promise<loginUserDTO> {

        const user = await this.userPersistance.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        if (user.isBlocked) {
            throw new Error("User is blocked by admin");
        }

        const verifyPassword = await this.hashService.compare(password, user.password);

        if (!verifyPassword) {
            throw new Error("Invalid Password");
        }

        const mappedUser: loginUserDTO = {
            _id: user._id!,
            email: user.email,
            fullname: user.fullname,
            phone: user.phone,
            profileImage: user.profileImage,
            isBlocked: user.isBlocked,
            isAdmin: user.isAdmin,
            hostStatus: user.hostStatus,
            createdAt: user.createdAt,
            lastLogin: user.lastLogin
        }

        return mappedUser;
    }
}