'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import Attribute from '../components/Attribute';
import SampleList from '../components/SampleList';

/**
 * render home
 *
 */

export const Aboutus = (props) => {  
  return (
    <div>
      <Attribute value="pages.about_us.header" tag="h1" />
      <SampleList />
    </div>
  );
};
