import types from '../actions/product/product-types'
let init = {
  features: null,
  productPage: {
    product: null,
    selectedVariant: null,
    reviews: []
  },
  productCard: {
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
  if(!selectedVariant){
    selectedVariant= variants.find(({node}) => {
      let optionIndex = node.selectedOptions.findIndex(option => option.name.toLowerCase() === variantOption.name.toLowerCase())
      return node.selectedOptions[optionIndex].value.toLowerCase() === variantOption.value.toLowerCase();
    })
  }
  return selectedVariant.node
}
const productReducer = (state = init, action) => {
  switch (action.type) {
    case types.PDP_SELECT_VARIANT:
      let currentSelectedOptionsPDP = state.productPage.selectedVariant.selectedOptions;
      let variantsPDP = state.productPage.product.variants.edges;
      return {
        ...state,
        productPage: Object.assign(state.productPage, {
          selectedVariant: selectVariant(currentSelectedOptionsPDP, variantsPDP, action.payload),
        }),
      };
    // case "PC_SELECT_VARIANT": 
    //   // let productsWithEditedOptions = state.productCard.productsWithEditedOptions;
    //   // let newProduct = productsWithEditedOptions.find((product) => product.id === action.payload.product.id);
    //   let variantsPC = action.payload.product.variants.edges;
    //   let currentSelectedOptionsPC = state.productCard.selectedVariant && action.payload.product.id === state.productCard.selectedProduct.id ? 
    //   state.productCard.selectedVariant.selectedOptions : action.payload.product.variants.edges[0].node.selectedOptions;
    //   return {
    //     ...state,   
    //     productCard: {
    //       selectedProduct: action.payload.product,
    //       selectedVariant: selectVariant(currentSelectedOptionsPC, variantsPC, action.payload.variantOption),
    //     },
    //   };
    case types.ADD_REVIEW:  
      return {
        ...state,
        productPage: Object.assign({reviews: [...state.productPage.reviews, action.payload]}, state.productPage)
      }
    default:
      return state;
  }
};

export default productReducer;
