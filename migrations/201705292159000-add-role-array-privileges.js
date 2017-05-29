module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('privileges', 'role_ids', {
      type: Sequelize.ARRAY(Sequelize.UUID),
      defaultValue: []
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('privileges', 'role_ids');
  }
};
