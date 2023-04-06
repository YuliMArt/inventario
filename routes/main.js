const { check } = require("express-validator");
const { Router } = require("express");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  addType,
  getType,
  getGroupType,
  addIncoming,
  getMovs,
  getProductos,
  addSalida,
  deleteType,
} = require("../controllers");

// ! ruta ** /api/main
const router = Router();

router.get("/types", getGroupType);
router.put("/history", getMovs);
router.put("/productos", getProductos);
router.put(
  "/types/:type",
  [
    check("type").custom((o) =>
      coleccionesPermitidas(o, ["marcas", "productos", "categorias"])
    ),
    validarCampos,
  ],
  getType
);
router.post(
  "/:type",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("type").custom((o) =>
      coleccionesPermitidas(o, ["marcas", "productos", "categorias"])
    ),
    validarCampos,
  ],
  addType
);

router.put(
  "/opp/entrada",
  [
    check("id_pro", "El producto es obligatorio").not().isEmpty(),
    check("id_cat", "Debe ingresar una cantidad").not().isEmpty(),
    check("id_marc", "Debe ingresar una marca").not().isEmpty(),
    check("cantidad", "Debe ingresar una cantidad").not().isEmpty(),

    validarCampos,
  ],
  addIncoming
);
router.put(
  "/opp/salida",
  [
    check("id_pro", "El producto es obligatorio").not().isEmpty(),
    check("id_cat", "Debe ingresar una cantidad").not().isEmpty(),
    check("id_marc", "Debe ingresar una marca").not().isEmpty(),
    check("cantidad", "Debe ingresar una cantidad").not().isEmpty(),
    validarCampos,
  ],
  addSalida
);

router.delete(
  "/:type/:id",
  [
    check("type").custom((o) =>
      coleccionesPermitidas(o, ["marcas", "productos", "categorias"])
    ),

    validarCampos,
  ],
  deleteType
);

module.exports = router;
