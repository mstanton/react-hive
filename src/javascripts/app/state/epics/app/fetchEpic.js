'use strict';

/**
 * Module Definition
 *
 */

import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/dom/ajax';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil'; 

import { FETCH, FETCH_START, FETCH_END, FETCH_CANCEL, } from '../../actions/app/ActionTypes';
import { fetchStart, fetchEnd } from '../../actions/app/fetchAction';

/**
 * generic observable to support fetching, pre and post fetch events
 *
 */

const fetchEpic = (action$, store, { getJSON }) => {
  return action$.ofType(FETCH)
    .switchMap((action) => {
      return Observable.of(fetchStart(action))
        .concat(
          getJSON(action.meta.path)
          // mockFetch(action.meta.path)
            .map(payload => ({ 
              type: action.meta.type, payload, meta: action.meta 
            }))
            .takeUntil(action$.ofType(FETCH_CANCEL))
            .catch(error => Observable.of({
              type: action.meta.type, payload: error, error: true, meta: action.meta
            }))
        )
        .concat(
          Observable.of(fetchEnd(action))
        )
    });
};

/**
 * Module Export
 *
 */

export default fetchEpic;
