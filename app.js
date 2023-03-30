const express = require('express');
 const cors = require('cors');
 const morganBody = require('morgan-body');
 
 // Importar rutas
 const userRoutes = require('./src/routes/usersRoutes');
 const eventRoutes = require('./src/routes/eventsRoutes');
 const usuariosRoutes = require('./src/routes/usuariosRoutes');
 
 const app = express();
 
 app.use(express.json());
 app.use(cors());
 
 // Agregar rutas a la instancia de app
 app.use('/users', userRoutes);
 app.use('/events', eventRoutes);
 app.use('/usuarios', usuariosRoutes);
 
 module.exports = app;