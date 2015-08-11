/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './MenuPage.css';
import withStyles from '../../decorators/withStyles';

var demos = [];

@withStyles(styles)
class MenuPage {

  static propTypes = {
    title: PropTypes.string,
    list: PropTypes.array
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  render() {
    var self = this;
    this.context.onSetTitle(this.props.title);
    return (
      <div className="MenuPage">
        <div className="MenuPage-container">
          {{demos}}
        </div>
      </div>
    );
  }
}

export default MenuPage;
