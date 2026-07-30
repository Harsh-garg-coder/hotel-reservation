import "dotenv/config";

export const serverConfig = {
    PORT: Number(process.env.PORT) || 8000,
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
    REDIS_HOST: process.env.REDIS_HOST || "localhost",
    MAIL_USER: process.env.MAIL_USER || "",
    MAIL_PASS: process.env.MAIL_PASS || "",
}