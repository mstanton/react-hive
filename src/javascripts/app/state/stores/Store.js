'use strict';

/**
 * Module Definition
 *
 */

import { createStore, compose, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';

import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import { createResponsiveViewMiddleware } from '../../utils/redux-responsive-view';

import rootEpic, { ajax } from '../epics';
import rootReducer from '../reducers';
export const history = createHistory();

// set the store initial state object
const initialState = {
  config: null
};

// instantiate the redux-obseravable middleware with injected dependencies (ajax)
const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: { getJSON: ajax.getJSON }
});

// instantiate the redux-responsive-view middleware with dependencies ()
const responsiveViewMiddleware = createResponsiveViewMiddleware();

// group all middleware into array
const middleware = [
  routerMiddleware(history),
  responsiveViewMiddleware,
  thunkMiddleware,
  epicMiddleware
];

// enable redux dev tool when available
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// compose the stores enhancers
const enhancers = composeEnhancer(
  applyMiddleware(...middleware)
);

/**
 * Module Export
 *
 */

export default createStore(
  rootReducer,
  initialState,
  enhancers
);
