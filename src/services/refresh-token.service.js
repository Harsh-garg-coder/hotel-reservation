import RerfeshTokenRepository from "../repositories/refresh-token.repository.js"
import crypto from "crypto";

const refreshTokenRepository = new RerfeshTokenRepository();

export const saveRefreshToken = async (data) => {
    const hashedRefreshToken = crypto.createHash("sha256").update(data.token).digest("hex");
    await refreshTokenRepository.create({
        ...data,
        token: hashedRefreshToken,
    });
}

export const getRefreshTokenByToken = async (token) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return await refreshTokenRepository.getByToken(hashedToken);
}

export const revokeRefreshTokenByToken = async (token) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    await refreshTokenRepository.revokeByToken(hashedToken);
}