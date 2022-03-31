import types from "../actions/products/products-types";
let init = {
  topProducts: [],
  recommendations: [],
  wishlist: [],
  wishlistSearchSource: [],
  shop: [],
  unfilteredShop: [],
  shopFilters: {
    price: {
      lowestPrice: 0,
      highestPrice: 0
    },
    categories: [],
    onSale: false
  },
  collections: [],
};

const productsReducer = (state = init, action) => {
  switch (action.type) {
    case types.UPDATE_SHOP_CATALOG:
      return {
        ...state,
        shop: action.payload,
      };
    case types.UPDATE_SHOP_FILTERS:
      return {
        ...state,
        shopFilters: action.payload,
      };
    default:
      return state;
  }
};

export default productsReducer;
