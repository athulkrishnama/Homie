import { JWTPayloadType } from "../../types/JWTPayloadType";

export interface ITokenCreationUseCase {
    createAccessTokenAndRefreshToken(payload: JWTPayloadType): { accessToken: string, refreshToken: string }
}