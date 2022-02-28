import cartTypes from './cart-types';
import shopify from '../../shopify/shopify-funcs';
import { toggleCart } from "../app/app-actions";

export const addToCartAction = (newItem, cart) => async (dispatch) => {
  if(cart.items.length === 0) {
    const checkout = await shopify.createCheckout(newItem.id, 1);
    dispatch({type: cartTypes.CREATE_CHECKOUT, payload: checkout});
    localStorage.setItem("checkout", JSON.stringify({items: [newItem], checkout_id: checkout.id, checkout_url: checkout.webUrl}));
    return dispatch({type: cartTypes.ADD_TO_CART, payload: newItem})
  } else {
    let newCart = []
    let added = false
    let updated = cart.items.map(item => {
      if (item.id === newItem.id) {
        item.variantQuantity += newItem.variantQuantity
        newCart = [...cart.items]
        added = true
      }
      return item;
    })
    if(!added) {
      newCart = [...updated, newItem]
    }

    const newCheckout = await shopify.updateCheckout(cart.checkout_id, newCart)
    localStorage.setItem("checkout", JSON.stringify({items: newCart, checkout_id: newCheckout.id, checkout_url: newCheckout.webUrl}))
    return dispatch({type: cartTypes.UPDATE_CART, payload: newCart});
  }
}

export const removeCartItemAction =(itemToRemove) => async (dispatch) => {
  let cart = JSON.parse(localStorage.getItem('checkout'));
  const updatedCart = cart.items.filter(item => item.id !== itemToRemove.id);
  const newCheckout = await shopify.updateCheckout(cart.checkout_id, updatedCart);
  localStorage.setItem("checkout", JSON.stringify({items: updatedCart, checkout_id: newCheckout.id, checkout_url: newCheckout.webUrl}));
  return dispatch({type: cartTypes.UPDATE_CART, payload: updatedCart});

  // if (cart.length === 1) {
  //   toggleCart()
  // }
}

export function loadCheckoutFromLocalStorage(payload) {
  return {
    type: cartTypes.LOAD_CHECKOUT,
    payload: payload
  }
}