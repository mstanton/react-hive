'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import PropTypes from "prop-types";
import { Link, Route } from 'react-router-dom';

/**
 * Class Definition
 * TODO: This could be converted to a Function vs Class
 * 
 */

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * render the page
   *
   */

  render() {
    const { content: Content, layout: Layout, path, ...props } = this.props;
    return (props.data.config) ? (
      <Route exact path={ path } render={ route => (
        <Layout>
          <Content { ...props } { ...{ route } } />
        </Layout>
      )} />
    ) : null;
  }
};

/**
 * Module Export
 * 
 */

export default Page;
