const express = require('express')
const app = express()
var path = require('path');
const port = 3000;
const db = require('../database/index.js');
const queries = require('../database/queries.js');

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