import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export default class Permission extends Model {}

Permission.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    tableName: "permissions",
    underscored: true,
    timestamps: true,
});