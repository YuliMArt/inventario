const jwt = require("jsonwebtoken");

//?VERIFICA EL TOKEN GENRADO
const comprobarJWT = (token = "") => {
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    return [true, uid];
  } catch (error) {
    return [false, null];
  }
};
module.exports = {
  comprobarJWT,
};
