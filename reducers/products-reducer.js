import types from "../actions/products/products-types";
let init = {
  topProducts: [],
  recommendations: [],
  wishlist: [],
  wishlistSearchSource: [],
  shop: [],
  collections: []
};

const productsReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
        wishlistSearchSource: action.payload,
      };
    case types.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
        wishlistSearchSource: action.payload,
      };
    case types.DELETE_WISHLIST:
      return {
        ...state,
        wishlist: [],
        wishlistSearchSource: [],
      };
    case types.SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
        wishlistSearchSource: action.payload,
      };
    case types.UPDATE_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
