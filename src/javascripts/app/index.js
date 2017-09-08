'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import { render } from 'react-dom';

import store, { history } from './state/stores/store';
import { Provider } from 'react-redux'; // todo: makes use of { connect }
import { ConnectedRouter as Router } from 'react-router-redux';
import App from './containers/App';

// static app constants
export const CONFIG_PATH = '/config';

/**
 * instantiate the react app
 *
 */

const appProvider = () => {
  const rootEl = document.getElementById('root');
  if (!rootEl) return;
  
  const provider = (
    <Provider store={ store }>
      <Router history={ history }>
        <App />
      </Router>
    </Provider>
  );

  return render(provider, rootEl);
};

/**
 * Module Export
 *
 */

export default appProvider;
