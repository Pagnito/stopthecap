let init = {
  policies: {
    termsOfService: {
      title: null,
      body: null,
      handle: null
    },
    privacyPolicy: {
      title: null,
      body: null,
      handle: null
    },
    refundPolicy: {
      title: null,
      body: null,
      handle: null
    },
    shippingPolicy: {
      title: null,
      body: null,
      handle: null
    }
  }
};

const infoReducer = (state = init, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default infoReducer;
