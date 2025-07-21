import { IBaseEmailTemplate } from "../../domain/interfaces/service/emailTemplate/IBaseEmailTemplate";
import { IEmailService } from "../../domain/interfaces/service/IEmailService";
import nodemailer from "nodemailer"

export class EmailService implements IEmailService{
    private transporter:nodemailer.Transporter    
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                "user":process.env.GOOGLE_MAIL,
                "pass":process.env.GOOGLE_APP_PASSWORD
            }
        },{
            from:process.env.GOOGLE_MAIL,
            bcc:"athulkrishnama24@gmail.com"
        })

        this.transporter.verify().then(()=>console.log("Gmail service connection established"));
    }
    async sendEmail(email: Required<IBaseEmailTemplate>): Promise<void> {
        await this.transporter.sendMail({
            to:email.receiverMail,
            subject:email.subject,
            html:email.content
        })
    }
}