'use strict';

/**
 * Module Definition
 *
 */

import { VIEW_CHANGE } from './reducer';

/**
 * Class Definition
 *
 */

class ResponsiveView {
  constructor({ views, store }) {
    this.views = views;    
    this.store = store;
    this.mediaQueryList = null;

    this.tryMatchMedia = this.tryMatchMedia.bind(this);
    this.tryMatchMedia();
  }

  /**
   * isMobile
   *
   */

  isMobile(view) {
    return (view === 'XS' || view === 'SM') ? true : false;
  }

  /**
   * tryMatchMedia
   *
   */

  tryMatchMedia() {
    this.dispose();
    this.mediaQueryList = this.getMediaQueryList();
    this.mediaQueryList.query.addListener(this.tryMatchMedia);
    this.update();
  }

  /**
   * getMediaQueryList
   *
   */

  getMediaQueryList() {
    return Object.keys(this.views).reduce(function(accum, view) {
      let query = window.matchMedia(this.views[view]);
      if (query.matches) accum = { query, view };
      return accum;
    }.bind(this), {});
  }

  /**
   * update
   *
   */

  update() {  
    const { view } = this.mediaQueryList;

    this.store.dispatch({
      type: VIEW_CHANGE,
      payload: {
        isMobile: this.isMobile(view),
        view
      }
    });
  }

  /**
   * dispose
   *
   */

  dispose() {
    if (!this.mediaQueryList) return;
    this.mediaQueryList.query.removeListener(this.tryMatchMedia);
    this.mediaQueryList = null;
  }
};

/**
 * Module export
 *
 */

export default ResponsiveView;
