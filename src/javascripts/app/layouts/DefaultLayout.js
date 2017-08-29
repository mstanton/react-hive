'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * render the default layout
 *
 */

export const DefaultLayout = (props) => {
  return (
    <div>
      <Header />
      <main className="container">
        { props.children }
      </main>
      <Footer />
    </div>
  );
}
