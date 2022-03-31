import types from './cart-types';
import shopify from '../../shopify/shopify-funcs';
import { toggleCart } from "../app/app-actions";

export const addToCartAction = (newItem, cart) => async (dispatch) => {
  if(cart.items.length === 0) {
    const checkout = await shopify.createCheckout(newItem.id, 1);
    dispatch({type: types.CREATE_CHECKOUT, payload: checkout});
    localStorage.setItem("checkout", JSON.stringify({items: [newItem], checkout_id: checkout.id, checkout_url: checkout.webUrl}));
    return dispatch({type: types.ADD_TO_CART, payload: newItem})
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
    return dispatch({type: types.UPDATE_CART, payload: newCart});
  }
}

export const removeCartItemAction =(itemToRemove) => async (dispatch) => {
  let cart = JSON.parse(localStorage.getItem('checkout'));
  const updatedCart = cart.items.filter(item => item.id !== itemToRemove.id);
  dispatch({type: types.UPDATE_CART, payload: updatedCart});
  const newCheckout = await shopify.updateCheckout(cart.checkout_id, updatedCart);
  localStorage.setItem("checkout", JSON.stringify({items: updatedCart, checkout_id: newCheckout.id, checkout_url: newCheckout.webUrl}));

  // if (cart.length === 1) {
  //   toggleCart()
  // }
}

export function loadCheckoutFromLocalStorage() {
  let checkout = JSON.parse(localStorage.getItem('checkout'));
  return {
    type: types.LOAD_CHECKOUT,
    payload: checkout
  }
}

export const addToWishList = (product) => {
  let wishlist = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem('wishlist')) : [];
  let alrdyInWishlist = wishlist.find(item => item.id === product.id);
  if(!alrdyInWishlist) wishlist.push(product);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  return {
    type: types.ADD_TO_WISHLIST,
    payload: wishlist,
  };
};

export const removeFromWishList = (product_id) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist"));
  wishlist = wishlist.filter((product) => product.id !== product_id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  return {
    type: types.REMOVE_FROM_WISHLIST,
    payload: wishlist,
  };
};
export const deleteWishList = () => {
  localStorage.removeItem("wishlist");
  return {
    type: types.DELETE_WISHLIST,
  };
};
export const setWishlist = () => {
  let wishlist = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : [];
  return {
    type: types.SET_WISHLIST,
    payload: wishlist,
  };
};

export const updateWishlist = (wishlist) => {
  return {
    type: types.UPDATE_WISHLIST,
    payload: wishlist,
  };
}
