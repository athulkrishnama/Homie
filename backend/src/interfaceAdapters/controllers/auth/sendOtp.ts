import { HTTPStatus } from "../../../domain/entities/httpStatus";
import { IsendOtpUseCase } from "../../../domain/interfaces/useCase/auth/ISendOtp";
import { Request, Response } from 'express'

export class sendOtpController {
    private sendOtpUseCase
    constructor(sendOtpUseCase: IsendOtpUseCase) {
        this.sendOtpUseCase = sendOtpUseCase
    }

    async handleSendOtp(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (!email) {
                throw new Error("Email not recieved")
            }
            await this.sendOtpUseCase.sendOtp(email);
            res.status(HTTPStatus.OK).json({ message: "OTP send successfully " })
        } catch (error) {
            console.log("Error while sending otp");
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while sending otp", error: error instanceof Error ? error.message : "otp Error" })
        }
    }
}