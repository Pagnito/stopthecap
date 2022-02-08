let init = {
  searchVisible: false,
};

const appReducer = (state = init, action) => {
  switch (action.type) {
    case "TOGGLE_SEARCH":
      return {
        ...state,
        searchVisible: state.searchVisible ? false : true,
      };
    default:
      return state;
  }
};

export default appReducer;
