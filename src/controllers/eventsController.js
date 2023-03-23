const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const crearUsuario = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const usuario = new Usuario({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: hashedPassword,
      rol: req.body.rol,
      rut: req.body.rut,
      nickname: req.body.nickname,
    });
    await usuario.save();
    res.status(201).json(usuario);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (!usuario) {
      return res.status(401).json({ mensaje: "Email o contraseña inválidos" });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      usuario.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({ mensaje: "Email o contraseña inválidos" });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    res.json(res.usuario);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const usuario = res.usuario;
    usuario.nombre = req.body.nombre;
    usuario.apellido = req.body.apellido;
    usuario.email = req.body.email;
    usuario.password = hashedPassword;
    usuario.rol = req.body.rol;
    usuario.rut = req.body.rut;
    usuario.nickname = req.body.nickname;
    await usuario.save();
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    await res.usuario.remove();
    res.json({ mensaje: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};