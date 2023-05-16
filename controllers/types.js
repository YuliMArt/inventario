const { request, response } = require("express");
const Tipos = require("../models/Tipos");
const db = require("../database/conexion");
const { QueryTypes } = require("sequelize");

const addType = async (req = request, res = response) => {
  const { type } = req.params;
  const { id, nombre } = req.body;

  let msg = "Exitoso!!";
  if (id) {
    await Tipos.update({ nombre, type }, { where: { id } });
    if (type == "categorias") {
      msg = "Categoria actualizada con exito!!";
    }
    if (type == "marcas") {
      msg = "Marca actualizada con exito!!";
    }
    if (type == "productos") {
      msg = "Producto actualizado con exito!!";
    }
  } else {
    let modelo = new Tipos({ nombre, type });
    await modelo.save();
    if (type == "marcas") {
      msg = "Marca agregada con exito!!";
    }
    if (type == "categorias") {
      msg = "Categoria agregada con exito!!";
    }
    if (type == "productos") {
      msg = "Producto o con exito!!";
    }
  }

  res.json({ ok: true, msg });
};
const getType = async (req = request, res = response) => {
  const { type } = req.params;
  const { limit = 15, offset = 0, find, order = "ASC", orBy = "id" } = req.body;
  let paginate = `LIMIT ${limit} OFFSET ${offset}`;
  if (limit == "Todos") paginate = "";
  let query = "";
  let filtro = false;
  let items = [];
  let totalfilt = 0;
  let total = 0;
  if (type == "categorias") query = "ty.id=pr.id_cat";
  if (type == "marcas") query = "ty.id=pr.id_marc ";
  if (type == "productos") query = "ty.id=pr.id_pro ";
  query += ` WHERE ty.type='${type}' `;
  if (find) {
    filtro = true;
    query += `AND ty.nombre LIKE '%${find}%'`;
  }
  items = await db.query(
    `SELECT ty.*,  COUNT(pr.id) as existencia  FROM tipos ty LEFT JOIN stocks pr ON  ${query} GROUP BY nombre ORDER BY ${orBy} ${order} ${paginate} `,
    { type: QueryTypes.SELECT }
  );
  total = await Tipos.count({ where: { type } });

  if (filtro) totalfilt = items.length;

  res.json({
    ok: true,
    data: { items, total, totalfilt },
  });
};

const getGroupType = async (req = request, res = response) => {
  const mark = await Tipos.findAll({
    attributes: [
      ["id", "value"],
      ["nombre", "label"],
    ],

    where: { type: "marcas" },
    order: [["nombre", "ASC"]],
  });
  const pro = await Tipos.findAll({
    attributes: [
      ["id", "value"],
      ["nombre", "label"],
    ],

    where: { type: "productos" },
    order: [["nombre", "ASC"]],
  });
  const cat = await Tipos.findAll({
    attributes: [
      ["id", "value"],
      ["nombre", "label"],
    ],

    where: { type: "categorias" },
    order: [["nombre", "ASC"]],
  });
  res.json({
    ok: true,
    data: { mark, pro, cat },
  });
};
module.exports = {
  addType,
  getGroupType,
  getType,
};
