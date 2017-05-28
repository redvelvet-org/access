module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'role_id'
    },
    privilegeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'privilege_id'
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    deletedAt: { type: DataTypes.DATE, field: 'deleted_at' }
  };

  const classMethods = {
    associate: (models, instance) => {
      instance.belongsTo(models.Role, { as: 'role', foreign_key: 'role_id' });
      instance.belongsTo(models.Privilege, { as: 'privilege', foreign_key: 'privilege_id' });
    }
  };

  return sequelize.define('RolePrivilege', fields, {
    paranoid: true,
    tableName: 'role_privileges',
    timestamps: true,
    classMethods
  });
};
