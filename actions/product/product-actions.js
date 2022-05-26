import types from "./product-types";
import mongo from '../../use/use-mongo';

export const selectVariantAction = (variant) => {
  return { type: types.PDP_SELECT_VARIANT, payload: variant};
}

export const selectVariantActionQV = (variant) => {
  return { type: types.QV_SELECT_VARIANT, payload: variant};
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
      payload: {review: submitted.message}
    })
    setTimeout(() => {
      dispatch({
          type: types.ERROR,
          payload: {}
        }
      )
    },5000)
  }
}

export const setReviewsAction = (reviews) => {
  return {
    type: types.SET_REVIEWS,
    payload: reviews
  }
}

export const setQuickviewProduct = (product) => {
  return {
    type: types.SET_QUICKVIEW_PRODUCT,
    payload: product
  }
}