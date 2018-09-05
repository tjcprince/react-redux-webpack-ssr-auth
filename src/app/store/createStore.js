import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import authMiddleware from '../utils/AuthMiddleware';

import combineReducers from './reducer';

export default (initialState = {}) => {
  const middlewares = [authMiddleware, apiMiddleware, thunk];

  const enhancers = [];

  // if (process.env.NODE_ENV === 'development') {
  //   const devToolsExtension = window.devToolsExtension;
  //   if (typeof devToolsExtension === 'function') {
  //     enhancers.push(devToolsExtension());
  //   }
  // }

  const store = createStore(
    combineReducers,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      /* eslint-disable global-require */
      const createNextReducer = require('./reducer');
      const nextReducer = createNextReducer();

      store.replaceReducer(nextReducer);
    });
  }
  return store;
};
