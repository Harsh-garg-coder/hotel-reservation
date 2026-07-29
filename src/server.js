import express from "express";
import { serverConfig } from "./config/server.config.js";
import sequelize from "./models/sequelize.js";

const app = express();

app.use(express.json());

try {
    await sequelize.authenticate();
    console.log("Database connected");
} catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
}

app.listen(serverConfig.PORT, () => {
    console.log(`Server is listening on port: ${serverConfig.PORT}`);
});