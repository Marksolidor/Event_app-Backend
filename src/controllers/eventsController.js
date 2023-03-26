const { getEventos } = require("../models/eventsModels");
const Evento = require("../models/eventsModels");

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
const obtenerEvento = async (req, res, next) => {
  const evento = await getEventos(req.params.id);
  if (evento == null) {
    return res.status(404).json({ mensaje: "Evento no encontrado" });
  }
  res.evento = evento;
  next();
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
