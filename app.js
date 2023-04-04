const express = require('express');
const cors = require('cors');
const morganBody = require('morgan-body');

// Importar rutas
const usersRoutes = require('./src/routes/usersRoutes');
const eventRoutes = require('./src/routes/eventsRoutes');
const commentsRoutes = require('./src/routes/commentsRoutes');
const authRoutes = require('./src/routes/authRoutes');
const userEventsRoutes = require('./src/routes/userEventsRoutes');

const app = express();
morganBody(app);
app.use(express.json());
app.use(cors());

// Agregar rutas a la instancia de app
app.use('/users', usersRoutes);
app.use('/events', eventRoutes);
app.use('/comments', commentsRoutes);
app.use('/user_events', userEventsRoutes);
app.use('/auth', authRoutes);

module.exports = app;
