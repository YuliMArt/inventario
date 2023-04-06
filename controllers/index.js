const { deleteType } = require("./eliminar");
const { getMovs, getProductos } = require("./movimientos");
const { addIncoming, addSalida } = require("./outInc");
const { addType, getType, getGroupType } = require("./types");
module.exports = {
  deleteType,
  addSalida,
  getProductos,
  getMovs,
  addIncoming,
  getGroupType,
  getType,
  addType,
 
};
