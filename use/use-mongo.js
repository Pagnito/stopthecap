import user from "../mongo/mongo-realm";

const useReviews = {
  getReviewsForProduct: async (product_handle) => {
    let result = await user.functions.GetReviewsForProduct(product_handle);
    return result.reviews ? result.reviews : [];
  },
  createReview: async (review) => {
    let inserted = await user.functions.CreateOrUpdateReview(review);
    return inserted.status === 200 ? inserted : false;
  },
  updateReview: async (review) => {
    let updated = await user.functions.CreateOrUpdateReview(review);
    return updated.status === 200 ? updated : false;
  },
  
};

export default useReviews;
