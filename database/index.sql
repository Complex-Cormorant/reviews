CREATE INDEX characteristics_product_idx ON characteristics (product_id);

CREATE INDEX characteristic_idx ON characteristic_reviews (characteristic_id);

CREATE INDEX reviews_idx ON reviews (id);

CREATE INDEX characteristics_idx ON characteristics (id);

SELECT (json_object_agg (characteristics.name, json_build_object('id', characteristics.id, 'value', (SELECT AVG(characteristic_reviews.value) FROM characteristic_reviews WHERE characteristic_reviews.characteristic_id = characteristics.id AND product_id = 455)))) AS characteristics, (SELECT (sum(CASE WHEN recommend THEN 1 ELSE 0 END)) FROM reviews WHERE product_id = 455) AS recommended, (SELECT (json_build_object('1', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 1 AND product_id = 455), '2', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 2 AND product_id = 455), '3', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 3 AND product_id = 455), '4', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 4 AND product_id = 455), '5', (SELECT SUM (reviews.rating) FROM reviews WHERE rating = 5 AND product_id = 455)))) AS ratings FROM characteristics WHERE (product_id = 455);