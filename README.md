# reviews

Individual Service for Reviews

==> reviews.csv <==
id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness
1,1,5,1596080481467,"This product was great!","I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.",true,false,"funtime","first.last@gmail.com",null,8
2,1,4,1610178433963,"This product was ok!","I really did not like this product solely because I am tiny and do not fit into it.",false,false,"mymainstreammother","first.last@gmail.com",null,2
3,2,4,1609325851021,"I am liking these glasses","They are very dark.  But that's good because I'm in very sunny spots",true,false,"bigbrotherbenjamin","first.last@gmail.com","Glad you're enjoying the product!",5
4,2,4,1593628485253,"They look good on me","I so stylish and just my aesthetic.",true,false,"fashionperson","first.last@gmail.com",null,1

==> reviews_photos.csv <==
id,review_id,url
1,5,"https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
2,5,"https://images.unsplash.com/photo-1561693532-9ff59442a7db?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
3,5,"https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
4,9,"https://images.unsplash.com/photo-1542574621-e088a4464f7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3028&q=80"
5,9,"https://images.unsplash.com/photo-1560294559-1774a164fb0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
6,9,"https://images.unsplash.com/photo-1555689502-c4b22d76c56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
8,10,"https://images.unsplash.com/photo-1560829675-11dec1d78930?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1652&q=80"
7,10,"https://images.unsplash.com/photo-1549812474-c3cbd9a42eb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
9,10,"https://images.unsplash.com/photo-1559709319-3ae960cda614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"

==> characteristics.csv <==
id,product_id,name
1,1,"Fit"
2,1,"Length"
3,1,"Comfort"
4,1,"Quality"
5,2,"Quality"
6,3,"Fit"
7,3,"Length"
8,3,"Comfort"
9,3,"Quality"

==> characteristic_reviews.csv <==
id,characteristic_id,review_id,value
1,1,1,4
2,2,1,3
3,3,1,5
4,4,1,4
5,1,2,4
6,2,2,4
7,3,2,5
8,4,2,4
9,5,3,4