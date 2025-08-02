import { Request, Response } from "express";
import { HTTPStatus } from "../../domain/entities/httpStatus";
import { IAdminLoginUseCase } from "../../domain/interfaces/useCase/auth/IAdminLogin";
import { ITokenCreationUseCase } from "../../domain/interfaces/useCase/auth/ITokenCreationUseCase";
import { IUserLoginUseCase } from "../../domain/interfaces/useCase/auth/IUserLogin";
import { ICacheUserUseCase } from "../../domain/interfaces/useCase/auth/ICacheUser";
import { IVerifyOtpUseCase } from "../../domain/interfaces/useCase/auth/IVerifyOtp";
import { ICreateUserUseCase } from "../../domain/interfaces/useCase/auth/ICreateUser";
import { IResendOtpUseCase } from "../../domain/interfaces/useCase/auth/IResendOtp";
import { IsendOtpUseCase } from "../../domain/interfaces/useCase/auth/ISendOtp";

export class AuthController {
    constructor(
        private _adminLoginUseCase: IAdminLoginUseCase,
        private _tokenCreatetionUseCase: ITokenCreationUseCase,
        private _loginUseCase: IUserLoginUseCase,
        private _cacheUserUseCase: ICacheUserUseCase,
        private _verifyOtpUseCase: IVerifyOtpUseCase,
        private _createUserUseCase: ICreateUserUseCase,
        private _resendOtpUseCase: IResendOtpUseCase,
        private _sendOtpUseCase: IsendOtpUseCase) {

    }

    // admin login
    async handleAdminLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new Error("Email and Password is Required");
            }

            const admin = await this._adminLoginUseCase.adminLogin(email, password);

            // token generation
            const token = this._tokenCreatetionUseCase.createAccessTokenAndRefreshToken({ userId: admin._id.toString(), role: "admin" });

            // setting token in cookie
            res.cookie('RefreshToken', token.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            res.status(HTTPStatus.OK).json({ message: "Admin Login Successful", user: admin, accessToken: token.accessToken })

        } catch (error) {
            console.log("login error", error);
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while login", error: error instanceof Error ? error.message : "Login Error" })
        }
    }


    // user login
    async handleUserLogin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await this._loginUseCase.userLogin(email, password);

            const token = this._tokenCreatetionUseCase.createAccessTokenAndRefreshToken({ userId: user._id.toString(), role: "user" });
            res.cookie('RefreshToken', token.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

            // setting data in caching database
            this._cacheUserUseCase.cacheUser(user);

            res.status(HTTPStatus.OK).json({ "message": "User Login Successful", user, accessToken: token.accessToken });

        } catch (error) {
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while login", error: (error instanceof Error ? error.message : "Error while validation user") })
        }
    }

    // register user
    async handleRegisterUser(req: Request, res: Response) {
        try {
            const { userData, otp } = req.body;

            const otpVerified = await this._verifyOtpUseCase.verifyOtp(userData.email, otp);

            if (!otpVerified) {
                res.status(HTTPStatus.BAD_REQUEST).json({ message: "Invalid Otp" });
                return
            }

            const user = await this._createUserUseCase.createUser(userData);
            res.status(HTTPStatus.CREATED).json({ message: "User Created Successfully", data: user })

        } catch (error) {

            console.log("Error while creating user", error);

            res.status(HTTPStatus.BAD_REQUEST).json({
                message: "Errow while creating user ",
                error: (error instanceof Error ? error.message : "")
            })
        }
    }

    // resend otp
    async handleResendOtp(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (!email) {
                throw new Error("Email is required");
            }


            this._resendOtpUseCase.resendOtp(email);
            res.status(HTTPStatus.OK).json({ message: "OTP Resended Successfully" })

        } catch (error) {
            console.log("Error while resending otp", error);
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while resening otp", error: error instanceof Error ? error.message : "Error in resending otp" })
        }
    }

    // send otp 
    async handleSendOtp(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (!email) {
                throw new Error("Email not recieved")
            }
            await this._sendOtpUseCase.sendOtp(email);
            res.status(HTTPStatus.OK).json({ message: "OTP send successfully " })
        } catch (error) {
            console.log("Error while sending otp");
            res.status(HTTPStatus.BAD_REQUEST).json({ message: "Error while sending otp", error: error instanceof Error ? error.message : "otp Error" })
        }
    }

}