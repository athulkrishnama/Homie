import { adminLoginDTO } from "../../DTOs/adminDTO/adminLoginDTO";

export interface IAdminLogin {
    adminLogin(email: string, password: string): Promise<adminLoginDTO>
}