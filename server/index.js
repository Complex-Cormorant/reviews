const express = require('express')
const app = express()
var path = require('path');
const port = 3005
const db = require('../database/index.js');
const queries = require('../database/queries.js');
// install morgan

app.use(express.static((path.join(__dirname + 'public'))));
app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('hullo world');
// })

app.get('/api', queries.getReviews)

// TODO:
app.get('/api/reviews', queries.getReviewsAndPhotos)

// app.post('/api/reviews', queries.addReview)

// app.put('/api/reviews/:review_id/helpful', queries.markHelpful)

// app.put('/api/reviews/:review_id/report', queries.report)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})