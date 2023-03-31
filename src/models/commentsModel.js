const pool = require('../database/db');

const commentModel = {};

commentModel.crearComentario = async (id_usuario, id_evento, comentario) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'INSERT INTO comentarios (id_usuario, id_evento, comentario) VALUES ($1, $2, $3) RETURNING *',
      [id_usuario, id_evento, comentario],
    );
    return rows[0];
  } finally {
    client.release();
  }
};

commentModel.eliminarComentario = async (id) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'DELETE FROM comentarios WHERE id = $1 RETURNING *',
      [id],
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } finally {
    client.release();
  }
};

module.exports = commentModel;
