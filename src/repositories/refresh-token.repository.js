import { RefreshToken } from "../models/index.js";
import BaseRepository from "./base.repository.js";

export default class RerfeshTokenRepository extends BaseRepository {
    constructor() {
        super(RefreshToken);
    }

    async getByToken(token) {
        const refreshToken = await this.model.findOne({
            where: {
                token
            }
        });
        return refreshToken;
    }

    async revokeByToken(token) {
        const refreshToken = await this.model.findOne({
            where: {
                token
            }
        });
        refreshToken.revokedAt = Date.now();
        await refreshToken.save();
    }
}