// import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from './rootReducer';
// import { HYDRATE, createWrapper } from 'next-redux-wrapper';

// const reducer = (state = {}, action) => {
//   if (action.type === HYDRATE) {
//     return {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     }
//   } else {
//     return rootReducer(state, action)
//   }
// }
// const bindMiddleware = (middleware) => {
// 	if (process.env.NODE_ENV !== 'production') {
// 		return composeWithDevTools(applyMiddleware(...middleware))
// 	}
// 	return applyMiddleware(...middleware)
// }

// const makeStore = () => createStore(
// 	reducer, bindMiddleware([]));
// const wrapper = createWrapper(makeStore);
// export default wrapper;

import { useMemo } from 'react'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import thunkMiddleware from 'redux-thunk'
import reducers from './root-reducer';

let store

function initStore(initialState) {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools()
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}