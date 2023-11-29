const Sequilize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("users", {
  id: {
    type: Sequilize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequilize.STRING,
  },
  password: {
    type: Sequilize.BIGINT,
    allowNull: false,
  },
  email: {
    type: Sequilize.TEXT,
    allowNull: false,
  },
});

module.exports = User;
