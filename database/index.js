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

  // .then(() => {
  //   // use count coming in, if undefined do deafult 5 (req.query)
  //   db.query('select * from reviews where reviews.product_id = 15 limit 5;', (error, response) => {
  //     if (error) {
  //       console.log('Error in query', error);
  //     } else {
  //       console.log(response);
  //       db.end()
  //     }
  //   });
  // })
