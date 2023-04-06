const { request, response } = require("express");
const { QueryTypes } = require("sequelize");
const db = require("../database/conexion");
const Operacion = require("../models/operaciones");
const Stock = require("../models/stock");

const getMovs = async (req = request, res = response) => {
  const { limit = 15, offset = 0, find, order = "ASC", orBy = "id" } = req.body;
  let query = "";
  let filtro = false;
  if (find) {
    filtro = true;
    query = `WHERE op.tipo LIKE '%${find}%' OR op.tecnico LIKE '%${find}%' OR op.fecha LIKE '%${find}%' OR st.status LIKE '%${find}%' OR mr.nombre LIKE '%${find}%' OR ct.nombre LIKE '%${find}%' OR pr.nombre LIKE '%${find}%'`;
  }
  const movs = await db.query(
    `SELECT op.*,st.status,pr.nombre as producto,mr.nombre as marca ,ct.nombre as categoria FROM operaciones op JOIN stocks st ON op.id_pro=st.id JOIN tipos pr ON st.id_pro=pr.id  JOIN tipos mr ON st.id_marc=mr.id JOIN tipos ct ON st.id_cat=ct.id ${query}  ORDER BY ${orBy} ${order}  LIMIT ${limit} OFFSET ${offset} `,
    { type: QueryTypes.SELECT }
  );
  let total = await Operacion.count();
  let totalfilt = 0;
  if (filtro) totalfilt = movs.length;
  res.json({
    ok: true,
    data: { movs, total, totalfilt },
  });
};
const getProductos = async (req = request, res = response) => {
  const { limit = 15, offset = 0, find, order = "ASC", orBy = "id" } = req.body;
  let query = "";
  let filtro = false;
  if (find) {
    filtro = true;
    query = `WHERE st.tecnico LIKE '%${find}%'  OR st.status LIKE '%${find}%' OR mr.nombre LIKE '%${find}%' OR ct.nombre LIKE '%${find}%' OR pr.nombre LIKE '%${find}%'`;
  }
  const producto = await db.query(
    `SELECT st.*,pr.nombre as producto,mr.nombre as marca,ct.nombre as categoria FROM stocks st JOIN tipos pr ON st.id_pro=pr.id JOIN tipos mr ON st.id_marc=mr.id JOIN tipos ct ON st.id_cat=ct.id ${query}  ORDER BY ${orBy} ${order}  LIMIT ${limit} OFFSET ${offset} `,
    { type: QueryTypes.SELECT }
  );
  let total = await Stock.count();
  let totalfilt = 0;
  if (filtro) totalfilt = producto.length;
  res.json({ ok: true, data: { producto, total, totalfilt } });
};

module.exports = { getMovs, getProductos };
