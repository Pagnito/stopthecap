import types from "../actions/products/products-types";
let init = {
  topProducts: null,
  recommendations: null,
};

const productsReducer = (state = init, action) => {
  switch (action.type) {
 
    default:
      return state;
  }
};

export default productsReducer;
