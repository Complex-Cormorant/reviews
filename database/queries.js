const pool = require('./index.js');

module.exports = {
  getReviews: (req, res) => {
    const id = (req.query.product_id)
    const count = (req.query.count)
    pool.query('select * from reviews where reviews.product_id = $1 limit $2;', [id, count], (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results.rows)
      }
    })
  },

  // need to add characteristics, add coalesce

  getReviewsAndPhotos: (req, res) => {
    const id = (req.query.product_id)
    pool.query("SELECT reviews.id, product_id, rating, to_timestamp(cast(date/1000 as bigint)) AS date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness, ARRAY_AGG ( json_build_object('id', review_photos.id, 'url', review_photos.url)) photos FROM reviews LEFT JOIN review_photos ON reviews.id = review_photos.review_id WHERE (product_id = $1) GROUP BY reviews.id;", [id], (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results.rows)
      }
    })
  },

  // need to figure out how to get name to show up correctly
  // are the values supposed to be averages for each characteristic?
  // can't use name 'characteristics' because it's a table name
  getMeta: (req, res) => {
    const id = (req.query.product_id)
    pool.query("SELECT (json_object_agg (characteristics.name, json_build_object('id', characteristics.id, 'value', (SELECT AVG(characteristic_reviews.value) FROM characteristic_reviews WHERE characteristic_reviews.characteristic_id = characteristics.id AND product_id = $1)))) AS characteristics, (SELECT (sum(CASE WHEN recommend THEN 1 ELSE 0 END)) FROM reviews WHERE product_id = $1) AS recommended, (SELECT (json_build_object('1', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 1 AND product_id = $1), '2', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 2 AND product_id = $1), '3', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 3 AND product_id = $1), '4', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 4 AND product_id = $1), '5', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 5 AND product_id = $1)))) AS ratings FROM characteristics WHERE (product_id = $1);", [id], (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        console.log('working')
        res.send(results.rows)
      }
    })
  },

  // need to figure out how to handle recommend, response, helpfulness, reported
  addReview: (req, res) => {
    const { product_id, rating, date, summary, body, reviewer_name, reviewer_email } = req.body
    pool.query('INSERT INTO reviews (product_id, rating, date, summary, body, reviewer_name, reviewer_email) VALUES ($1, $2, $3, $4, $5, $6, $7);', [product_id, rating, date, summary, body, reviewer_name, reviewer_email], (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send(results.rows);
      }
    })
  },

  markHelpful: (req, res) => {
    const { review_id } = req.query;
    pool.query('UPDATE reviews SET helpfulness = helpfulness+1 WHERE reviews.id=$1;', [review_id], (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send('Marked review helpful');
      }
    })

  },

  report: (req, res) => {
    const { review_id } = req.query;
    pool.query('UPDATE reviews SET reported = true WHERE reviews.id=$1;', [review_id], (error, results) => {
      if (error) {
        res.send(error.message);
      } else {
        res.send('Reported');
      }
    })

  }
};


  // WORKING RECOMMENDED AND RATINGS DRAFTS
  // COALESCE (COUNT(rating) WHERE rating = 1) AS ratings,
  // COALESCE (sum(CASE WHEN recommend THEN 1 ELSE 0 END), 0) AS recommended
  // GROUP BY
  // reviews.product_id, characteristics.name;

  // MOST RECENT DRAFT
  // SELECT
  //     (json_object_agg
  //       (characteristics.name,
  //       json_build_object(
  //         'id', characteristics.id, 'value',
  //         (SELECT AVG(characteristic_reviews.value) FROM characteristic_reviews WHERE characteristic_reviews.characteristic_id = characteristics.id AND product_id = 4)))) AS characteristics,
  //       (SELECT (sum(CASE WHEN recommend THEN 1 ELSE 0 END)) FROM reviews WHERE product_id = 4) AS recommended,
  //       (SELECT (json_build_object(
  //       '1', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 1 AND product_id = 4),
  //       '2', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 2 AND product_id = 4),
  //       '3', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 3 AND product_id = 4),
  //       '4', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 4 AND product_id = 4),
  //       '5', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 5 AND product_id = 4))))
  //       AS ratings
  // FROM
  //   characteristics
  // WHERE
  //   (product_id = 4);

  // WORKS TO GET CORRECT KEYS AND VALUES
  // SELECT
  //     (json_object_agg (characteristics.name,
  //       json_build_object( 'id', characteristics.id, 'value', (SELECT AVG(characteristic_reviews.value) FROM characteristic_reviews WHERE characteristic_reviews.characteristic_id = characteristics.id))))
  // FROM
  //   characteristics
  // WHERE
  //   (product_id = 4);
  // GROUP BY
  //   reviews.product_id, characteristics.name;

  // // makes one entry per characteristic
  // SELECT
  //   reviews.product_id FROM reviews
  // LEFT JOIN
  //   characteristic_reviews
  //     ON reviews.id in characteristic_reviews.review_id
  // INNER JOIN
  //   characteristics
  //     ON characteristic_reviews.characteristic_id = characteristics.id
  // WHERE (reviews.product_id = 4)
  // GROUP BY reviews.product_id;

// UPDATE reviews SET helpfulness = helpfulness+1 WHERE reviews.id=31;

// SELECT
// reviews.id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness, ARRAY_AGG ('id: ' || review_photos.id ||', url: ' || review_photos.url) photos
// FROM
// reviews
// INNER JOIN
// review_photos
// ON
// reviews.id = review_photos.review_id
// WHERE
// (product_id = 14)
// GROUP BY
// reviews.id
// ;

// ', review_id: ' || review_photos.review_id ||

// old array aggregate
// ('id: ' || review_photos.id || ', url: '  || review_photos.url)

// SELECT reviews.product_id, json_agg ( json_build_object('name', characteristics.name, 'id', characteristics.id, 'value', characteristic_reviews.value)) characteristic FROM reviews, ((SELECT COALESCE (sum(CASE WHEN recommend THEN 1 ELSE 0 END), 0) FROM reviews) ) INNER JOIN characteristic_reviews ON reviews.id = characteristic_reviews.review_id INNER JOIN characteristics ON characteristic_reviews.characteristic_id = characteristics.id WHERE (reviews.product_id = 4) GROUP BY reviews.product_id;


// json_agg (json_build_object ('1', sum(CASE WHEN rating THEN 1 )
// ))

// // case

// // MOST RECENT
// SELECT
//   reviews.product_id,
//   json_agg
//     ( json_build_object(characteristics.name,
//       json_build_object( 'id', characteristics.id, 'value', (SELECT AVG(characteristic_reviews.value) FROM characteristic_reviews WHERE characteristic_reviews.characteristic_id = characteristics.id))))
// FROM
//   reviews
// LEFT JOIN
//   characteristic_reviews ON reviews.id = characteristic_reviews.review_id
// INNER JOIN
//   characteristics ON characteristic_reviews.characteristic_id = characteristics.id
// WHERE
//   (reviews.product_id = 4)
// GROUP BY
//   reviews.product_id, characteristics.name;


// SELECT *,
// FROM reviews;
