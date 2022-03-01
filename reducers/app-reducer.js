import types from '../actions/app/app-types'
let init = {
  searchVisible: false,
  cartVisible: false,
  wishlistVisible: false,
  quickViewVisible: false
};

const appReducer = (state = init, action) => {
  switch (action.type) {
    case types.TOGGLE_SEARCH:
      return {
        ...state,
        searchVisible: state.searchVisible ? false : true,
      };
    case types.TOGGLE_CART:
      return {
        ...state,
        cartVisible: state.cartVisible ? false : true,
      };
    case types.TOGGLE_WISHLIST:
      return {
        ...state,
        wishlistVisible: state.wishlistVisible ? false : true,
      };
    case types.TOGGLE_PRODUCT_QUICKVIEW:
      return {
        ...state,
        quickViewVisible: state.quickViewVisible ? false : true,
      };
    default:
      return state;
  }
};

export default appReducer;
