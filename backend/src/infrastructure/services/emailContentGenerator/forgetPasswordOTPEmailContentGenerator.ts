import { IOtpEmailContentGenerator } from "../../../domain/interfaces/service/emailContentGenerators/IOtpEmailContentGenerator";
import { BaseEmailContentGenerator } from "./baseEmailContentGenerator";

export class ForgetPasswordOTPEmailContentGenerator extends BaseEmailContentGenerator implements IOtpEmailContentGenerator {
    generateTemplate(otp: string): string {
        const body = `this is otp ${otp}`
        return this.htmlWrapper(this.generateHeader() + body + this.generateFooter())
    }
}
