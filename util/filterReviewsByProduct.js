let filterReviewsByProduct = (reviews) => {
  let reviewsObj = {};
  reviews.forEach(review => {
    review._id = review._id.toString();
    if(reviewsObj[review.product_handle]) {
      reviewsObj[review.product_handle].push(review);
    } else {
      reviewsObj[review.product_handle] = [review]
    }
  })
  return reviewsObj;
}
export default filterReviewsByProduct