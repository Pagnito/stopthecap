let init = {
    features: {},
    pdp: {
      selectedVariant: {}
    }
  }
  
const productReducer = (state = init, action) => {
    switch (action.type) {
      case 'PDP_SELECTED_VARIANT':
        console.log('dfuk', action.payload)
        let selectedVariant = state.pdp.product.data.productByHandle.variants.edges.find(({node}) => {
          return node.selectedOptions[0].value == action.payload.color && node.selectedOptions[1].value == action.payload.size
        })
        // console.log('dfuk', state.pdp.product.data.productByHandle.variants.edges.length)
        selectedVariant = selectedVariant.node;
        selectedVariant.index = action.payload.colorIndex;
        return {
          ...state,
          pdp: Object.assign(state.pdp, { selectedVariant: selectedVariant })
        }
      case 'PDP_PRODUCT':
        return {
          ...state,
          pdp: Object.assign(state.pdp, { product: action.payload })
        }
      case 'FEATURED_PRODUCTS':
        return {
          ...state,
          features: Object.assign(state.features, { topProducts: action.payload })
        }
      default:
        return state
    }
  }

  export default productReducer;