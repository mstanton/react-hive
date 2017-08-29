'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import getProp from '@f/get-prop';

/**
 * Class Definition
 *
 */

class Attribute extends React.Component {
  constructor(props, context) {
    super(props);
    
    this.store = props.store || context.store;
    this.isValid = false;

    this.renderAttr = this.renderAttr.bind(this);
    this.renderInvalidAttr = this.renderInvalidAttr.bind(this);
  }

  /**
   * before mount of component
   *
   */

  componentWillMount() {
    let config = this.store.getState().config;
    if (!config) return;

    let locale = config.locale;
    let attrs = config.attributes;
    if (!locale || !attrs) return;

    this.attrs = attrs;
    this.path = `${ this.props.value }.${ locale }`;
    if (!!this.attribute) this.isValid = true;
  }

  /**
   * before mount of component
   *
   */

  get attribute() {
    const attr = getProp(this.path, this.attrs);
    return (!!attr) ? attr : false;
  }

  /**
   * render the a valid attribute
   *
   */

  renderAttr() {
    return React.createElement(this.props.tag, {}, getProp(this.path, this.attrs)); 
  }

  /**
   * render the a valid attribute
   *
   */

  renderInvalidAttr() {
    return React.createElement(this.props.tag, {}, Attribute.NotFound); 
  }

  /**
   * render
   *
   */

  render() {
    return (this.isValid) ? this.renderAttr() : this.renderInvalidAttr();
  }

  /**
   * static Not Found
   *
   */

  static NotFound = 'ATTRIBUTE_NOT_FOUND';
};

/**
 * context types
 *
 */

Attribute.contextTypes = {
  store: PropTypes.object
};

/**
 * default props
 *
 */

Attribute.defaultProps = {
  tag: 'span'
};

/**
 * Module Export
 *
 */

export default Attribute;