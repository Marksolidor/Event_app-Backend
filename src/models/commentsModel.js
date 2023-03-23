const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const User = require("./userModel");
const Evento = require("./eventModel");

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
