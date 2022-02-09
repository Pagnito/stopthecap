import productTypes from "./product-types";


export function loadFeaturedProducts(products) {
  return { type: productTypes.MP_FEATURED_PRODUCTS, payload: products };
}

export function loadProduct(variant) {
  return { type: productTypes.PDP_SELECTED_VARIANT, payload: variant };
}

export function selectVariant(product) {
  return { type: productTypes.PDP_PRODUCT, payload: product };
}

