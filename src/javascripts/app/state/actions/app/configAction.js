'use strict';

/**
 * Module Definition
 *
 */

import { FETCH, SET_CONFIG } from './ActionTypes';
import { CONFIG_PATH } from '../../../index'

/**
 * fetch the application configuration
 * 
 */

export const fetchConfig = (...args) => {
  return {
    type: FETCH,
    meta: { type: SET_CONFIG, path: './config' },
    payload: args
  }
};
