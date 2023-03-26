const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'eventapp',
  password: 'Kamenashi30',
  port: 5432,
});

module.exports = pool;
