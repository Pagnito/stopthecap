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
    localStorage.setItem("checkout_id", JSON.stringify({items: newCart, checkout_id: newCheckout.id, checkout_url: newCheckout.webUrl}))
    return dispatch({type: cartTypes.UPDATE_CART, payload: newCart});
  }
}

export async function removeCartItemAction(itemToRemove) {
  const updatedCart = cart.filter(item => item.id !== itemToRemove)
  dispatch({type: cartTypes.UPDATE_CART, payload: updatedCart});
  const newCheckout = await shopify.updateCheckout(checkoutId, updatedCart)

  localStorage.setItem("checkout_id", JSON.stringify({items: updatedCart, checkout: newCheckout}))

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