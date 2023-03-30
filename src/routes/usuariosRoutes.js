const express = require('express');
const router = express.Router();
const Usuario = require('./../models/usersModel');


router.get('/', async (req, res) => {
    try {
        const usuario = await Usuario.obtenerUsuarios;
        res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get("/", auth, async (req, res) => {
//   try {
//     await usuarioController.obtenerUsuariosAutentificado(req, res);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Hubo un error al obtener información del usuario");
//   }
// });

router.get('/:id', async (req, res) => {
    try {
      res.json({message:"obtener usuarios por id"})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
    try {
      res.json({message:"Crear nuevo usuario"})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
    try {
      res.json({message:"Actualizar usuario por id"})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      res.json({message:"Eliminar usuario por id"})

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;