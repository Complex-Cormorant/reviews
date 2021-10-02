const express = require('express')
const app = express()
var path = require('path');
const port = 3005
const db = require('../database/index.js');
const queries = require('../database/queries.js');
// TODO:
// figure out what route in get should be
// figure out what req.params looks like and what i need to get reviews by id
// install morgan
app.use(express.static((path.join(__dirname + 'public'))));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hullo world');
})

app.get('/api/reviews', queries.getReviews)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})