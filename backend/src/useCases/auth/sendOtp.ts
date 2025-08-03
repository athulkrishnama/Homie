import { IOtpEmailTemplate } from "../../domain/interfaces/service/emailTemplate/IOtpEmailTemplate";
import { IOtpEmailContentGenerator } from "../../domain/interfaces/service/emailContentGenerators/IOtpEmailContentGenerator";
import { IOtpService } from "../../domain/interfaces/service/IOtp";
import { IsendOtpUseCase } from "../../domain/interfaces/useCase/auth/ISendOtp";
import { IEmailService } from "../../domain/interfaces/service/IEmailService";
import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";

export class SendOtpUseCase implements IsendOtpUseCase {
    private _otpService: IOtpService;
    private _otpTemplateGenerator: IOtpEmailContentGenerator
    private _emailService: IEmailService
    private _cacheStorage: IkeyValueTTLCaching
    private _userPersistance: IUserPersistance;

    constructor(otpService: IOtpService, otpTemplateGenerator: IOtpEmailContentGenerator, emailService: IEmailService, cacheStorage: IkeyValueTTLCaching, userPersistance:IUserPersistance) {
        this._otpService = otpService;
        this._otpTemplateGenerator = otpTemplateGenerator
        this._cacheStorage = cacheStorage;
        this._emailService = emailService;
        this._userPersistance = userPersistance;
    }
    async sendOtp(email: string): Promise<void> {

        const existingEmail = await this._userPersistance.findByEmail(email);
        if(existingEmail){
            throw new Error("Email is already used by another user");
        }

        const OTP = this._otpService.generateOtp();

        const emailTemplate: IOtpEmailTemplate = {
            receiverMail: email,
            subject: "OTP",
            otp: OTP
        }

        emailTemplate.content = this._otpTemplateGenerator.generateTemplate(OTP);
        this._emailService.sendEmail(emailTemplate as Required<IOtpEmailTemplate>)
        this._cacheStorage.setData(`otp/${email}`, 2 * 60, OTP)
    }
}