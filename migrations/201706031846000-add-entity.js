module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entities', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
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
      queryInterface.addIndex('entities', ['deleted_at'])));
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('entities');
  }
};
