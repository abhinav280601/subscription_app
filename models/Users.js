// models/User.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    planId: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: false }
);

module.exports = Users;
