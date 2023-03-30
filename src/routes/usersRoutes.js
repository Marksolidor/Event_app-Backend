const express = require('express');
const router = express.Router();
// const Usuario = require('./../models/usersModel');

// const usuarioController = require("../controllers/userController");
const auth = require("../middlewares/authentication");

// // Registrar un usuario
// router.post("/", async (req, res) => {
//   try {
//     await usuarioController.crearUsuario(req, res);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Hubo un error al registrar el usuario");
//   }
// });

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
// router.get("/", auth, async (req, res) => {
//   try {
//     await usuarioController.obtenerUsuariosAutentificado(req, res);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Hubo un error al obtener información del usuario");
//   }
// });

// Obtener información de un usuario por su ID
router.get("/:id", auth, async (req, res) => {
  try {
    // await usuarioController.obtenerUsuarioPorId(req, res);
    // evento = await Evento.findById(req.params.id);
    usuario = await Usuario.findById(req.params.id);
    if (usuario == null) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
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