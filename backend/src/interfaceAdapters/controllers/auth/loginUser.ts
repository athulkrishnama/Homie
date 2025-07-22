import { Request, Response } from "express";
import { ITokenCreationUseCase } from "../../../domain/interfaces/useCase/auth/ITokenCreationUseCase";
import { IUserLogin } from "../../../domain/interfaces/useCase/auth/IUserLogin";
import { HTTPStatus } from "../../../domain/entities/httpStatus";
import { ICacheUserUseCase } from "../../../domain/interfaces/useCase/auth/ICacheUser";

export class LoginUserController {
    constructor(private loginUseCase: IUserLogin, private tokenCreation: ITokenCreationUseCase, private cacheUserUseCase: ICacheUserUseCase) {

    }

    async handleUserLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await this.loginUseCase.userLogin(email, password);

            const token = this.tokenCreation.createAccessTokenAndRefreshToken({ userId: user._id.toString(), role: "user" });
            res.cookie('RefreshToken', token.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            // setting data in caching database
            this.cacheUserUseCase.cacheUser(user);

            res.status(HTTPStatus.OK).json({ "message": "User Login Successful", user, accessToken: token.accessToken });

        } catch (error) {
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while login", error: (error instanceof Error ? error.message : "Error while validation user") })
        }
    }
}