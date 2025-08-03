import { IkeyValueTTLCaching } from "../../domain/interfaces/service/cacheStorage/IKeyValueTTLCaching";
import { IVerifyOtpUseCase } from "../../domain/interfaces/useCase/auth/IVerifyOtp";

export class VerifyOtpUseCase implements IVerifyOtpUseCase {
    private _cacheStorage: IkeyValueTTLCaching;

    constructor(cacheStorage: IkeyValueTTLCaching) {
        this._cacheStorage = cacheStorage;
    }

    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const cachecdOtp = await this._cacheStorage.getData(`otp/${email}`);
        if (!cachecdOtp) {
            throw new Error("OTP Expired or OTP not requested")
        }
        const otpVerified = otp === cachecdOtp;
        if (otpVerified) {
            await this._cacheStorage.deleteData(`otp/${email}`);
        }

        return otpVerified;
    }
}