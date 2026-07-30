import { addEmailToQueue } from "../producers/mailer.producer.js";
import { BadRequestError, ConflictError } from "../utils/errors/app.error.js";
import { createAccessToken, createRefreshToken } from "../utils/helpers/token.helpers.js";
import { saveRefreshToken } from "./refresh-token.service.js";
import { createUserService, findUserByEmail } from "./user.service.js"
import bcrypt from "bcrypt";

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
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);

    await saveRefreshToken({
        token: refreshToken,
        userId: user?.id,
        expiresAt: Date.now() + (1000 * 60 * 60 * 24 * 30)
    });

    return { accessToken, refreshToken };
}