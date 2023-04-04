const express = require("express");
const router = express.Router();
const { validarToken } = require("../middlewares/authentication");
const { crearUserEvent, eliminarUserEvent } = require("../controllers/userEventController");

router.post("/", crearUserEvent);
router.delete("/:id", eliminarUserEvent);

module.exports = router;
