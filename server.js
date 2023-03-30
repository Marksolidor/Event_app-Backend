const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const CsbInspector = require('csb-inspector');
const morganBody = require('morgan-body');

// Importar rutas
const userRoutes = require('./src/routes/usersRoutes');
const eventRoutes = require('./src/routes/eventsRoutes');

const pool = require('./src/database/db');
const startDatabase = require('./src/database/startDatabase');

CsbInspector();

app.use(express.json());
app.use(cors());

// Agregar rutas a la instancia de app
app.use('/users', userRoutes);
app.use('/events', eventRoutes);


startDatabase();

app.listen(process.env.PORT, () => {
  console.log('El servidor está en ejecución en el puerto 3000');
});

module.exports = app;
