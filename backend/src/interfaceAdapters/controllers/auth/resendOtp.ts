import { Request, Response } from "express";
import { IResendOtpUseCase } from "../../../domain/interfaces/useCase/auth/IResendOtp";
import { HTTPStatus } from "../../../domain/entities/httpStatus";

export class ResendOtpController {
    constructor(private resendOtpUseCase: IResendOtpUseCase){

    }

    async handleResendOtp(req:Request, res:Response){
        try {
            const {email} = req.body;
            if(!email){
                throw new Error("Email is required");
            }


            this.resendOtpUseCase.resendOtp(email);
            res.status(HTTPStatus.OK).json({message:"OTP Resended Successfully"})
            
        } catch (error) {
            console.log("Error while resending otp", error);
            res.status(HTTPStatus.BAD_REQUEST).json({message:"Error while resening otp", error:error instanceof Error ? error.message : "Error in resending otp"})
        }
    }
}