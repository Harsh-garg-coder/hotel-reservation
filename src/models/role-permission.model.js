import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export default class RolePermission extends Model {}

RolePermission.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    permissionId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "role_permissions",
    underscored: true,
    timestamps: true
});