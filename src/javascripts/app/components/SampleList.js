'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Attribute from '../components/Attribute';

/**
 * Display Simple List
 *
 */

const SimpleList = (props) => {
  return (
    <ul>
      <li><Link to="/"><Attribute value="components.sample_list.home" /></Link></li>
      <li><Link to="/aboutus"><Attribute value="components.sample_list.about_us" /></Link></li>
      <li><Link to="/clock"><Attribute value="components.sample_list.clock" /></Link></li>
    </ul>
  );
}

/**
 * Module Export
 *
 */

export default SimpleList;
