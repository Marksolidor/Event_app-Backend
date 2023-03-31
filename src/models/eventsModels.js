const pool = require('../database/db');

const eventModel = {};

// Obtener todos los eventos
eventModel.getEventos = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM eventos');
    return rows;
  } finally {
    client.release();
  }
};

// Obtener un evento por su id
eventModel.getEventoById = async (id) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM eventos WHERE id=$1', [
      id,
    ]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } finally {
    client.release();
  }
};

// Crear un nuevo evento
eventModel.createEvento = async (evento) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'INSERT INTO eventos (nombre_evento, fecha, hora, tipo_evento, descripcion, imagen_evento, direccion, comuna, referencia, comentario, precio, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
      [
        evento.nombre_evento,
        evento.fecha,
        evento.hora,
        evento.tipo_evento,
        evento.descripcion,
        evento.imagen_evento,
        evento.direccion,
        evento.comuna,
        evento.referencia,
        evento.comentario,
        evento.precio,
        evento.usuario_id,
      ],
    );
    return rows[0];
  } finally {
    client.release();
  }
};

// Actualizar un evento existente
eventModel.updateEvento = async (id, evento) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      `
         UPDATE public.eventos
         SET
           nombre_evento=$1
           , fecha=$2
           , hora=$3
           , tipo_evento=$4
           , descripcion=$5
           , imagen_evento=$6
           , direccion=$7
           , comuna=$8
           , referencia=$9
           , comentario=$10
           , precio=$11
           , likes=$12
           , usuario_id=$13
           , fecha_actualizacion=now()
         WHERE id = $14
         RETURNING *;
       `,
      [
        evento.nombre_evento,
        evento.fecha,
        evento.hora,
        evento.tipo_evento,
        evento.descripcion,
        evento.imagen_evento,
        evento.direccion,
        evento.comuna,
        evento.referencia,
        evento.comentario,
        evento.precio,
        evento.likes,
        evento.usuario_id,
        id,
      ],
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } finally {
    client.release();
  }
};

// Eliminar un evento
eventModel.deleteEvento = async (id) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(
      'DELETE FROM eventos WHERE id=$1 RETURNING *',
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

module.exports = eventModel;
