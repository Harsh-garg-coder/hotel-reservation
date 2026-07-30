import { serverConfig } from "../config/server.config.js";
import { loginService, logoutService, refreshService, signupService } from "../services/auth.service.js"

const isDev = serverConfig.NODE_ENV === "development";

export const signupController = async (req, res) => {
    await signupService(req.body);

    res.status(201).json({
        message: "User created successfully!"
    });
}

export const loginController = async (req, res) => {
    const { accessToken, refreshToken } = await loginService(req.body);

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: !isDev,
        sameSite: true,
        maxAge: 1000 * 60 * 15
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: !isDev,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    });

    res.status(200).json({
        message: "Login successful!"
    });
}

export const refreshController = async (req, res) => {
    const { refresh_token: refreshToken } = req.cookies;
    const { accessToken, newRefreshToken } = await refreshService(refreshToken);

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: !isDev,
        sameSite: true,
        maxAge: 1000 * 60 * 15
    });

    res.cookie("refresh_token", newRefreshToken, {
        httpOnly: true,
        secure: !isDev,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    });

    res.status(200).json({
        message: "Refesh successful!"
    });
}

export const logoutController = async (req, res) => {
    const { refresh_token: refreshToken } = req.cookies;
    await logoutService(refreshToken);

    res.clearCookie("access_token", {
        httpOnly: true,
        secure: !isDev,
        sameSite: true,
    });

    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: !isDev,
        sameSite: true,
    });

    res.status(200).json({
        message: "Logout successful!"
    });
}