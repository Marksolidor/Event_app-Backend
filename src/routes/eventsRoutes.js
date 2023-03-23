const express = require("express");
const router = express.Router();
const Evento = require("../models/evento");

// Obtener todos los eventos
router.get("/", async (req, res) => {
  try {
    const eventos = await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener un evento en particular
router.get("/:id", getEvento, (req, res) => {
  res.json(res.evento);
});

// Crear un evento
router.post("/", async (req, res) => {
  const evento = new Evento({
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
  });

  try {
    const nuevoEvento = await evento.save();
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Actualizar un evento
router.patch("/:id", getEvento, async (req, res) => {
  if (req.body.nombre_evento != null) {
    res.evento.nombre_evento = req.body.nombre_evento;
  }
  if (req.body.fecha != null) {
    res.evento.fecha = req.body.fecha;
  }
  if (req.body.hora != null) {
    res.evento.hora = req.body.hora;
  }
  if (req.body.tipo_evento != null) {
    res.evento.tipo_evento = req.body.tipo_evento;
  }
  if (req.body.descripcion != null) {
    res.evento.descripcion = req.body.descripcion;
  }
  if (req.body.imagen_evento != null) {
    res.evento.imagen_evento = req.body.imagen_evento;
  }
  if (req.body.direccion != null) {
    res.evento.direccion = req.body.direccion;
  }
  if (req.body.comuna != null) {
    res.evento.comuna = req.body.comuna;
  }
  if (req.body.referencia != null) {
    res.evento.referencia = req.body.referencia;
  }
  if (req.body.comentario != null) {
    res.evento.comentario = req.body.comentario;
  }
  if (req.body.precio != null) {
    res.evento.precio = req.body.precio;
  }
  if (req.body.usuario_id != null) {
    res.evento.usuario_id = req.body.usuario_id;
  }
  try {
    const eventoActualizado = await res.evento.save();
    res.json(eventoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar un evento
router.delete("/:id", getEvento, async (req, res) => {
  try {
    await res.evento.remove();
    res.json({ message: "Evento eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
