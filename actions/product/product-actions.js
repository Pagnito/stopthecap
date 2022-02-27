import productTypes from "./product-types";
import mongo from '../../use/use-mongo';

export const selectVariantAction = (variant) => {
  return { type: productTypes.PDP_SELECT_VARIANT, payload: variant};
}

export const selectVariantActionPC = (variant, product) => {
  return { type: productTypes.PC_SELECT_VARIANT, payload: {product, variantOption: variant}};
}

export const submitReviewAction = (review) => async (dispatch) => {
  let submitted = await mongo.createReview(review);
  if(submitted.status === 200) {
    dispatch({
      type: productTypes.ADD_REVIEW,
      payload: review
    })
  } else {
    dispatch({
      type: productTypes.ERROR,
      payload: 'Could not submit review, try again.'
    })
  }
}

