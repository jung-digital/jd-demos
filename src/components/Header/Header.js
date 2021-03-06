/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import styles from './Header.css';
import withStyles from '../../decorators/withStyles';
import Link from '../../utils/Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./logo-white-small.png')} alt="Jung Digital LLC" />
          </a>
          <Navigation className="Header-nav" />
          <div className="Header-banner">
            <h1 className="Header-bannerTitle">Demonstrations</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
