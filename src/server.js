import express from "express";
import { serverConfig } from "./config/server.config.js";
import sequelize from "./models/sequelize.js";
import logger from "./config/logger.config.js";
import { attachCorrelationId } from "./middleware/correlation.middleware.js";
import logRequest from "./middleware/log-request.middleware.js";

const app = express();

app.use(express.json());
app.use(attachCorrelationId);
app.use(logRequest);

try {
    await sequelize.authenticate();
    logger.info("Database connected successfully!");
} catch (err) {
    logger.error("Error in connecting to database", err);
    process.exit(1);
}

app.listen(serverConfig.PORT, () => {
    logger.info(`Server is listening on port: ${serverConfig.PORT}`);
});