export class InternalServerError extends Error {
    constructor(message) {
        super();
        this.name = "InternalServerError";
        this.statusCode = 500;
        this.message = message;
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super();
        this.name = "NotFoundError";
        this.statusCode = 404;
        this.message = message;
    }
}

export class BadRequestError extends Error {
    constructor(message) {
        super();
        this.name = "BadRequestError";
        this.statusCode = 400;
        this.message = message;
    }
}