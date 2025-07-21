import { Request, Response } from "express";
import { ICreateUserUseCase } from "../../../domain/interfaces/useCase/auth/ICreateUser";
import { IVerifyOtpUseCase } from "../../../domain/interfaces/useCase/auth/IVerifyOtp";
import { HTTPStatus } from "../../../domain/entities/httpStatus";

export class RegisterUserController {
    private verifyOtpUseCase: IVerifyOtpUseCase;
    private createUserUseCase: ICreateUserUseCase;

    constructor(verifyOtpUseCase: IVerifyOtpUseCase, createUserUseCase: ICreateUserUseCase) {
        this.verifyOtpUseCase = verifyOtpUseCase;
        this.createUserUseCase = createUserUseCase;
    }

    async handleRegisterUser(req: Request, res: Response) {
        try {
            const { userData, otp } = req.body;

            const otpVerified = await this.verifyOtpUseCase.verifyOtp(userData.email, otp);

            if (!otpVerified) {
                res.status(HTTPStatus.BAD_REQUEST).json({ message: "Invalid Otp" });
                return
            }

            const user = await this.createUserUseCase.createUser(userData);
            res.status(HTTPStatus.CREATED).json({ message: "User Created Successfully", data: user })

        } catch (error) {

            console.log("Error while creating user", error);

            res.status(HTTPStatus.BAD_REQUEST).json({
                message: "Errow while creating user ",
                error: (error instanceof Error ? error.message : "")
            })
        }
    }
}