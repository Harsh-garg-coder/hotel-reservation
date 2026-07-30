import RerfeshTokenRepository from "../repositories/refresh-token.repository.js"

const refreshTokenRepository = new RerfeshTokenRepository();

export const saveRefreshToken = async (data) => {
    await refreshTokenRepository.create(data);
}