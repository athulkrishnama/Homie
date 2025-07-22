import { Request, Response } from "express";
import { IAdminLogin } from "../../../domain/interfaces/useCase/auth/IAdminLogin";
import { ITokenCreationUseCase } from "../../../domain/interfaces/useCase/auth/ITokenCreationUseCase";
import { HTTPStatus } from "../../../domain/entities/httpStatus";

export class AdminLoginController {
    constructor(private adminLoginUseCase: IAdminLogin, private tokenCreatetionUseCase: ITokenCreationUseCase) {

    }

    async handleAdminLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error("Email and Password is Required");
            }

            const admin = await this.adminLoginUseCase.adminLogin(email, password);

            // token generation
            const token = this.tokenCreatetionUseCase.createAccessTokenAndRefreshToken({ userId: admin._id.toString(), role: "admin" });

            // setting token in cookie
            res.cookie('RefreshToken', token.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            res.status(HTTPStatus.OK).json({ message: "Admin Login Successful", user: admin, accessToken: token.accessToken })

        } catch (error) {
            console.log("login error", error);
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while login", error: error instanceof Error ? error.message : "Login Error" })
        }
    }
}