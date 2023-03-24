const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { validarToken } = require("../middlewares/authentication");

// Agregar un usuario a un evento
router.post("/", validarToken, async (req, res) => {
  try {
    const { id_usuario, id_evento } = req.body;
    const nuevoUsuarioEvento = await pool.query(
      "INSERT INTO user_event (id_usuario, id_evento) VALUES ($1, $2) RETURNING *",
      [id_usuario, id_evento]
    );
    res.status(200).json(nuevoUsuarioEvento.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error al agregar usuario a evento" });
  }
});

// Eliminar un usuario de un evento
router.delete("/:id", validarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const eliminarUsuarioEvento = await pool.query(
      "DELETE FROM user_event WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(eliminarUsuarioEvento.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error al eliminar usuario de evento" });
  }
});

module.exports = router;
