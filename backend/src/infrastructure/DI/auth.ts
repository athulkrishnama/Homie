import { AdminLoginController } from "../../interfaceAdapters/controllers/auth/adminLogin";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/loginUser";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/registerUser";
import { ResendOtpController } from "../../interfaceAdapters/controllers/auth/resendOtp";
import { sendOtpController } from "../../interfaceAdapters/controllers/auth/sendOtp";
import { AdminLoginUseCase } from "../../useCases/auth/adminLogin";
import { CacheUserUseCase } from "../../useCases/auth/cacheUser";
import { CreateUserUseCase } from "../../useCases/auth/createUser";
import { ResendOtpUseCase } from "../../useCases/auth/reSendOtp";
import { sendOtpUseCase } from "../../useCases/auth/sendOtp";
import { TokenCreationUseCase } from "../../useCases/auth/TokenCreation";
import { UserLoginUseCase } from "../../useCases/auth/userlogin";
import { VerifyOtpUseCase } from "../../useCases/auth/verifyOtp";
import { KeyValueTTLCaching } from "../cacheStorage/redis/keyValueTTLCaching";
import { UserPersistance } from "../persistantStorage/mongodb/repositories/userPersistance";
import { OtpEmailContentGenerator } from "../services/emailContentGenerator/otpEmailContentGenerator";
import { ResendOtpEmailContentGenerator } from "../services/emailContentGenerator/resendOTPEmailContentGenerator";
import { EmailService } from "../services/emailService";
import { HashService } from "../services/HashService";
import { JWTService } from "../services/JWTService";
import { OtpService } from "../services/otpService";

// Create User Send Otp Controller
const otpService = new OtpService()
const otpContentGenerator = new OtpEmailContentGenerator()
const emailSerivce = new EmailService()
const userPersistance = new UserPersistance()
const cacheStorage = new KeyValueTTLCaching()
const injectedSendOtpUseCase = new sendOtpUseCase(otpService, otpContentGenerator, emailSerivce, cacheStorage, userPersistance)
export const injectedRegisterSendOtpController = new sendOtpController(injectedSendOtpUseCase)

// Resend Otp controller
const resendOtpContentGenerator = new ResendOtpEmailContentGenerator()
const resendOtpUseCase = new ResendOtpUseCase(otpService, resendOtpContentGenerator, emailSerivce, cacheStorage)
export const injectedResendOtpController = new ResendOtpController(resendOtpUseCase);

// Create User Controller
const hashService = new HashService();
const injectedCreateUserUseCase = new CreateUserUseCase(userPersistance, hashService)

const injectedVerifyOtpUseCase = new VerifyOtpUseCase(cacheStorage)

export const injectedCreateUserController = new RegisterUserController(injectedVerifyOtpUseCase, injectedCreateUserUseCase)

// Login Controller
const jwtService = new JWTService()
const tokenCreationUseCase = new TokenCreationUseCase(jwtService);

const userLoginUseCase = new UserLoginUseCase(userPersistance, hashService)

const cacheUserUseCase = new CacheUserUseCase(cacheStorage)

export const injectedLoginUserController = new LoginUserController(userLoginUseCase, tokenCreationUseCase, cacheUserUseCase)

// Admin Login Controller
const adminLoginUseCase = new AdminLoginUseCase(userPersistance, hashService);

export const injectedAdminLoginController = new AdminLoginController(adminLoginUseCase, tokenCreationUseCase)