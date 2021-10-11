var config = require('../config.js');
var { Pool } = require('pg')
var db = new Pool({
  user: config.user,
  password: config.password,
  host: config.host,
  port: config.port,
  database: config.database
})

db.connect()
  .then(() => {
    console.log('Connected to database');
  })

  .catch((error) => {
    console.log('Error connecting to database: ', error);
  });

module.exports = db;

