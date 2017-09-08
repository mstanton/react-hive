'use strict';

/**
 * Module Definition
 *
 */
import React from 'react';
import { connect } from 'react-redux';
import Main from './Main';

import { bindActionCreators } from 'redux';
import * as actions from '../state/actions/index';

/**
 * map the redux state to react props
 *
 */

const mapStateToProps = (state) => {
  return {
    config: state.config,
    isFetching: state.isFetching,
    location: state.router.location,
    view: state.responsiveView,
    clock: state.clock
  }
};

/**
 * map bound action creators to react props 
 *
 */

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

/**
 * modify redux state and bound action creators before passing through to react props
 * (current implmentation is merely a pass through demonstrating the functionality)
 *
 */

const mergeProps = (propsFromState, propsFromDispatch) => {
  return {
    data: { ...propsFromState },
    actions: { ...propsFromDispatch }
  };
};

/**
 * create a higher order component (HOC) that links the redux store to the react props 
 *
 */

const App = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Main);

/**
 * Module Export
 *
 */

export default App;
