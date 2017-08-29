'use strict';

/*
 * Module Definition
 *
 */

export { isEqual } from 'lodash.isequal';

/*
 * transform supplied string to be camelCased
 *
 */

export const camelize = (str) => {
  return str.toLowerCase().split('_').map(function(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
};

/*
 * transform class name object into class name string
 *
 */

export const getClassNames = (classNames) => {
  const getClassName = (classes, name) => {
    if (classNames[name]) classes += name + ' ';
    return classes;
  };

  return Object
    .keys(classNames)
    .reduce(getClassName, '')
    .trim();
};

/* 
 * get the given display name of a component
 * 
 */

export const getComponentDisplayName = (Component) => {
  return Component.displayName || Component.name || 'Component';
};

/*
 * normalize a chunk of data with a given schema
 * 
 * (in this example properties on the left will be transformed to provide value)
 * (all properties will be transofrmed to camel case)
 * 
 * const scheme = {
 *   distance    : 'dist',
 *   coordinates : 'coords'
 * };
 *
 * normalizeData(scheme);
 * 
 */

export const normalizeData = ({ data, schema }) => {
  const toLowerCase = (str) => {
    return (str.charAt(0).toLowerCase() + str.slice(1) || str).toString();
  };

  const normalize = (obj) => {
    const getArr = (newArr, item) => {
      let value = item;

      if (value.constructor === Object || value.constructor === Array) value = normalize(value);
      newArr.push(value);
      return newArr;
    };

    const getObj = (newObj, prop) => {
      let newProp = toLowerCase(prop);
      let value = obj[prop];

      if (schema[newProp] !== undefined) newProp = schema[newProp];

      newObj[newProp] = (value !== null && (value.constructor === Object || value.constructor === Array)) ? normalize(value) : value;
      return newObj;
    };

    if (obj instanceof Array) {
      return obj
        .reduce(getArr, []);
    } else {
      return Object
        .keys(obj)
        .reduce(getObj, {});
    }
  };

  return data.reduce((newArr, item) => {  
    newArr.push(normalize(item));
    return newArr;
  }, []);
};
