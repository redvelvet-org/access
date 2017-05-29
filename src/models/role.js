module.exports = (sequelize, DataTypes) => {
  const fields = {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    privilegeIds: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      defaultValue: [],
      field: 'privilege_ids'
    },
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    deletedAt: { type: DataTypes.DATE, field: 'deleted_at' }
  };

  return sequelize.define('Role', fields, {
    paranoid: true,
    tableName: 'roles',
    timestamps: true
  });
};
