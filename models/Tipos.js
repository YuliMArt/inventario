const { DataTypes } = require("sequelize");
const db = require("../database/conexion");
const Tipos = db.define("tipos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
});
module.exports = Tipos;
