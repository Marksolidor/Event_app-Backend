const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {agregarUsuario, eliminarUsuarios, actualizarUsuarios, obtenerUsuarioPorIds} = require("../models/usersModel");


const crearUsuario = async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const usuario = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol,
      rut: req.body.rut,
      nickname: req.body.nickname,
    };
    const newUsuario = agregarUsuario(usuario)
    res.status(201).json(newUsuario);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Email o contraseña inválidos' });
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      usuario.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ mensaje: 'Email o contraseña inválidos' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const obtenerUsuariosAutentificado = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await obtenerUsuarioPorIds(req.params.id);
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const usuario = {
    id : req.params.id,  
    nombre : req.body.nombre,
    apellido : req.body.apellido,
    email : req.body.email,
    password : hashedPassword,
    rol : req.body.rol,
    rut : req.body.rut,
    nickname : req.body.nickname
    };
    const updateUsuario = await actualizarUsuarios(usuario)
    res.json(updateUsuario);
  } catch (err) {
    res.status(400).json({ mensaje: err.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    await eliminarUsuarios(req.params.id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};


module.exports = {
  crearUsuario,
  iniciarSesion,
  obtenerUsuariosAutentificado,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
