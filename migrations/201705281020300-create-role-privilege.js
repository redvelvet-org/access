module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('role_privileges', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        }
      },
      privilege_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'privileges',
          key: 'id'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    }).then(() => (
      queryInterface.addIndex('role_privileges', ['deleted_at'])))
      .then(() => (
      queryInterface.addIndex('role_privileges', ['role_id', 'privilege_id'],
                              { indicesType: 'UNIQUE' })));
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('role_privileges');
  }
};
