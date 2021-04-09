'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'superpowers_to_superheroes',
      'created_at',
      Sequelize.DATE,
      { allowNull: false }
    );
    await queryInterface.addColumn(
      'superpowers_to_superheroes',
      'updated_at',
      Sequelize.DATE,
      { allowNull: false }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
