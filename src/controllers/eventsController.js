const { getEventos } = require("../models/eventsModels");
const eventoService = require('../services/eventsService');

// Obtener todos los eventos
const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

// Obtener un evento por su id
const obtenerEvento = async (req, res) => {
  try {
    const evento = await eventoService.getEvento(req.params.id)
    console.log('evento: ', evento);

    if (!evento) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json(evento)
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo evento
const crearEvento = async (req, res) => {
  const evento = new Evento(req.body);
  try {
    const nuevoEvento = await evento.save();
    res.status(201).json(nuevoEvento);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

// Actualizar un evento existente
const actualizarEvento = async (req, res) => {
  try {
    const eventoActualizado = await res.evento.set(req.body).save();
    res.json(eventoActualizado);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

// Eliminar un evento
const eliminarEvento = async (req, res) => {
  try {
    await res.evento.remove();
    res.json({ mensaje: "Evento eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = {
  obtenerEventos,
  obtenerEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};