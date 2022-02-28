let init = {
  searchVisible: false,
  cartVisible: false,
  wishlistVisible: false,
};

const appReducer = (state = init, action) => {
  switch (action.type) {
    case "TOGGLE_SEARCH":
      return {
        ...state,
        searchVisible: state.searchVisible ? false : true,
      };
    case "TOGGLE_CART":
      return {
        ...state,
        cartVisible: state.cartVisible ? false : true,
      };
    case "TOGGLE_WISHLIST":
      return {
        ...state,
        wishlistVisible: state.wishlistVisible ? false : true,
      };
    default:
      return state;
  }
};

export default appReducer;
