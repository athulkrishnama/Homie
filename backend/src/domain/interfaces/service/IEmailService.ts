import { IBaseEmailTemplate } from "./emailTemplate/IBaseEmailTemplate";

export interface IEmailService{
    sendEmail(email:Required<IBaseEmailTemplate>):Promise<void>
}