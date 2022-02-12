import productTypes from "./product-types";


export function loadFeaturedProducts(products) {
  return { type: productTypes.MP_FEATURED_PRODUCTS, payload: products };
}

export function loadProduct(product) {
  return { type: productTypes.PDP_PRODUCT, payload: product };
}

export function selectVariantAction(variant) {
  return { type: productTypes.PDP_SELECT_VARIANT, payload: variant};
}

