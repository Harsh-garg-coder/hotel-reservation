import { addEmailToQueue } from "../producers/mailer.producer.js";
import { BadRequestError, ConflictError, UnAuthenticatedError } from "../utils/errors/app.error.js";
import { createAccessToken, createRefreshToken } from "../utils/helpers/token.helpers.js";
import { getRefreshTokenByToken, revokeRefreshTokenByToken, saveRefreshToken } from "./refresh-token.service.js";
import { createUserService, findUserByEmail } from "./user.service.js"
import bcrypt from "bcrypt";
import crypto from "crypto";

export const signupService = async (signupData) => {
    const { email, password, name } = signupData;
    const user = await findUserByEmail(email);

    if(user) {
        throw new ConflictError("User is already present");
    } else {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await createUserService({
            email,
            password: hashedPassword,
            name
        });
        await addEmailToQueue({
            to: email,
            templateId: "welcome",
            subject: "Welcome to Hotel Reservation!",
            params: {
                name,
                appName: "Hotel Reservation"
            }
        });
        return newUser;
    }
}

export const loginService = async (loginData) => {
    const { email, password } = loginData;

    const user = await findUserByEmail(email);
    if(!user) {
        throw new BadRequestError("Invalid credentials!");
        return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        throw new BadRequestError("Invalid credentials!");
        return;
    }

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);

    await saveRefreshToken({
        token: refreshToken,
        userId: user?.id,
        expiresAt: Date.now() + (1000 * 60 * 60 * 24 * 30)
    });

    return { accessToken, refreshToken };
}

export const refreshService = async (token) => {
    if(!token) {
        throw new UnAuthenticatedError();
        return;
    }

    const refreshToken = await getRefreshTokenByToken(token);
    if(!refreshToken) {
        throw new UnAuthenticatedError();
        return;
    }

    const isTokenExpired = refreshToken.expiresAt < Date.now();
    const isTokenRevoked = refreshToken.revokedAt !== null;

    if(isTokenExpired || isTokenRevoked) {
        throw new UnAuthenticatedError();
        return;
    }
    
    // token is present and valid
    const accessToken = createAccessToken(refreshToken?.userId);
    const newRefreshToken = createRefreshToken(refreshToken?.userId);

    await saveRefreshToken({
        token: newRefreshToken,
        userId: refreshToken?.userId,
        expiresAt: Date.now() + (1000 * 60 * 60 * 24 * 30)
    });
    await revokeRefreshTokenByToken(token);

    return { accessToken, newRefreshToken }; 
}

export const logoutService = async (refreshToken) => {
    if(!refreshToken) {
        throw new UnAuthenticatedError();
        return;
    }

    const refreshTokenRow = await getRefreshTokenByToken(refreshToken);
    if(!refreshTokenRow) {
        throw new UnAuthenticatedError();
        return;
    }

    const isExpired = refreshTokenRow.expiresAt < Date.now();
    const isRevoked = refreshTokenRow.revokedAt !== null;

    if(isExpired || isRevoked) {
        throw new UnAuthenticatedError();
        return;
    }

    await revokeRefreshTokenByToken(refreshToken);
}