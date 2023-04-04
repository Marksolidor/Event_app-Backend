const express = require('express');
const {authentication} = require('../middlewares/authentication');

const router = express.Router();

const eventoController = require('../controllers/eventsController');

router.get('/', eventoController.obtenerEventos);
router.get('/:id', eventoController.obtenerEvento);
router.post('/', authentication, eventoController.crearEvento);
router.put('/:id', eventoController.actualizarEvento);
router.delete('/:id', eventoController.eliminarEvento);

module.exports = router;