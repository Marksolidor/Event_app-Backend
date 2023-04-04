const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with this email exists
    const user = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    console.log("user", user.rows[0])
    if (user.rows.length === 0) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }

    // Create JWT token
    const token = jwt.sign(user.rows[0].id, process.env.JWT_SECRET);

    res.status(200).json({ token, user: user.rows[0] });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ msg: "Cerrar sesión" });
};
