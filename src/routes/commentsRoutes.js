const express = require("express");
const router = express.Router();
const pool = require("../database");
const { validarToken } = require("../middlewares/authentication");

// Agregar un comentario a un evento
router.post("/", validarToken, async (req, res) => {
  try {
    const { id_usuario, id_evento, comentario } = req.body;
    const nuevoComentario = await pool.query(
      "INSERT INTO comentarios (id_usuario, id_evento, comentario) VALUES ($1, $2, $3) RETURNING *",
      [id_usuario, id_evento, comentario]
    );
    res.status(200).json(nuevoComentario.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error al agregar comentario a evento" });
  }
});

// Eliminar un comentario de un evento
router.delete("/:id", validarToken, async (req, res) => {
  try {
    const { id } = req.params;
    const eliminarComentario = await pool.query(
      "DELETE FROM comentarios WHERE id = $1 RETURNING *",
      [id]
    );
    res.status(200).json(eliminarComentario.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Error al eliminar comentario de evento" });
  }
});

module.exports = router;
