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

    async revokeById(id) {
        const refreshToken = await this.model.findOne({
            where: {
                id
            }
        });
        refreshToken.revokedAt = Date.now();
        await refreshToken.save();
    }
}