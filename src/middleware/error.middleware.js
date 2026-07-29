import {
    ValidationError,
    UniqueConstraintError,
    ForeignKeyConstraintError,
    ConnectionError,
    BaseError
} from "sequelize";
import logger from "../config/logger.config.js";
import { getCorrelationId } from "../utils/helpers/request.helper.js";

export default function genericErrorHandler(err, req, res, next) {
    if (res.headersSent) return next(err);

    let statusCode = err.statusCode || 500;
    let message = err.message;
    let errors = err.errors;

    // subclass pehle, parent baad me — UniqueConstraintError extends ValidationError
    if (err instanceof UniqueConstraintError) {
        statusCode = 409;
        message = "Resource already exists";
        errors = err.errors.map(e => ({ field: e.path, message: `${e.path} already in use` }));
    } else if (err instanceof ValidationError) {
        statusCode = 400;
        message = "Validation failed";
        errors = err.errors.map(e => ({ field: e.path, message: e.message }));
    } else if (err instanceof ForeignKeyConstraintError) {
        statusCode = 400;
        message = "Referenced resource does not exist";
        errors = undefined;
    } else if (err instanceof ConnectionError) {
        statusCode = 503;
        message = "Database unavailable";
        errors = undefined;
    } else if (err instanceof BaseError) {
        // baaki sab Sequelize errors — raw SQL kabhi client tak nahi jaana chahiye
        statusCode = 500;
        message = "Internal server error";
        errors = undefined;
    }

    if (statusCode >= 500) logger.error(err.message, { stack: err.stack });
    else logger.warn(`${req.method} ${req.originalUrl} -> ${statusCode}: ${err.message}`);

    res.status(statusCode).json({
        success: false,
        message: statusCode >= 500 && process.env.NODE_ENV === "production"
            ? "Internal server error"
            : message,
        ...(errors && { errors }),
        correlationId: getCorrelationId()
    });
}
