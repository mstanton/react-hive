'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Display header
 *
 */

const Header = (props) => {
  return (
    <header>
      <div className="logo">
        <Link to="/"><img src="../images/hive-logo.jpg" alt="HIVE" /></Link>
      </div>
    </header>
  );
}

/**
 * Module Export
 *
 */

export default Header;
