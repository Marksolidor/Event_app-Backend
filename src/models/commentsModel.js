const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./usersModel");
const Evento = require("./eventsModels");

class Comment extends Model {}

Comment.init(
  {
    texto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "comment" }
);

User.hasMany(Comment);
Comment.belongsTo(User);

Evento.hasMany(Comment);
Comment.belongsTo(Evento);

module.exports = Comment;
