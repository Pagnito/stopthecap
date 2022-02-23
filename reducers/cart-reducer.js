import cartTypes from '../actions/cart/cart-types'
let init = {
  checkout_id: null,
  checkout_url: null,
  items: [],
  error: null
};

const appReducer = (state = init, action) => {
  switch (action.type) {
    case cartTypes.CREATE_CHECKOUT: 
      return {
        ...state,
        checkout_id: action.payload.id,
        checkout_url: action.payload.webUrl
      }
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload]
      }
    case cartTypes.UPDATE_CART:
      return {
        ...state,
        items: action.payload
      }
    case cartTypes.LOAD_CHECKOUT:
      return {
        ...state,
        ...action.payload
      }
    case cartTypes.CART_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
};

export default appReducer;
