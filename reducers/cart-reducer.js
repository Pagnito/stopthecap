import types from "../actions/cart/cart-types";
let init = {
  checkout_id: null,
  checkout_url: null,
  items: [],
  error: null,
  wishlist: [],
  wishlistSearchSource: [],
};

const appReducer = (state = init, action) => {
  switch (action.type) {
    case types.CREATE_CHECKOUT:
      return {
        ...state,
        checkout_id: action.payload.id,
        checkout_url: action.payload.webUrl,
      };
    case types.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case types.UPDATE_CART:
      return {
        ...state,
        items: action.payload,
      };
    case types.LOAD_CHECKOUT:
      return {
        ...state,
        ...action.payload,
      };
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
    case types.CART_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
