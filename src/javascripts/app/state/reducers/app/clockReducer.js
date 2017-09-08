'use strict';

/**
 * Module Definition
 */

import { UPDATE_CLOCK_TIME } from '../../actions/app/ActionTypes';
import createReducer from './createReducer';

const initialState = {};

/**
 * action handlers map ActionTypes to a functions
 * note: since it is only one action we don't use a switch
 */

const actionHandlers = {  

  [UPDATE_CLOCK_TIME]: (state, action) => {
    return {
        ...state,
        timeString: action.timeString,
        hourDegrees: action.hourDegrees, 
        minDegrees: action.minDegrees, 
        totalDegrees: action.totalDegrees
    }  
  
}
};


export default createReducer(initialState, actionHandlers);