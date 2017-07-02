module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('users', 'password_reset_token', {
    type: Sequelize.STRING,
    allowNull: true
  }).then(() => queryInterface.addColumn('users', 'password_reset_sent_at', {
    type: Sequelize.DATE,
    allowNull: true
  })),
  down: (queryInterface) =>
    queryInterface.removeColumn('users', 'password_reset_token')
    .then(() => queryInterface.removeColumn('users', 'password_reset_sent_at'))
};
