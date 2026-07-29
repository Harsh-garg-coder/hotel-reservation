import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export default class UserRole extends Model {}

UserRole.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "user_roles",
    underscored: true,
    timestamps: true
});