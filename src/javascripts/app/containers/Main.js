'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import { Switch } from 'react-router-dom';

import Page from './Page';
import { Home, Aboutus, Clock } from '../pages';
import { DefaultLayout } from '../layouts';

/**
 * Class Definition
 *
 */

class Main extends React.Component {
  constructor(props) {
    super(props);
    props.actions.fetchConfig();
  }

  /**
   * on mount of component
   *
   */

  componentDidMount() {
    // console.log('componentDidMount');
  }

  /**
   * on update of component
   *
   */

  componentDidUpdate() {
    // console.log('componentDidUpdate');  
  }

  /**
   * render the app
   *
   */

  render() {
    return (
      <div>
        <Page content={ Home } layout={ DefaultLayout } { ...this.props } path='/' />
        <Page content={ Aboutus } layout={ DefaultLayout } { ...this.props } path='/aboutus' />
        <Page content={ Clock } layout={ DefaultLayout } { ...this.props } path='/clock' />
      </div>
    )
  }
};

/**
 * Module Export
 * 
 */

export default Main;
