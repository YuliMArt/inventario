const { request, response } = require("express");
const Tipos = require("../models/Tipos");
const Stock = require("../models/stock");

const deleteType = async (req = request, res = response) => {
  const { type, id } = req.params;
  if (type == "stock") {
    await Stock.destroy({ where: { id } });
  } else {
    await Tipos.destroy({ where: { id } });
  }
  res.json({ ok: true, msg: "Operación exisosa!" });
};
module.exports = {
  deleteType,
};
