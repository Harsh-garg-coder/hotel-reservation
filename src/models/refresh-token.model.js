import { DataTypes, Model } from "sequelize";
import sequelize from "./sequelize.js";

export default class RefreshToken extends Model {}

RefreshToken.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    revokedAt: {
        type: DataTypes.DATE,
        defaultValue: null    
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "refresh_tokens",
    underscored: true,
    timestamps: true
})