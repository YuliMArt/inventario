const { request, response } = require("express");
const Operacion = require("../models/operaciones");
const Stock = require("../models/stock");
const { Op } = require("sequelize");

const addIncoming = async (req = request, res = response) => {
  const datos = req.body;
  const { id_pro, id_cat, id_marc, status, fecha, tecnico, cantidad } = datos;
  const [data, created] = await Stock.findOrCreate({
    where: { [Op.and]: [{ id_cat }, { id_pro }, { id_marc }, { status }] },
    defaults: { ...datos },
  });
  console.log(data, created);
  if (!created) {
    const can = parseInt(cantidad);
    const suma = parseInt(data.cantidad + can);
    Stock.update({ cantidad: suma }, { where: { id: data.id } });
    console.log("actulizar cantidad");
  }

  const nHis = new Operacion({
    id_pro: data.id,
    cantidad,
    tecnico,
    fecha,
    tipo: "ENTRADA",
  });
  await nHis.save();
  res.json({ ok: true, msg: "Operación exitosa" });
};
const addSalida = async (req = request, res = response) => {
  const datos = req.body;
  const { id_pro, id_cat, id_marc, status, fecha, tecnico, cantidad } = datos;
  const exis = await Stock.findOne({
    where: { [Op.and]: [{ id_cat }, { id_pro }, { id_marc }, { status }] },
  });
  console.log(exis);

  let resu = {
    ok: true,
    msg: "Error no existe el producto registrado con las caracteristicas especificadas",
  };
  if (exis) {
    if (cantidad <= exis.cantidad) {
      const can = parseInt(cantidad);
      const resta = parseInt(exis.cantidad - can);
      await Stock.update({ cantidad: resta }, { where: { id: exis.id } });
      const nHis = new Operacion({
        id_pro: exis.id,
        cantidad,
        tecnico,
        fecha,
        tipo: "SALIDA",
      });
      await nHis.save();
      resu = { ok: true, msg: "Operación exitosa" };
    } else {
      resu = {
        ok: false,
        msg: "La cantidad sobrepasa el limite de exitencias",
      };
    }
  }
  res.json({ ...resu });
};
module.exports = {
  addIncoming,
  addSalida,
};
