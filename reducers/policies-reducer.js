import types from '../actions/policies/policies-types'
let init = {
  privacy: null,
  shipping: null,
  terms: null,
  returns: null
};

const appReducer = (state = init, action) => {
  switch (action.type) {
    case types.SET_POLICIES:
      return action.payload
    default:
      return state;
  }
};

export default appReducer;
