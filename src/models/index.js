import Role from "./role.model.js";
import User from "./user.model.js";
import UserRole from "./user-role.model.js";
import Permission from "./permission.model.js";
import RolePermission from "./role-permission.model.js";
import RefreshToken from "./refresh-token.model.js";


Role.belongsToMany(
  User, 
  { 
    through: UserRole, 
    foreignKey: "roleId", 
    otherKey: "userId" 
  }
);
User.belongsToMany(
  Role, 
  { 
    through: UserRole, 
    foreignKey:"userId", 
    otherKey: "roleId" 
  }
);

Role.belongsToMany(
  Permission, 
  { 
    through: RolePermission,
    foreignKey: "roleId",
    otherKey: "permissionId"
  }
);
Permission.belongsToMany(
  Role, 
  { 
    through: RolePermission,
    foreignKey: "permissionId",
    otherKey: "roleId"
  }
);

User.hasMany(
  RefreshToken, 
  {
    foreignKey: "userId"
  }
);

RefreshToken.belongsTo(
  User,
  {
    foreignKey: "userId"
  }
);

export { 
  User, 
  Role, 
  UserRole, 
  Permission, 
  RolePermission, 
  RefreshToken
};