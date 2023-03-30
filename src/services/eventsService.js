const Evento = require('../models/eventsModels');

const getEventos = async () => {
  const eventos = await Evento.getEventos();
  return eventos;
};

const getEvento = async eventId => {
  const evento = await Evento.getEventoById(eventId);

  if (!evento) {
    return null;
  }

  return evento;
};

const crearEvento = async eventoBody => {
  const nuevoEvento = await Evento.createEvento(eventoBody);
  return nuevoEvento;
};

const actualizarEvento = async (eventoId, eventoBody) => {
  const eventoActualizado = await Evento.updateEvento(eventoId, eventoBody);
  return eventoActualizado;
};

const eliminarEvento = async eventoId => {
  const eventoEliminado = await Evento.deleteEvento(eventoId);
  return eventoEliminado;
};

module.exports = {
  getEvento,
};