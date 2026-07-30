import { Worker } from "bullmq";
import { MAILER_QUEUE } from "../queues/mailer.queue.js";
import { MAILER_PAYLOAD } from "../producers/mailer.producer.js";
import renderMailTemplate from "../templates/templates.handler.js";
import logger from "../config/logger.config.js";
import { getRedisConnectionObject } from "../config/redis.config.js";
import { sendEmail } from "../services/mailer.service.js";

const setupMailerConsumer = () => {
    const mailerConsumer = new Worker(
        MAILER_QUEUE, 
        async (job) => {
            if(job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }

            const payload = job.data;
            
            const emailContent = await renderMailTemplate(payload.templateId, payload.params);

            await sendEmail(payload.to, payload.subject, emailContent);

            logger.info(`Email sent to ${payload.to} with subject "${payload.subject}"`);
        },
        {
            connection: getRedisConnectionObject()
        }
    );

    mailerConsumer.on("failed", (job, error) => {
        logger.error(
            `Mail job ${job?.id} failed (attempt ${job?.attemptsMade})`, 
            {
                to: job?.data?.to, error: error.message
            }
        );
    });

    mailerConsumer.on("completed", () => {
        console.log("Email processing completed successfully");
    });
}

export default setupMailerConsumer;