const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middleware/auth");

// Registrar un usuario
router.post("/", async (req, res) => {
  try {
    await usuarioController.registrarUsuario(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al registrar el usuario");
  }
});

// Iniciar sesión de un usuario
router.post("/login", async (req, res) => {
  try {
    await usuarioController.iniciarSesion(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al iniciar sesión");
  }
});

// Obtener información del usuario autenticado
router.get("/", auth, async (req, res) => {
  try {
    await usuarioController.obtenerUsuarioAutenticado(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener información del usuario");
  }
});

// Actualizar información de un usuario
router.put("/:id", auth, async (req, res) => {
  try {
    await usuarioController.actualizarUsuario(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al actualizar el usuario");
  }
});

// Eliminar un usuario
router.delete("/:id", auth, async (req, res) => {
  try {
    await usuarioController.eliminarUsuario(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al eliminar el usuario");
  }
});

module.exports = router;
