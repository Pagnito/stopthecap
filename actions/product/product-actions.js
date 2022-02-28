import types from "./product-types";
import mongo from '../../use/use-mongo';

export const selectVariantAction = (variant) => {
  return { type: types.PDP_SELECT_VARIANT, payload: variant};
}

export const selectVariantActionPC = (variant, product) => {
  return { type: types.PC_SELECT_VARIANT, payload: {product, variantOption: variant}};
}

export const submitReviewAction = (review) => async (dispatch) => {
  let submitted = await mongo.createReview(review);
  if(submitted.status === 200) {
    dispatch({
      type: types.ADD_REVIEW,
      payload: review
    })
  } else {
    dispatch({
      type: types.ERROR,
      payload: 'Could not submit review, try again.'
    })
  }
}

export const setReviewsAction = (reviews) => {
  return {
    type: types.SET_REVIEWS,
    payload: reviews
  }
}

