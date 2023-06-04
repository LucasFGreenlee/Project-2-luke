'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playersummary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  playersummary.init({
    steamid: DataTypes.STRING,
    communityvisibilitystate: DataTypes.INTEGER,
    profilestate: DataTypes.INTEGER,
    personaname: DataTypes.STRING,
    commentpermission: DataTypes.INTEGER,
    profileurl: DataTypes.STRING,
    lastlogoff: DataTypes.INTEGER,
    personastate: DataTypes.INTEGER,
    realname: DataTypes.STRING,
    primaryclientid: DataTypes.STRING,
    timecreated: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'playersummary',
  });
  return playersummary;
};