'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('playersummary', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      steamid: {
        type: Sequelize.STRING
      },
      communityvisibilitystate: {
        type: Sequelize.INTEGER
      },
      profilestate: {
        type: Sequelize.INTEGER
      },
      personaname: {
        type: Sequelize.STRING
      },
      commentpermission: {
        type: Sequelize.INTEGER
      },
      profileurl: {
        type: Sequelize.STRING
      },
      lastlogoff: {
        type: Sequelize.INTEGER
      },
      personastate: {
        type: Sequelize.INTEGER
      },
      realname: {
        type: Sequelize.STRING
      },
      primaryclientid: {
        type: Sequelize.STRING
      },
      timecreated: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playersummary');
  }
};