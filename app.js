const express = require('express');
const cors = require('cors');
const morganBody = require('morgan-body');

// Importar rutas
const usersRoutes = require('./src/routes/usersRoutes');
const eventRoutes = require('./src/routes/eventsRoutes');
const commentsRoutes = require('./src/routes/commentsRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Agregar rutas a la instancia de app
app.use('/users', usersRoutes);
app.use('/events', eventRoutes);
app.use('/comments', commentsRoutes);

module.exports = app;
