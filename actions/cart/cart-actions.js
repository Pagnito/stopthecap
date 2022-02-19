import cartTypes from './cart-types';
import shopify from '../../shopify/shopify-funcs';
import { toggleCart } from "../app/app-actions";

export const addToCartAction = (newItem, cart) => async (dispatch) => {
  if(cart.length === 0) {
    const checkout = await shopify.createCheckout(newItem.id, 1);
    dispatch({type: cartTypes.CREATE_CHECKOUT, payload: checkout});
    localStorage.setItem("checkout_id", JSON.stringify({items: [newItem], checkout}));
    return dispatch({type: cartTypes.ADD_TO_CART, payload: newItem})
  } else {
    let newCart = []
    let added = false
    
    cart.map(item => {
      if (item.id === newItem.id) {
        item.variantQuantity++
        newCart = [...cart]
        added = true
      } 
    })

    if(!added) {
      newCart = [...cart, newItem]
    }

    const newCheckout = await shopify.updateCheckout(checkoutId, newCart)
    localStorage.setItem("checkout_id", JSON.stringify([newCart, newCheckout]))
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