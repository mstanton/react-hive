'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/shared/Loader';

/**
 * render the default layout
 *
 */

export const DefaultLayout = (props) => {
  // slice off the isFetching state for fetch
  const { isFetching } = props.children.props.data; // kinda smelly

  return (
    <div>
     <Header />
     <Loader { ...isFetching }/>
      <main className="container">
        { props.children }
      </main>
      <Footer />
    </div>
  );
}
