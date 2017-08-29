'use strict';

/**
 * Module Definition
 *
 */

import { FETCH_START, FETCH_END, FETCH_CANCEL } from './ActionTypes';

/**
 * return action on start of fetch 
 * 
 */ 

export const fetchStart = (action) => {
  return { 
    type: FETCH_START, 
    payload: action.payload, 
    meta: action.meta 
  }
};

/**
 * return action on end of fetch 
 * 
 */ 

export const fetchEnd = (action) => {
  return { 
    type: FETCH_END, 
    payload: action.payload, 
    meta: action.meta 
  }
};

/**
 * return action on cancel of fetch
 * 
 */ 

export const fetchCancel = () => {
  return {
    type: FETCH_CANCEL
  }
};
