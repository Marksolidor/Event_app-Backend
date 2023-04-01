const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {isLogin} = require("../middlewares/isLogin")

router.get('/', isLogin.userController.obtenerUsuariosAutentificado);
router.get('/:id', userController.obtenerUsuarioPorId);
router.post('/', userController.crearUsuario);
router.patch('/:id', userController.actualizarUsuario);
router.delete('/:id', userController.eliminarUsuario);

module.exports = router;

