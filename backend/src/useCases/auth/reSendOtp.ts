import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { IOtpEmailContentGenerator } from "../../domain/interfaces/service/emailContentGenerators/IOtpEmailContentGenerator";
import { IOtpEmailTemplate } from "../../domain/interfaces/service/emailTemplate/IOtpEmailTemplate";
import { IEmailService } from "../../domain/interfaces/service/IEmailService";
import { IOtpService } from "../../domain/interfaces/service/IOtp";
import { IResendOtpUseCase } from "../../domain/interfaces/useCase/auth/IResendOtp";

export class ResendOtpUseCase implements IResendOtpUseCase {
    constructor(
        private _otpService: IOtpService,
        private _otpmailContentGenerator: IOtpEmailContentGenerator,
        private _emailSerivce: IEmailService,
        private _cacheDatabase: IkeyValueTTLCaching) {

    }

    async resendOtp(email: string): Promise<void> {
        const OTP = this._otpService.generateOtp();

        const emailTemplate: IOtpEmailTemplate = {
            receiverMail: email,
            otp: OTP,
            subject: "Resend OTP",
        }

        const content = this._otpmailContentGenerator.generateTemplate(OTP);

        emailTemplate.content = content;
        this._emailSerivce.sendEmail(emailTemplate as Required<IOtpEmailTemplate>)
        this._cacheDatabase.setData(`otp/${email}`, 5 * 60, OTP)
    }
}