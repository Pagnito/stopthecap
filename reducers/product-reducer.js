import findVariantOptionIndex from '../util/findVariantOptionIndex';
let init = {
  features: null,
  pdp: {
    selectedVariant: null,
  },
};

const productReducer = (state = init, action) => {
  switch (action.type) {
    case "PDP_SELECT_VARIANT":
      let currentSelectedOptions = state.pdp.selectedVariant.selectedOptions;
      let selectedVariant = state.pdp.product.variants.edges.find(
        ({ node }) => {
          return node.selectedOptions.every((option, ind) => {
            if(option.name.toLowerCase() === action.payload.name.toLowerCase()){
              return option.value.toLowerCase()===action.payload.value.toLowerCase();
            } else {
              return option.value.toLowerCase()===currentSelectedOptions[ind].value.toLowerCase()
            }
          })
        }
      );
      selectedVariant = selectedVariant.node;
      return {
        ...state,
        pdp: Object.assign(state.pdp, { selectedVariant: selectedVariant }),
      };
    case "PDP_PRODUCT":
      return {
        ...state,
        pdp: Object.assign(state.pdp, { product: action.payload }),
      };
    case "FEATURED_PRODUCTS":
      return {
        ...state,
        features: Object.assign(state.features, {
          topProducts: action.payload,
        }),
      };
    default:
      return state;
  }
};

export default productReducer;
