  CREATE TABLE IF NOT EXISTS reviews(
    id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT,
    date BIGINT,
    summary VARCHAR(500),
    body VARCHAR(2000),
    recommend BOOLEAN NOT NULL,
    reported BOOLEAN NOT NULL,
    reviewer_name VARCHAR(5000),
    reviewer_email VARCHAR(50),
    response TEXT,
    helpfulness INT,
    PRIMARY KEY(id)
  );
  CREATE TABLE IF NOT EXISTS review_photos(
    id INT NOT NULL,
    review_id INT NOT NULL,
    url VARCHAR(200),
    PRIMARY KEY (id)
  );
  CREATE TYPE characteristic_names AS ENUM ('Fit', 'Length', 'Size', 'Width', 'Comfort', 'Quality');

  CREATE TABLE IF NOT EXISTS characteristics(
    id INT NOT NULL,
    product_id INT NOT NULL,
    -- name ENUM ('Fit', 'Length', 'Size', 'Width', 'Comfort', 'Quality'),
    name characteristic_names,
    PRIMARY KEY (id)
  );
  CREATE TABLE IF NOT EXISTS characteristic_reviews(
    id INT NOT NULL,
    characteristic_id INT REFERENCES characteristics(id),
    review_id INT REFERENCES reviews(id),
    value INT,
    PRIMARY KEY (id),
    CONSTRAINT reviews_characteristics
      FOREIGN KEY (review_id)
      REFERENCES reviews (id),
    CONSTRAINT characteristics_characteristic_reviews
      FOREIGN KEY (characteristic_id)
      REFERENCES characteristics (id)
  );
