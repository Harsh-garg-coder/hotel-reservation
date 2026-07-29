import winston from "winston";
import { getCorrelationId } from "../utils/helpers/request.helper.js";

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss"}),
        winston.format.json(),
        winston.format.printf(({ timestamp, message, level, ...data}) => {
            const output = { message, level, timestamp, correlationId: getCorrelationId(),  data };
            return JSON.stringify(output);
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/app.log"})
    ]
});

export default logger;