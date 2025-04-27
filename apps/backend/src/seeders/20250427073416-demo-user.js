'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: Sequelize.UUIDV4(),
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.UUIDV4(),
        name: 'Jane Smith',
        email: 'jane@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
