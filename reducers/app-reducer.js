import types from "../actions/app/app-types";
let init = {
  searchVisible: false,
  cartVisible: false,
  wishlistVisible: false,
  quickViewVisible: false,
  mobileNavVisible: false,
  mobileShopFiltersVisible: false,
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
    case types.TOGGLE_MOBILE_NAV:
      return {
        ...state,
        mobileNavVisible: state.mobileNavVisible ? false : true,
      };
    case types.TOGGLE_MOBILE_SHOP_FILTERS:
      return {
        ...state,
        mobileShopFiltersVisible: state.mobileShopFiltersVisible ? false : true,
      };
    default:
      return state;
  }
};

export default appReducer;
