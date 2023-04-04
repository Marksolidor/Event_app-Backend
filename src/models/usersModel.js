const bcrypt = require('bcrypt');
const pool = require('../database/db');

const obtenerUsuarios = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM usuarios');
    return rows;
  } catch (err) {
    throw new Error(`Error al obtener usuarios: ${err.message}`);
  } finally {
    client.release();
  }
};

const agregarUsuario = async (usuario) => {
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

const crearUsuarios = async (usuario) => {
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

const eliminarUsuarios = async (id) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('DELETE FROM usuarios WHERE id = $1', [id]);
    return rows[0];
  } catch (err) {
    throw new Error(`Error al eliminar el usuario: ${err.message}`);
  } finally {
    client.release();
  }
};

const actualizarUsuarios = async ( usuario) => {
  const { nombre, apellido, email, password, rol, rut, nickname, id } = usuario;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const res = await pool.query(
      'UPDATE usuarios SET nombre = $1, apellido = $2, email = $3, password = $4, rol = $5, rut = $6, nickname = $7 WHERE id = $8 RETURNING *',
      [nombre, apellido, email, hashedPassword, rol, rut, nickname, id],
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(`Error al actualizar el usuario: ${err.message}`);
  }
};

const obtenerUsuarioPorIds = async (id) => {
  try {
    const res = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    console.log("prueba", res.rows[0])
    return res.rows[0];
  } catch (err) {
    throw new Error(`Error al obtener el usuario: ${err.message}`);
  }
};


module.exports = {crearUsuarios, obtenerUsuarios, agregarUsuario, eliminarUsuarios, actualizarUsuarios, obtenerUsuarioPorIds};

