'use strict';

const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = [...new Array(5)].map(_ => ({
      username: faker.internet.userName().toLowerCase(),
      password: bcrypt.hashSync('secret', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // for anonymous user
    users[0].username = 'anonymous';

    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
