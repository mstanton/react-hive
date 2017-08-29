'use strict';

/**
 * Module Definition
 *
 */

import { SET_CONFIG } from '../../actions/app/ActionTypes';
import createReducer from './createReducer';

const initialState = {};

/**
 * action handlers map ActionTypes to case functions
 * 
 */

const actionHandlers = {
  [SET_CONFIG]: (state, action) => {
    return parseConfig(action.payload);
  }
};

/**
 * parse the fetched config
 *
 */

const parseConfig = (payload) => {
  return (payload.error) ? {} : { ...payload.config };
};

/**
 * Module Export
 *
 */

export default createReducer(initialState, actionHandlers);
