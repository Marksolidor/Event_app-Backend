const bcrypt = require('bcrypt');
const pool = require('../database/db');

const userModel = {};

userModel.obtenerUsuarios = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM usuarios');
    return rows;
  } finally {
    client.release();
  }
};

userModel.getUsuarioById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [
    id,
  ]);
  return rows[0];
};

userModel.agregarUsuario = async (usuario) => {
  const { nombre, apellido, email, password, rol, rut, nickname } = usuario;
  const { rows } = await pool.query(
    'INSERT INTO usuarios (nombre, apellido, email, password, rol, rut, nickname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [nombre, apellido, email, password, rol, rut, nickname],
  );
  return rows[0];
};

userModel.createUser = async (usuario) => {
  const { nombre, apellido, email, password, rol, rut, nickname } = usuario;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const res = await pool.query(
      'INSERT INTO usuarios (nombre, apellido, email, password, rol, rut, nickname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre, apellido, email, hashedPassword, rol, rut, nickname],
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(`Error al crear el usuario: ${err.message}`);
  }
};

userModel.findUserByEmail = async (email) => {
  try {
    const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [
      email,
    ]);
    return res.rows[0];
  } catch (err) {
    throw new Error(`Error al buscar el usuario: ${err.message}`);
  }
};

module.exports = userModel;
