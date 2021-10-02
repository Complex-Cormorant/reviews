const express = require('express')
const app = express()
var path = require('path');
const port = 3005
const db = require('../database/index.js');

// TODO:
// figure out what route in get should be
// figure out what req.params looks like and what i need to get reviews by id
// install morgan
app.use(express.static((path.join(__dirname + 'public'))));
app.use(express.json());
app.use(express.urlencoded());
// need to figure out how to handle id in the url
app.get('/api/reviews', (req, res) => {
  // console.log(req);
  // db.query()
  res.send(req.params);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})