const express = require('express');

const router = express.Router();

const { validarToken } = require('../middlewares/authentication');
const commentController = require('../controllers/commentsController');

router.post('/' /* , validarToken */, commentController.crearComentario);
router.delete(
  '/:id' /* , validarToken */,
  commentController.eliminarComentario,
);

module.exports = router;
