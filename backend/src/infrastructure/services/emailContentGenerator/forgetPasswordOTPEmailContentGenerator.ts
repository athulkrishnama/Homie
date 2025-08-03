import { IOtpEmailContentGenerator } from "../../../domain/interfaces/service/emailContentGenerators/IOtpEmailContentGenerator";
import { BaseEmailContentGenerator } from "./baseEmailContentGenerator";

export class ForgetPasswordOTPEmailContentGenerator extends BaseEmailContentGenerator implements IOtpEmailContentGenerator {
    generateTemplate(otp: string): string {
        const body = `<!-- Forgot Password OTP Email Body -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff; padding:40px 0;">
            <tr>
                <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="width:600px; padding:0 20px;">
                    <tr>
                    <td style="color:#000000; font-size:16px; font-family:Arial, sans-serif; line-height:1.6;">
                        <p style="margin:0 0 20px 0;">Hi <strong>User</strong>,</p>

                        <p style="margin:0 0 20px 0;">
                        We received a request to reset your password. Use the OTP below to proceed:
                        </p>

                        <!-- OTP Box -->
                        <p style="margin:30px 0;">
                        <span style="display:inline-block; background-color:#f5f5f5; border:1px solid #cccccc; padding:15px 25px; font-size:32px; font-weight:bold; letter-spacing:8px; color:#000000; text-align:center;">
                        ${otp}
                        </span>
                        </p>

                        <p style="margin:20px 0;">
                        This code is valid for the next <strong>10 minutes</strong>. Please do not share this OTP with anyone for your account's security.
                        </p>

                        <p style="margin:30px 0 0 0;">
                        If you didn't request a password reset, you can ignore this email.
                        </p>

                        <p style="margin:30px 0 0 0;">
                        Regards,<br>
                        <strong>YourAppName Team</strong>
                        </p>
                    </td>
                    </tr>
                </table>
                </td>
            </tr>
            </table>`
        return this.htmlWrapper(this.generateHeader() + body + this.generateFooter())
    }
}
