export interface IForgetPasswordVerifyOtpUseCase {
    verifyOtp(email: string, otp: string, newPassword: string): Promise<void>
}