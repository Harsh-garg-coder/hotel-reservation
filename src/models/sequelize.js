import { Sequelize } from "sequelize";

import configs from "../config/database.config.js";

const env = process.env.NODE_ENV || "development";
const config = configs[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// load all models

// load all associations

export default sequelize;