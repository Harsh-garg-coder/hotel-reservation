import { Model, DataTypes } from "sequelize";
import sequelize from "./sequelize.js";

class User extends Model {}

// Model.init(attributes, options)
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: true,
    tableName: "users",
    underscored: true,
});

export default User;