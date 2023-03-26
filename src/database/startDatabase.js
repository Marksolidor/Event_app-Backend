const pool = require('./db');

const startDatabase = () => {
  pool.connect((err, client, done) => {
    if (err) throw err;

    console.log('Conectado a la base de datos PostgreSQL');
    done();
  });
};

module.exports = startDatabase;
