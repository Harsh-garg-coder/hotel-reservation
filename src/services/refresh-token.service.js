import RerfeshTokenRepository from "../repositories/refresh-token.repository.js"

const refreshTokenRepository = new RerfeshTokenRepository();

export const saveRefreshToken = async (data) => {
    await refreshTokenRepository.create(data);
}

export const getRefreshTokenByToken = async (token) => {
    return await refreshTokenRepository.getByToken(token);
}

export const revokeRefreshTokenById = async (id) => {
    await refreshTokenRepository.revokeById(id);
}