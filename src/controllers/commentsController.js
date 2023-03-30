const Comentario = require("../models/commentsModel");

const crearComentario = async (req, res) => {
  const { id_usuario, id_evento, comentario } = req.body;
  const newComentario = new Comentario({
    id_usuario,
    id_evento,
    comentario,
  });

  try {
    const comentarioCreado = await newComentario.save();
    res.status(201).json(comentarioCreado);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const eliminarComentario = async (req, res) => {
  try {
    await res.comentario.remove();
    res.json({ mensaje: "El comentario ha sido eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = {
  crearComentario,
  eliminarComentario,
};