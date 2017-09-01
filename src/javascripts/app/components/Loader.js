'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import { isEqual } from '../utils';

/**
 * Class Definition
 *
 */

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * on mount of component
   *
   */

  componentDidMount() {

  }

  /**
   * on update of component
   *
   */

  componentDidUpdate(prevProps, prevState) {

  }

  /**
   * render the loader
   *
   */

  render() {  
    console.log( this.props );
    
    return (    
      <div>Loading...</div>
    )
  }
};

/**
 * Module Export
 *
 */

export default Loader;
