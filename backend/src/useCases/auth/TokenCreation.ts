import { IJWTService } from "../../domain/interfaces/service/IJWTService";
import { JWTPayloadType } from "../../domain/interfaces/types/JWTPayloadType";
import { ITokenCreationUseCase } from "../../domain/interfaces/useCase/auth/ITokenCreationUseCase";

export class TokenCreationUseCase implements ITokenCreationUseCase {
    constructor(private JWTService: IJWTService) {

    }

    createAccessTokenAndRefreshToken(payload: JWTPayloadType): { accessToken: string; refreshToken: string; } {
        const accessToken = this.JWTService.createAccessToken(payload);
        const refreshToken = this.JWTService.createRefreshToken(payload);
        return { accessToken, refreshToken }
    }
}