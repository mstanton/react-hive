'use strict';

/**
 * Epics
 * Module Definition
 *
 */

import { combineEpics } from 'redux-observable';
import fetchEpic from './app/fetchEpic';
export { ajax } from 'rxjs/observable/dom/ajax';

/**
 * Module Export
 *
 */

export default combineEpics(
  fetchEpic
);