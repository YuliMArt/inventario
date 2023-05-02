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
const updStock = async (req = request, res = response) => {
  const { id, id_cat, id_marc, id_pro, status } = req.body;
  let resul = { ok: true, msg: "Actialización exitosa" };

  const exist = await Stock.findOne({
    where: {
      [Op.and]: [{ id_cat }, { id_marc }, { id_pro }, { status }],
      id: { [Op.ne]: id },
    },
  });

  if (exist) {
    resul = { ok: false, msg: "Ya existe un registro con el tipo de datos" };
  } else {
    await Stock.update({ ...req.body }, { where: { id } });
  }

  res.json({ ...resul });
};
module.exports = {
  addIncoming,
  addSalida,
  updStock,
};
