import { IUserPersistance } from "../../domain/interfaces/respository/persistentStorage/IUserPersistance";
import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { IHashService } from "../../domain/interfaces/service/IHashService";
import { IForgetPasswordVerifyOtpUseCase } from "../../domain/interfaces/useCase/auth/ IForgetPasswordVerifyOtp";

export class ForgetPasswordVerifyOtpUseCase implements IForgetPasswordVerifyOtpUseCase {
    constructor(
        private _cacheService: IkeyValueTTLCaching,
        private _userPersistance: IUserPersistance,
        private _hashService: IHashService
    ) {

    }

    async verifyOtp(email: string, otp: string, newPassword: string): Promise<void> {
        const cachedOtp = await this._cacheService.getData(`forgetOtp/${email}`);
        if (!cachedOtp){
            throw new Error("OTP timeout or otp not requested");
        }

        const otpMatch = cachedOtp === otp;
        if(!otpMatch){
            console.log("otp not matching", cachedOtp != otp)
            throw new Error("OTP Not Matching");
        }

        const hashedPassword = await this._hashService.hash(newPassword);
        await this._userPersistance.findByEmailAndUpdatePassword(email, hashedPassword);
        await this._cacheService.deleteData(`forgetOtp/${email}`);
    }
}