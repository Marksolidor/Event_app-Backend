const pool = require('../database/db');
const { get } = require('../routes/usuariosRoutes');


// Obtener todos los eventos
const obtenerUsuarios = async () => {
  const usuario = await pool.connect();
  try {
    const { rows } = await usuario.query('SELECT * FROM eventos');
    console.log(rows)
    console.log("usuarioModel")
    return rows;
  } finally {
    usuario.release();
  }
};



// // Obtener todos los usuarios
// const getUsuarios = async () => {
//   const { rows } = await pool.query("SELECT * FROM usuarios");
//   console.log("obtener usuario")
//   return rows;
// };

// // Obtener un usuario por su id
// const getUsuarioById = async (id) => {
//   const { rows } = await pool.query("SELECT * FROM usuarios WHERE id = $1", [
//     id,
//   ]);
//   return rows[0];
// };

// // Agregar un usuario
// const agregarUsuario = async (usuario) => {
//   const { nombre, apellido, email, password, rol, rut, nickname } = usuario;
//   const { rows } = await pool.query(
//     "INSERT INTO usuarios (nombre, apellido, email, password, rol, rut, nickname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
//     [nombre, apellido, email, password, rol, rut, nickname]
//   );
//   return rows[0];
// };

// // Actualizar un usuario por su id
// const bcrypt = require("bcrypt");

// const createUser = async (usuario) => {
//   const { nombre, apellido, email, password, rol, rut, nickname } = usuario;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     const res = await pool.query(
//       "INSERT INTO usuarios (nombre, apellido, email, password, rol, rut, nickname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
//       [nombre, apellido, email, hashedPassword, rol, rut, nickname]
//     );
//     return res.rows[0];
//   } catch (err) {
//     throw new Error(`Error al crear el usuario: ${err.message}`);
//   }
// };

// const findUserByEmail = async (email) => {
//   try {
//     const res = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
//       email,
//     ]);
//     return res.rows[0];
//   } catch (err) {
//     throw new Error(`Error al buscar el usuario: ${err.message}`);
//   }
// };

module.exports = {

  // createUser,
  // findUserByEmail,
  // getUsuarioById,
  // getUsuarios,
  // agregarUsuario,
  obtenerUsuarios,
};
