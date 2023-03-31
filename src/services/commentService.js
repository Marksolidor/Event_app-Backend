const Evento = require('../models/eventsModels');
const User = require('../models/usersModel');
const Comment = require('../models/commentsModel');

const crearComentario = async (userId, eventoId, payload) => {
  const user = await User.getUsuarioById(userId);
  if (!user) {
    throw new Error('user not found');
  }

  const evento = await Evento.getEventoById(eventoId);
  if (!evento) {
    throw new Error('event not found');
  }

  const comentarioCreado = await Comment.crearComentario(
    Number(userId),
    Number(eventoId),
    payload.comentario,
  );

  return comentarioCreado;
};

const eliminarComentario = async (comentarioId) => {
  const comentarioEliminado = await Comment.eliminarComentario(comentarioId);
  return comentarioEliminado;
};

module.exports = {
  crearComentario,
  eliminarComentario,
};
