const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hola, este es un servidor web en Express.js");
});

module.exports = app;
