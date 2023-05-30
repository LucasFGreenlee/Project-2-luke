'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.game.belongsTo(models.user);
    }
  }
  game.init({
    name: DataTypes.STRING,
    last_played: DataTypes.STRING,
    play_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'game',
  });
  return game;
};