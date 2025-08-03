import { IOtpEmailTemplate } from "../../domain/interfaces/service/emailTemplate/IOtpEmailTemplate";
import { IOtpEmailContentGenerator } from "../../domain/interfaces/service/emailContentGenerators/IOtpEmailContentGenerator";
import { IOtpService } from "../../domain/interfaces/service/IOtp";
import { IsendOtpUseCase } from "../../domain/interfaces/useCase/auth/ISendOtp";
import { IEmailService } from "../../domain/interfaces/service/IEmailService";
import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";

export class SendOtpUseCase implements IsendOtpUseCase {

    private otpService: IOtpService;
    private otpTemplateGenerator: IOtpEmailContentGenerator
    private emailService: IEmailService
    private cacheStorage: IkeyValueTTLCaching
    private userPersistance: IUserPersistance;

    constructor(otpService: IOtpService, otpTemplateGenerator: IOtpEmailContentGenerator, emailService: IEmailService, cacheStorage: IkeyValueTTLCaching, userPersistance:IUserPersistance) {

        this.otpService = otpService;
        this.otpTemplateGenerator = otpTemplateGenerator
        this.cacheStorage = cacheStorage;
        this.emailService = emailService;
        this.userPersistance = userPersistance;
    }
    async sendOtp(email: string): Promise<void> {

        const existingEmail = await this.userPersistance.findByEmail(email);
        if(existingEmail){
            throw new Error("Email is already used by another user");
        }

        const OTP = this.otpService.generateOtp();

        const emailTemplate: IOtpEmailTemplate = {
            receiverMail: email,
            subject: "OTP",
            otp: OTP
        }

        emailTemplate.content = this.otpTemplateGenerator.generateTemplate(OTP);
        this.emailService.sendEmail(emailTemplate as Required<IOtpEmailTemplate>)
        this.cacheStorage.setData(`otp/${email}`, 2 * 60, OTP)
        this.cacheStorage.setData(`otp/${email}`, 5 * 60, OTP)
    }
}