const Evento = require("../models/eventsModels");

const getEvento = async (eventId) => {
    const evento = await Evento.getEventoById(eventId);

    if (!evento) {
      return null;
    }

    return evento;
}

module.exports = {
    getEvento,
};