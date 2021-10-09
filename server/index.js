const express = require('express')
const app = express()
const newrelic = require('newrelic');
var path = require('path');
// const host = '3.101.24.87';
const port = 3000;
const db = require('../database/index.js');
const queries = require('../database/queries.js');
// install morgan

app.use(express.static((path.join(__dirname + 'public'))));
app.use(express.json());

app.get('/reviews/', queries.getReviewsAndPhotos)

app.get('/reviews/meta', queries.getMeta)

app.post('/api/reviews', queries.addReview)

app.put('/api/reviews/:review_id/helpful', queries.markHelpful)

app.put('/api/reviews/:review_id/report', queries.report)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})