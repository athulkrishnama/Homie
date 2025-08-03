import { AdminLoginUseCase } from "../../useCases/auth/adminLogin";
import { CacheUserUseCase } from "../../useCases/auth/cacheUser";
import { CreateUserUseCase } from "../../useCases/auth/createUser";
import { ResendOtpUseCase } from "../../useCases/auth/reSendOtp";
import { SendOtpUseCase } from "../../useCases/auth/sendOtp";
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

import { AuthController } from "../../interfaceAdapters/controllers/authController";
import { ForgetPasswordUseCase } from "../../useCases/auth/forgetPasswordSendOtp";
import { UserModel } from "../persistantStorage/mongodb/models/userModel";
import { ForgetPasswordOTPEmailContentGenerator } from "../services/emailContentGenerator/forgetPasswordOTPEmailContentGenerator";

// Create User Send Otp Controller
const otpService = new OtpService()
const otpContentGenerator = new OtpEmailContentGenerator()
const emailSerivce = new EmailService()
const userPersistance = new UserPersistance(UserModel)
const cacheStorage = new KeyValueTTLCaching()
const sendOtpUseCase = new SendOtpUseCase(otpService, otpContentGenerator, emailSerivce, cacheStorage, userPersistance)

const resendOtpContentGenerator = new ResendOtpEmailContentGenerator()
const resendOtpUseCase = new ResendOtpUseCase(otpService, resendOtpContentGenerator, emailSerivce, cacheStorage)

const hashService = new HashService();
const createUserUseCase = new CreateUserUseCase(userPersistance, hashService)

const verifyOtpUseCase = new VerifyOtpUseCase(cacheStorage)


const jwtService = new JWTService()
const tokenCreationUseCase = new TokenCreationUseCase(jwtService);

const userLoginUseCase = new UserLoginUseCase(userPersistance, hashService)

const cacheUserUseCase = new CacheUserUseCase(cacheStorage)


const adminLoginUseCase = new AdminLoginUseCase(userPersistance, hashService);

const forgetOtpContentGenerator = new ForgetPasswordOTPEmailContentGenerator()
const forgetPasswordUseCase = new ForgetPasswordUseCase(userPersistance, otpService, emailSerivce, cacheStorage, forgetOtpContentGenerator);

export const injectedAuthController = new AuthController(
    adminLoginUseCase,
    tokenCreationUseCase,
    userLoginUseCase,
    cacheUserUseCase,
    verifyOtpUseCase,
    createUserUseCase,
    resendOtpUseCase,
    sendOtpUseCase,
    forgetPasswordUseCase)