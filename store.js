import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import api from './src/middleware/api';

import reducers from './src/rootReducer'; //Import the reducer

// const persistedState = AsyncStorage.;

// Connect our store to the reducers
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(
  reducers,
  // persistedState,
  composeWithDevTools(applyMiddleware(thunk, api))
);
