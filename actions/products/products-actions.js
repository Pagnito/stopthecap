import types from "./products-types";

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