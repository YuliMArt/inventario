const { check } = require("express-validator");
const { Router } = require("express");
const {
  emailExiste,
  esRoleValido,
  existeAgentePorId,
} = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");


// ! ruta ** /api/registro
const router = Router();

// router.put("/", getCat);


module.exports = router;
