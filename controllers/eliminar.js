const { request, response } = require("express");
const Tipos = require("../models/Tipos");

const deleteType = async (req = request, res = response) => {
  const { id } = req.params;
  await Tipos.destroy({ where: { id } });
  res.json({ ok: true, msg: "Operación exisosa!" });
};
module.exports = {
  deleteType,
};
