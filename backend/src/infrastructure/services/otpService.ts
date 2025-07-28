import { IOtpService } from "../../domain/interfaces/service/IOtp";

export class OtpService implements IOtpService{
    generateOtp(): string {
        return Math.floor((Math.random() * 900000) + 100000).toString()
    } 
}