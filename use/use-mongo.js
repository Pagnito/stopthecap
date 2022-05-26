import user from "../mongo/mongo-realm";

const useReviews = {
  getReviewsForProduct: async (product_handle) => {
    let result = await user.functions.GetReviewsForProduct(product_handle);
    return result.reviews ? result.reviews : [];
  },
  getReviewsForProducts: async (product_handles) => {
    let result = await user.functions.GetReviewsForProducts(product_handles);
    return result.reviews ? result.reviews : [];
  },
  createReview: async (review) => {
    try {
      let inserted = await user.functions.CreateOrUpdateReview(review);
      return inserted;
    } catch (err) {
      return {status: 500, message: 'Failed to upload review. Try again'};
    }

  },
  updateReview: async (review) => {
    let updated = await user.functions.CreateOrUpdateReview(review);
    return updated.status === 200 ? updated : false;
  },
  
};

export default useReviews;
