'use strict';

/**
 * Private action types reserved for this implementation.
 * 
 */

import ResponsiveView from './ResponsiveView';

/**
 * Set the imported views map with the default options
 * 
 */

const defaultOptions = {
  views: {
    XS: 'screen and (max-width: 767px)',
    SM: 'screen and (min-width: 768px) and (max-width: 991px)',
    MD: 'screen and (min-width: 992px) and (max-width: 1199px)',
    LG: 'screen and (min-width: 1200px)'
  }
};

/**
 * instantiate the ResponsiveView class passing the views map and redux store
 * return the next action
 * 
 */

export const createResponsiveViewMiddleware = function(newOptions) {
  let options = newOptions || defaultOptions;

  if (!options.views) {
    throw new TypeError('You must provide a views map that includes your responsive view queries');
  }

  const responsiveViewMiddleware = function responsiveViewMiddleware(store) {    
    const responsiveView = new ResponsiveView({ ...options, store });
    
    return next => action => {
      return next(action);
    } 
  };
  
  return responsiveViewMiddleware;
};
