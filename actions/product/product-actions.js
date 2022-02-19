import productTypes from "./product-types";


export function selectVariantAction(variant) {
  return { type: productTypes.PDP_SELECT_VARIANT, payload: variant};
}

export function selectVariantActionPC(variant, product) {
  return { type: productTypes.PC_SELECT_VARIANT, payload: {product, variantOption: variant}};
}


