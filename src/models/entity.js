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
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
    deletedAt: { type: DataTypes.DATE, field: 'deleted_at' }
  };

  return sequelize.define('Entity', fields, {
    paranoid: true,
    tableName: 'entities',
    timestamps: true
  });
};
