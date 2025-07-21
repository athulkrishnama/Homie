import { IOtpService } from "../../domain/interfaces/service/IOtp";

export class OtpService implements IOtpService{
    generateOtp(): string {
        return Math.floor((Math.random() * 9000) + 1000).toString()
    } 
}