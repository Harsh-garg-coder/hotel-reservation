export class AppError extends Error {
    constructor(message, statusCode = 500, errors = undefined) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.errors = errors;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad request", errors) {
        super(message, 400, errors);
    }
}

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = "Resource already exists") {
        super(message, 409);
    }
}

export class InternalServerError extends AppError {
    constructor(message = "Internal server error") {
        super(message, 500);
    }
}

export class UnAuthenticatedError extends AppError {
    constructor(message = "UnAuthenticated") {
        super(message, 401);
    }
}