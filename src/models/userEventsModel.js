const User = require("./usersModel");
const Evento = require("./eventsModel");

class User_Event {
  static init(connection) {
    this.user_event = connection.define('user_event', {});

    User_Event.user_event.belongsToMany(User, { through: 'user_events' });
    User_Event.user_event.belongsToMany(Evento, { through: 'user_events' });
  }
}

module.exports = User_Event;
