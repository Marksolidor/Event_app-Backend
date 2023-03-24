const jwt = require("jsonwebtoken");
const Usuario = require("../models/usersModel");

const authentication =
  (admin = false) =>
  async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const usuario = await Usuario.findById(decoded.id);

      if (!usuario) {
        return res.status(401).json({ mensaje: "Por favor inicia sesión" });
      }

      if (admin && usuario.rol !== "admin") {
        return res
          .status(403)
          .json({ mensaje: "No tienes los permisos necesarios" });
      }

      req.usuario = usuario;
      next();
    } catch (err) {
      return res.status(401).json({ mensaje: "Por favor inicia sesión" });
    }
  };

module.exports = authentication;
