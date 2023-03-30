const express = require('express');

const router = express.Router();

const eventoController = require('../controllers/eventsController');

router.get('/', eventoController.obtenerEventos);
router.get('/:id', eventoController.obtenerEvento);
router.post('/', eventoController.crearEvento);
router.patch('/:id', eventoController.actualizarEvento);
router.delete('/:id', eventoController.eliminarEvento);

module.exports = router;