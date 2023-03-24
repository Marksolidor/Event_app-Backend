const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const CsbInspector = require("csb-inspector");
const morganBody = require("morgan-body");
const sequelize = require("./src/database/db");

// Importar rutas
const userRoutes = require("./src/routes/usersRoutes");
const eventRoutes = require("./src/routes/eventsRoutes");
const { Query } = require("pg");

CsbInspector();

app.use(express.json());
app.use(cors());

// Agregar rutas a la instancia de app
app.use("/users", userRoutes);
app.use("/events", eventRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Conexión exitosa a la base de datos");
  app.listen(
    process.env.PORT,
    console.log("El servidor está activo en el puerto", process.env.PORT)
  );
});

module.exports = app;
