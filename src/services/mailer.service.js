import logger from "../config/logger.config.js";
import transporter from "../config/mailer.config.js";
import { serverConfig } from "../config/server.config.js";
import { InternalServerError } from "../utils/errors/app.error.js";

export const sendEmail = async (to, subject, body) => {
    try {
        await transporter.sendMail({
            from: serverConfig.MAIL_USER,
            to,
            subject,
            html: body
        });
        logger.info(`Email sent to ${to} with subject ${subject}`);
    } catch(error) {
        throw new InternalServerError("Failed to send email!");
    }
}