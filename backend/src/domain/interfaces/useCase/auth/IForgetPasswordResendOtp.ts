export interface IForgetPasswordResendOtpUseCase{
    resendOtp(email:string):Promise<void>
}