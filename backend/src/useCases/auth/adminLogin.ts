import { adminLoginDTO } from "../../domain/interfaces/DTOs/adminDTO/adminLoginDTO";
import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { IHashService } from "../../domain/interfaces/service/IHashService";
import { IAdminLoginUseCase } from "../../domain/interfaces/useCase/auth/IAdminLogin";

export class AdminLoginUseCase implements IAdminLoginUseCase {
    constructor(private userPersistance: IUserPersistance, private hashService: IHashService) {

    }

    async adminLogin(email: string, password: string): Promise<adminLoginDTO> {
        const admin = await this.userPersistance.findByEmail(email);
        if (!admin) {
            throw new Error('Admin not found');
        }

        const passwordMatch = await this.hashService.compare(password, admin.password);

        if (!passwordMatch) {
            throw new Error("Password not matching");
        }

        if (!admin.isAdmin) {
            throw new Error("You are not a admin");
        }

        const mappedAdmin: adminLoginDTO = {
            _id: admin._id!,
            email: admin.email,
            isAdmin: admin.isAdmin,
            createdAt: admin.createdAt,
            lastLogin: admin.lastLogin
        }

        return mappedAdmin;
    }
}