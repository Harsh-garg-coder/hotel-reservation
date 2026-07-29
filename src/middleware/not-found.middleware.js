import { NotFoundError } from "../utils/errors/app.error.js";

export default function notFoundHandler(req, res, next) {
    next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
}
