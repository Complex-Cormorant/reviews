CREATE SCHEMA IF NOT EXISTS reviews
  CREATE TABLE review(
    id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT,
    date DATE,
    summary VARCHAR(500),
    body VARCHAR(2000),
    recommend BOOLEAN,
    reported BOOLEAN,
    reviewer_name VARCHAR(5000),
    reviewer_email VARCHAR(50),
    response null,
    helpfulness INT,
    PRIMARY KEY(id),
  )
  CREATE TABLE review_photos(
    id INT NOT NULL,
    review_id INT NOT NULL,
    url VARCHAR(200),
    PRIMARY KEY (id)
  )

  CREATE TYPE characteristics AS ENUM ('Fit', 'Length', 'Size', 'Width', 'Comfort', 'Quality')

  CREATE TABLE characteristics(
    id INT NOT NULL,
    product_id INT NOT NULL,
    name characteristics,
    PRIMARY KEY (id)
  )

  CREATE TABLE characteristic_reviews(
    id INT NOT NULL,
    characteristic_id INT REFERENCES characteristics (characteristic_id),
    review_id INT REFERENCES review_results (review_id),
    value INT
  )