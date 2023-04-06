const { DataTypes } = require("sequelize");
const db = require("../database/conexion");
const Operacion = db.define("operaciones", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_pro: {
    type: DataTypes.INTEGER,
  },
  tipo: {
    type: DataTypes.STRING,
  },
  cantidad: {
    type: DataTypes.STRING,
  },
  tecnico: {
    type: DataTypes.STRING,
  },
  fecha: {
    type: DataTypes.STRING,
  },
});
module.exports = Operacion;
