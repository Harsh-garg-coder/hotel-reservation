import jwt from "jsonwebtoken";
import { serverConfig } from "../../config/server.config.js";

export const createAccessToken = (id) => {
    const accessToken = jwt.sign(
        { id }, 
        serverConfig.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m"
        }
    );
    return accessToken;
}

export const createRefreshToken = (id) => {
    const refreshToken = jwt.sign(
        { id },
        serverConfig.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d"
        }
    );
    return refreshToken;
}