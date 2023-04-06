const { DataTypes } = require("sequelize");
const db = require("../database/conexion");
const Stock = db.define("stocks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pro: {
    type: DataTypes.INTEGER,
  },
  id_cat: {
    type: DataTypes.INTEGER,
  },
  id_marc: {
    type: DataTypes.INTEGER,
  },
  tecnico: {
    type: DataTypes.STRING,
  },
  cantidad: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.INTEGER,
  },
});
module.exports = Stock;
