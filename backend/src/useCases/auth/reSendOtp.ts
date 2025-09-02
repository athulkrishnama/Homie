import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { IOtpEmailContentGenerator } from "../../domain/interfaces/service/emailContentGenerators/IOtpEmailContentGenerator";
import { IOtpEmailTemplate } from "../../domain/interfaces/service/emailTemplate/IOtpEmailTemplate";
import { IEmailService } from "../../domain/interfaces/service/IEmailService";
import { IOtpService } from "../../domain/interfaces/service/IOtp";
import { IResendOtpUseCase } from "../../domain/interfaces/useCase/auth/IResendOtp";

export class ResendOtpUseCase implements IResendOtpUseCase {
    constructor(private otpService: IOtpService,
        private otpmailContentGenerator: IOtpEmailContentGenerator,
        private emailSerivce: IEmailService,
        private cacheDatabase: IkeyValueTTLCaching,
        private userPersistance: IUserPersistance) {

    }

    async resendOtp(email: string): Promise<void> {

        const user = await this.userPersistance.findByEmail(email);

        if (!user) {
            throw new Error("Email is not existing")
        }

        const OTP = this.otpService.generateOtp();

        const emailTemplate: IOtpEmailTemplate = {
            receiverMail: email,
            otp: OTP,
            subject: "Resend OTP",
        }

        const content = this.otpmailContentGenerator.generateTemplate(OTP);

        emailTemplate.content = content;
        this.emailSerivce.sendEmail(emailTemplate as Required<IOtpEmailTemplate>)
        this.cacheDatabase.setData(`otp/${email}`, 5 * 60, OTP)
    }
}