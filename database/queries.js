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

  // want to join

  getReviewsAndPhotos: (req, res) => {
    const id = (req.query.product_id)
    pool.query("SELECT reviews.id, product_id, rating, to_timestamp(cast(date/1000 as bigint)) AS date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness, ARRAY_AGG ( json_build_object('id', review_photos.id, 'url', review_photos.url)) photos FROM reviews INNER JOIN review_photos ON reviews.id = review_photos.review_id WHERE (product_id = $1) GROUP BY reviews.id;", [id], (error, results) => {
      if (error) {
        res.send(error);
      } else {
        res.send(results.rows)
      }
    })
  }


  // addReview: (req, res) => {
  //   const
  // }

//   markHelpful: (req, res) => {

//   }

//   report: (req, res) => {

//   }
}




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