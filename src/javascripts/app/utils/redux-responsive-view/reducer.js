'use strict';

/**
 * Private action types reserved for this implementation.
 * 
 */

export const VIEW_CHANGE = '@@responsive/VIEW_CHANGE';

const initialState = {
  isMobile: null,
  view: null
};

/**
 * This reducer will...
 * 
 */

export const responsiveViewReducer = function(state = initialState, action) {
  if (action.type === VIEW_CHANGE) {
    return action.payload;
  }
  return state;
}
