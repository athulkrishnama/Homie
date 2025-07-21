import { sendOtpController } from "../../interfaceAdapters/controllers/auth/sendOtp";
import { sendOtpUseCase } from "../../useCases/auth/sendOtp";
import { KeyValueTTLCaching } from "../cacheStorage/redis/keyValueTTLCaching";
import { OtpEmailContentGenerator } from "../services/emailContentGenerator/otpEmailContentGenerator";
import { EmailService } from "../services/emailService";
import { OtpService } from "../services/otpService";

// Register Send Otp Controller
const otpService = new OtpService()
const otpContentGenerator = new OtpEmailContentGenerator()
const emailSerivce = new EmailService()
const cacheStorage = new KeyValueTTLCaching()
const injectedSendOtpUseCase = new sendOtpUseCase(otpService, otpContentGenerator, emailSerivce, cacheStorage)
export const injectedRegisterSendOtpController = new sendOtpController(injectedSendOtpUseCase)