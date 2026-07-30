import logger from "../config/logger.config.js";
import { mailerQueue } from "../queues/mailer.queue.js";

export const MAILER_PAYLOAD = "payload:mailer";

export const addEmailToQueue = async (payload) => {
    try {
        await mailerQueue.add(MAILER_PAYLOAD, payload);
        logger.info("Email added into the queue", payload);
    } catch(error) {
        logger.info("Failed to add email into the queue", {payload, error});
    }
}