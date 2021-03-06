'use strict';

/**
 * Module Definition
 *
 */

import { FETCH_START, FETCH_END } from '../../actions/app/ActionTypes';
import createReducer from './createReducer';

const initialState = [];

/**
 * action handlers map ActionTypes to case functions
 * 
 */

const actionHandlers = {  
  [FETCH_START]: (state, action) => {
    return {
      ...state,
      isFetching: true
    }  
  }, 
  [FETCH_END]: (state, action) => {
    return {
      ...state,
      isFetching: false
    }
  }
};

/**
 * Module Export
 *
 */

export default createReducer(initialState, actionHandlers);
