const { userEvent, removeUserEvent } = require("../models/userEventModel");

const crearUserEvent = async (req, res) => {
  try {
  const payload = req.body;
  const newUserEvent = await userEvent(payload);
    res.status(201).json(newUserEvent);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const eliminarUserEvent = async (req, res) => {
  try {
    await removeUserEvent(req.params.id);
    res.json({ mensaje: "La relación usuario-evento ha sido eliminada" });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = {
  crearUserEvent,
  eliminarUserEvent,
};
