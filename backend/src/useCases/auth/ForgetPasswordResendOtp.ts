import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { IOtpEmailContentGenerator } from "../../domain/interfaces/service/emailContentGenerators/IOtpEmailContentGenerator";
import { IOtpEmailTemplate } from "../../domain/interfaces/service/emailTemplate/IOtpEmailTemplate";
import { IEmailService } from "../../domain/interfaces/service/IEmailService";
import { IOtpService } from "../../domain/interfaces/service/IOtp";
import { IForgetPasswordResendOtpUseCase } from "../../domain/interfaces/useCase/auth/IForgetPasswordResendOtp";

export class ForgetPasswordResendOtpUseCase implements IForgetPasswordResendOtpUseCase {
    constructor(
        private _cacheDatabase: IkeyValueTTLCaching,
        private _emailService: IEmailService,
        private _otpEmailContentGenerator: IOtpEmailContentGenerator,
        private _otpService: IOtpService,
        private _userPersistance: IUserPersistance) {

    }

    async resendOtp(email: string): Promise<void> {

        const user = await this._userPersistance.findByEmail(email);

        if (!user) {
            throw new Error("User is not registered")
        }

        const OTP = this._otpService.generateOtp();

        const emailTemplate: IOtpEmailTemplate = {
            receiverMail: email,
            otp: OTP,
            subject: "Home: Forget Password OTP",
        }

        emailTemplate.content = this._otpEmailContentGenerator.generateTemplate(OTP);

        this._emailService.sendEmail(emailTemplate as Required<IOtpEmailTemplate>);
        this._cacheDatabase.setData(`otp/${email}`, 5 * 60, OTP)
    }
}