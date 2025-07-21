export interface IBaseEmailTemplate{
    receiverMail:string | string[]
    subject:string
    content?:string
}