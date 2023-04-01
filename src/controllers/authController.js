const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");

exports.register = async (req, res) => {
  const { nombre, apellido, email, password, rol, rut, nickname } = req.body;
  
  try {
    // Check if user with the same email already exists
    const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (user.rows.length > 0) {
      return res.status(400).json({ msg: "El usuario con este correo electrónico ya existe" });
    }

    // Encrypt password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    const newUser = await pool.query(
      "INSERT INTO usuarios (nombre, apellido, email, password, rol, rut, nickname) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, nombre, apellido, email, rol",
      [nombre, apellido, email, hashedPassword, rol, rut, nickname]
    );

    // Create JWT token
    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with this email exists
    const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (user.rows.length === 0) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token, user: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ msg: "Cerrar sesión" });
};
