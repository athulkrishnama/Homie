import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { IBaseEmailTemplate } from "../../domain/interfaces/service/emailTemplate/IBaseEmailTemplate";
import { IOtpEmailTemplate } from "../../domain/interfaces/service/emailTemplate/IOtpEmailTemplate";
import { IEmailService } from "../../domain/interfaces/service/IEmailService";
import { IOtpService } from "../../domain/interfaces/service/IOtp";
import { IForgetPasswordSendOtpUseCase } from "../../domain/interfaces/useCase/auth/IForgetPasswordSendOtp";

export class ForgetPasswordUseCase implements IForgetPasswordSendOtpUseCase {
    constructor(private _userPersistance: IUserPersistance,
        private _otpService: IOtpService,
        private _emailSerivce: IEmailService,
        private _cacheService: IkeyValueTTLCaching) {

    }

    async sendOtp(email: string): Promise<void> {
        const user = await this._userPersistance.findByEmail(email);

        if (!user) {
            throw new Error("User with this email dont exist");
        }

        const OTP = this._otpService.generateOtp();

        const Mail: IOtpEmailTemplate = {
            receiverMail: email,
            otp: OTP,
            subject: "This is forget Password Otp",
        }

        this._cacheService.setData(`forgetOtp/${email}`, 2 * 60, OTP)

        this._emailSerivce.sendEmail(Mail as Required<IBaseEmailTemplate>);
    }
}