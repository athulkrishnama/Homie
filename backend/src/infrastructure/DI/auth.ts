import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/registerUser";
import { sendOtpController } from "../../interfaceAdapters/controllers/auth/sendOtp";
import { CreateUserUseCase } from "../../useCases/auth/createUser";
import { sendOtpUseCase } from "../../useCases/auth/sendOtp";
import { VerifyOtpUseCase } from "../../useCases/auth/verifyOtp";
import { KeyValueTTLCaching } from "../cacheStorage/redis/keyValueTTLCaching";
import { userRepository } from "../persistantStorage/mongodb/repositories/userRepository";
import { OtpEmailContentGenerator } from "../services/emailContentGenerator/otpEmailContentGenerator";
import { EmailService } from "../services/emailService";
import { HashService } from "../services/HashService";
import { OtpService } from "../services/otpService";

// Create User Send Otp Controller
const otpService = new OtpService()
const otpContentGenerator = new OtpEmailContentGenerator()
const emailSerivce = new EmailService()
const cacheStorage = new KeyValueTTLCaching()
const injectedSendOtpUseCase = new sendOtpUseCase(otpService, otpContentGenerator, emailSerivce, cacheStorage)
export const injectedRegisterSendOtpController = new sendOtpController(injectedSendOtpUseCase)

// Create User Controller
const hashService = new HashService();
const userPersistance = new userRepository()
const injectedCreateUserUseCase = new CreateUserUseCase(userPersistance, hashService)

const injectedVerifyOtpUseCase = new VerifyOtpUseCase(cacheStorage)

export const injectedCreateUserController = new RegisterUserController(injectedVerifyOtpUseCase, injectedCreateUserUseCase)