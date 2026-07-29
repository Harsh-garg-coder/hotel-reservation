import logger from "../config/logger.config.js";
import { BadRequestError } from "../utils/errors/app.error.js";

export const validateReqBody = (schema) => {
    return (req, res, next) => {
        try {
            logger.info("Validating req body");
            schema.parse(req.body);
            logger.info("Req body is valid");
            next();
        } catch(error) {
            if (!error.issues) return next(error);   // ZodError nahi hai, aage bhej do

            logger.warn("Req body is invalid");
            throw new BadRequestError("Invalid request body", error.issues.map(i => ({
                field: i.path.join(".") || "body",
                message: i.message
            })))
        }
    }
}

export const validateReqParams = () => {

}
