const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Plans = sequelize.define("Plans", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monthlyPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  yearlyPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  videoQuality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resolution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  devices: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  screens: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Plans;
