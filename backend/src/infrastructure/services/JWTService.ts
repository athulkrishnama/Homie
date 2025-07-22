import { IJWTService } from "../../domain/interfaces/service/IJWTService";
import { sign, verify } from 'jsonwebtoken'
import { JWTPayloadType } from "../../domain/interfaces/types/JWTPayloadType";

export class JWTService implements IJWTService {
    createAccessToken(payload: JWTPayloadType): string {
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error("access token secret not provided in env");
        }
        return sign(payload, secretKey, { expiresIn: "15m", });
    }

    createRefreshToken(payload: JWTPayloadType): string {
        const secretKey = process.env.REFRESH_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error("refresh token secret key not provided in env");
        }

        return sign(payload, secretKey, { expiresIn: '1d' })
    }

    verifyAccessToken(token: string): JWTPayloadType | null {
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error("access token secret not provided in env");
        }

        verify(token, secretKey, (err, decoded) => {
            if (err) return null
            return decoded as JWTPayloadType;
        })

        return null
    }

    verifyRefreshToken(token: string): JWTPayloadType | null {
        const secretKey = process.env.ACCESS_TOKEN_SECRET;
        if (!secretKey) {
            throw new Error("access token secret not provided in env");
        }

        verify(token, secretKey, (err, decoded) => {
            if (err) return null
            return decoded as JWTPayloadType;
        })

        return null
    }
}