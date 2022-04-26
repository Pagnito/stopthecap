import types from "./products-types";
import shopify from '../../shopify/shopify-funcs';

export const updateShopCatalog = (catalog) => {
  return {
    type: types.UPDATE_SHOP_CATALOG,
    payload: catalog
  }
}

export const updateShopFilters = (filter) => {
  return {
    type: types.UPDATE_SHOP_FILTERS,
    payload: filter
  }
}
export const getAllProducts = () => async (dispatch) => {
  const products = await shopify.getAllProducts();
  dispatch({
    type: types.SET_ALL_PRODUCTS,
    payload: products.edges
  })
}

export const setSearchedProducts = (products) => {
  return {
    type: types.SET_SEARCHED_PRODUCTS,
    payload: products
  }
}