/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './MenuPage.css';
import withStyles from '../../decorators/withStyles';
import demos from '../../components/demos/Demos.js';
import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';

class DemoLink {
  demo_onClickHandler(event) {
    Dispatcher.dispatch({
      type: ActionTypes.CHANGE_LOCATION,
      path: '/demo/' + this.props.demo.key
    }); 
  };

  render() {
    return (<div className="DemoLink" id={this.props.demo.name} onClick={this.demo_onClickHandler.bind(this)}>
              <img src={this.props.demo.image} className="image" />
              <div className="content">
                <div className="title">{this.props.demo.name} </div>
                <div className="description">{this.props.demo.description}</div> 
              </div>
           </div>);
  }
};

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
    this.context.onSetTitle(this.props.title);

    var demosHTML = [];

    for (var key in demos) demosHTML.push(
        <DemoLink demo={demos[key]} key={key}/>
      );

    return (
      <div className="MenuPage">
        <div className="MenuPage-container">
          {demosHTML}
        </div>
      </div>
    );
  }
};

export default MenuPage;
