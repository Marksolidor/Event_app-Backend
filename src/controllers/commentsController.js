const {createComment, eliminarComentario} = require('../models/commentsModel');

const crearComentario = async (req, res) => {
  try {
    const { id_usuario, id_evento, comentario } = req.body;

    const comentarioCreado = await createComment(
      id_usuario,
      id_evento,
      comentario,
    );

    res.status(201).json(comentarioCreado);
  } catch (err) {
    console.log(err);
    res.status(400).json({ mensaje: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    await eliminarComentario(req.params.id);
    res.json({ mensaje: 'El comentario ha sido eliminado' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = {
  crearComentario,
  deleteComment
};
