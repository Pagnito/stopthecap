import types from "../actions/product/product-types";
let init = {
  features: null,
  product: null,
  selectedVariant: null,
  reviews: [],
  reviewsSearchSource: [],
  reviewOverview: null,
  shipping: null,
  productQuickview: {
    selectedProduct: null,
    selectedVariant: null,
  },
};
function selectVariant(currentSelectedOptions, variants, variantOption) {
  let selectedVariant;
  selectedVariant = variants.find(({ node }) => {
    return node.selectedOptions.every((option, ind) => {
      if (option.name.toLowerCase() === variantOption.name.toLowerCase()) {
        return option.value.toLowerCase() === variantOption.value.toLowerCase();
      } else {
        return option.value.toLowerCase() === currentSelectedOptions[ind].value.toLowerCase();
      }
    });
  });
  if (!selectedVariant) {
    selectedVariant = variants.find(({ node }) => {
      let optionIndex = node.selectedOptions.findIndex((option) => option.name.toLowerCase() === variantOption.name.toLowerCase());
      return node.selectedOptions[optionIndex].value.toLowerCase() === variantOption.value.toLowerCase();
    });
  }
  return selectedVariant.node;
}

const productReducer = (state = init, action) => {
  switch (action.type) {
    case types.PDP_SELECT_VARIANT:
      let currentSelectedOptionsPDP = state.selectedVariant.selectedOptions;
      let variantsPDP = state.product.variants.edges;
      return {
        ...state,
        selectedVariant: selectVariant(currentSelectedOptionsPDP, variantsPDP, action.payload),
      };
    case types.QV_SELECT_VARIANT:
      console.log(action.payload)
      // let productsWithEditedOptions = state.productCard.productsWithEditedOptions;
      // let newProduct = productsWithEditedOptions.find((product) => product.id === action.payload.product.id);
      let variantsQV = state.productQuickview.selectedProduct.variants.edges;
      let currentSelectedOptionsQV = state.productQuickview.selectedVariant.selectedOptions;
      return {
        ...state,
        productQuickview: {
          selectedProduct: state.productQuickview.selectedProduct,
          selectedVariant: selectVariant(currentSelectedOptionsQV, variantsQV, action.payload),
        },
      };
    case types.SET_QUICKVIEW_PRODUCT:
      return {
        ...state,
        productQuickview: {
          selectedProduct: action.payload,
          selectedVariant: action.payload.variants.edges[0].node
        }

      };

    case types.ADD_REVIEW:
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
        reviewsSearchSource: [action.payload, ...state.reviews],
      };
    case types.SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
