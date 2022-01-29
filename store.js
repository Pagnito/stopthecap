import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

const reducer = (state = {}, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
  } else {
    return rootReducer(state, action)
  }
}
const bindMiddleware = (middleware) => {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools(applyMiddleware(...middleware))
	}
	return applyMiddleware(...middleware)
}

const makeStore = () => createStore(
	reducer, bindMiddleware([]));
const wrapper = createWrapper(makeStore);
export default wrapper;
