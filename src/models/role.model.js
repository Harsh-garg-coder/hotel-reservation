import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export default class Role extends Model {}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    tableName: "roles",
    underscored: true,
    timestamps: true
})