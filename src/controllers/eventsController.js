const eventoService = require('../services/eventsService');

// Obtener todos los eventos
const obtenerEventos = async (req, res) => {
  try {
    const eventos = await eventoService.getEventos();
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
  try {
    const payload = {
      nombre_evento: req.body.nombre_evento,
      fecha: req.body.fecha,
      hora: req.body.hora,
      tipo_evento: req.body.tipo_evento,
      descripcion: req.body.descripcion,
      imagen_evento: req.body.imagen_evento,
      direccion: req.body.direccion,
      comuna: req.body.comuna,
      referencia: req.body.referencia,
      comentario: req.body.comentario,
      precio: req.body.precio,
      usuario_id: req.body.usuario_id,
    };
    const nuevoEvento = await eventoService.crearEvento(payload);
    res.status(201).json(nuevoEvento);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

// Actualizar un evento existente
const actualizarEvento = async (req, res) => {
  try {
    const eventoActualizado = await eventoService.actualizarEvento(req.params.id, req.body);
    res.json(eventoActualizado);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

// Eliminar un evento
const eliminarEvento = async (req, res) => {
  try {
    const eventoEliminado = await eventoService.eliminarEvento(req.params.id);
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