const express = require('express');
const app = require('./app');
const startDatabase = require('./src/database/startDatabase');

require('dotenv').config();

startDatabase();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El servidor está en ejecución en el puerto ${PORT}`);
});