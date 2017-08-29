'use strict';

/**
 * Module Definition
 *
 */

import React from 'react';
import Attribute from '../components/Attribute';

/**
 * display footer
 *
 */

const Footer = (props) => {
  return (
    <footer>
      <p className="social-icons">
        <a href="https://twitter.com/">
          <span className="sprite sprite-uEA03-twitter">
            <svg viewBox="0 0 1 1"><use xlinkHref="images/icons.svg#uEA03-twitter" />
              <Attribute value="components.footer.twitter" tag="desc" />
            </svg>
          </span>
        </a>
        <a href="https://www.facebook.com/">
          <span className="sprite sprite-uEA01-facebook">
            <svg viewBox="0 0 1 1"><use xlinkHref="images/icons.svg#uEA01-facebook" />
              <Attribute value="components.footer.facebook" tag="desc" />
            </svg>
          </span>
        </a>
        <a href="https://instagram.com/">
          <span className="sprite sprite-uEA02-instagram">
            <svg viewBox="0 0 1 1"><use xlinkHref="images/icons.svg#uEA02-instagram" />
              <Attribute value="components.footer.instagram" tag="desc" />
            </svg>
          </span>
        </a>
      </p>
    </footer>
  );
}

/**
 * Module Export
 *
 */

export default Footer;
