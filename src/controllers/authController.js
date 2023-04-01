const bcrypt = require('bcrypt');
const db = require('../database/db');

const saltRounds = 10;

exports.createUser = async (nombre, apellido, email, password, rut, nickname) => {
  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      'INSERT INTO usuarios (nombre, apellido, email, password, fecha_creacion, fecha_actualizacion, rol, rut, nickname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [nombre, apellido, email, hashedPassword, new Date(), new Date(), 'usuario', rut, nickname]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error(error);
  }
};

exports.comparePasswords = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
