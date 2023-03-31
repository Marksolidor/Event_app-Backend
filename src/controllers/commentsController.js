const comentarioService = require('../services/commentService');

const crearComentario = async (req, res) => {
  try {
    const { id_usuario, id_evento, comentario } = req.body;
    const payload = {
      id_usuario,
      id_evento,
      comentario,
    };

    const comentarioCreado = await comentarioService.crearComentario(
      id_usuario,
      id_evento,
      payload,
    );

    res.status(201).json(comentarioCreado);
  } catch (err) {
    console.log(err);
    res.status(400).json({ mensaje: err.message });
  }
};

const eliminarComentario = async (req, res) => {
  try {
    await comentarioService.eliminarComentario(req.params.id);
    res.json({ mensaje: 'El comentario ha sido eliminado' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = {
  crearComentario,
  eliminarComentario,
};
