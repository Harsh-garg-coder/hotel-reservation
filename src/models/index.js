import { Sequelize } from "sequelize";

import configs from "../config/database.config.js";

const env = process.env.NODE_ENV || "development";
const config = configs[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

for (const model of Object.values(db)) {
  if (typeof model.associate === "function") model.associate(db);
}

db.sequelize = sequelize; // connection instance — raw queries, transactions
db.Sequelize = Sequelize; // class — Op, QueryTypes, fn/col/literal

export { Sequelize };
export default db;
