import logger from "../config/logger.config";

export default function genericErrorHandler(err, req, res, next) {
    logger.error(err.message, err);
    res.status(err.statusCode || 500).json({
        message: err.message,
        success: false
    });
}