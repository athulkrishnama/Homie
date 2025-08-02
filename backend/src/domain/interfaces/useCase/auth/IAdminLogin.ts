import { adminLoginDTO } from "../../DTOs/adminDTO/adminLoginDTO";

export interface IAdminLoginUseCase {
    adminLogin(email: string, password: string): Promise<adminLoginDTO>
}