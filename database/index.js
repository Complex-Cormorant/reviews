var { Pool } = require('pg')
var db = new Pool({
  user: 'savanna',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'reviews'
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
