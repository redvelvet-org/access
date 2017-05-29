module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('roles', 'privilege_ids', {
      type: Sequelize.ARRAY(Sequelize.UUID),
      defaultValue: []
    });
  },
  down: (queryInterface) => {
    return queryInterface.removeColumn('roles', 'privilege_ids');
  }
};
