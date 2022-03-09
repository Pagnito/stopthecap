import types from "./products-types";
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
