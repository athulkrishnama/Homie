import { IkeyValueTTLCaching } from "../../domain/interfaces/respository/cacheStorage/IKeyValueTTLCaching";
import { IVerifyOtpUseCase } from "../../domain/interfaces/useCase/auth/IVerifyOtp";

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
    private cacheStorage: IkeyValueTTLCaching;

    constructor(cacheStorage: IkeyValueTTLCaching) {
        this.cacheStorage = cacheStorage;
    }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const cachecdOtp = await this.cacheStorage.getData(`otp/${email}`);
        if (!cachecdOtp) {
            throw new Error("OTP Expired or OTP not requested")
        }
        const otpVerified = otp === cachecdOtp;
        if (otpVerified) {
            await this.cacheStorage.deleteData(`otp/${email}`);
        }

        return otpVerified;
    }
}