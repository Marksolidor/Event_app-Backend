const { Model } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./userModel");
const Evento = require("./eventModel");

class User_Event extends Model {}

User_Event.init({}, { sequelize, modelName: "user_event" });

User.belongsToMany(Evento, { through: User_Event });
Evento.belongsToMany(User, { through: User_Event });

module.exports = User_Event;
