import logger from "../config/logger.config.js";

export default function logRequest(req, res, next) {
    const reqMethod = req.method;
    const url = req.originalUrl;
    logger.info(`${reqMethod} ${url}`);
    next();
}