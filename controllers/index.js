const { deleteType } = require("./eliminar");
const { getMovs, getProductos } = require("./movimientos");
const { addIncoming, addSalida, updStock } = require("./outInc");
const { addType, getType, getGroupType } = require("./types");
module.exports = {
  updStock,
  deleteType,
  addSalida,
  getProductos,
  getMovs,
  addIncoming,
  getGroupType,
  getType,
  addType,
 
};
