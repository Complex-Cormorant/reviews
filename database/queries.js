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

  }
}
