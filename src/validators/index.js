import logger from "../config/logger.config.js";

export const validateReqBody = (schema) => {
    return async (req, res, next) => {
        try {
            logger.info("Validating req body");
            await schema.parse(req.body);
            logger.info("Req body is valid");
            next();
        } catch(error) {
            logger.info("Req body is invalid", error);
            res.status(400).json({
                message: "Invalid request body",
                errors: error.issues.map(i => ({
                    field: i.path.join(".") || "body",
                    message: i.message
                }))
            });
        }
    }
}

export const validateReqParams = () => {

}