'use strict';

/**
 * Reducers
 * Module Definition
 *
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { responsiveViewReducer } from '../../utils/redux-responsive-view';
import configReducer from './app/configReducer';
import isFetchingReducer from './app/isFetchingReducer';
import clockReducer from './app/clockReducer'

/**
 * Module Export
 *
 */

export default combineReducers({
  config: configReducer,
  isFetching: isFetchingReducer,
  router: routerReducer,
  responsiveView: responsiveViewReducer,
  clock: clockReducer
});
