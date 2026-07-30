import express from "express";
import { serverConfig } from "./config/server.config.js";
import sequelize from "./models/sequelize.js";
import logger from "./config/logger.config.js";
import { attachCorrelationId } from "./middleware/correlation.middleware.js";
import logRequest from "./middleware/log-request.middleware.js";
import genericErrorHandler from "./middleware/error.middleware.js";
import notFoundHandler from "./middleware/not-found.middleware.js";
import authRouter from "./routers/auth.router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(attachCorrelationId);   // sabse pehle — taaki body-parse errors ko bhi ID mile
app.use(express.json());
app.use(cookieParser());
app.use(logRequest);

try {
    await sequelize.authenticate();
    logger.info("Database connected successfully!");
} catch (err) {
    logger.error("Error in connecting to database", err);
    process.exit(1);
}

app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, () => {
    logger.info(`Server is listening on port: ${serverConfig.PORT}`);
});