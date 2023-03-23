const UserEvent = require("../models/user_event");

const crearUserEvent = async (req, res) => {
  const { id_usuario, id_evento } = req.body;
  const newUserEvent = new UserEvent({
    id_usuario,
    id_evento,
  });

  try {
    const userEventCreada = await newUserEvent.save();
    res.status(201).json(userEventCreada);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const eliminarUserEvent = async (req, res) => {
  try {
    await res.userEvent.remove();
    res.json({ mensaje: "La relación usuario-evento ha sido eliminada" });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = {
  crearUserEvent,
  eliminarUserEvent,
};
