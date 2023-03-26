const pool = require('../database/db');

const eventModel = {};

// Obtener todos los eventos
eventModel.getEventos = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM events');
    return rows;
  } finally {
    client.release();
  }
};

// Obtener un evento por su id
eventModel.getEventoById = async (id) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM events WHERE id=$1', [
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
      'INSERT INTO events (titulo, descripcion, fecha) VALUES ($1, $2, $3) RETURNING *',
      [evento.titulo, evento.descripcion, evento.fecha],
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
      'UPDATE events SET titulo=$1, descripcion=$2, fecha=$3 WHERE id=$4 RETURNING *',
      [evento.titulo, evento.descripcion, evento.fecha, id],
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
      'DELETE FROM events WHERE id=$1 RETURNING *',
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
