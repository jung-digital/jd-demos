/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

// Import Paper.js Once
import paper from '../node_modules/paper/dist/paper-full.js';
import PIXI from '../bower_components/pixi.js/bin/pixi.js';
import gl from '../bower_components/gl-matrix/dist/gl-matrix-min.js';

window.paper = paper;
window.PIXI = PIXI;
window.gl = gl;

// Import everything else that uses ES6
import 'babel/polyfill';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import router from './router';
import Dispatcher from './core/Dispatcher';
import Location from './core/Location';
import ActionTypes from './constants/ActionTypes';

let curPath = '/';

// requestAnimationFrame polyfill
(function() {
  var w = window,
    foundRequestAnimationFrame = w.requestAnimationFrame ||
    w.webkitRequestAnimationFrame || w.msRequestAnimationFrame ||
    w.mozRequestAnimationFrame || w.oRequestAnimationFrame ||
    function(cb) {
      setTimeout(cb, 1000 / 60);
    };
  window.requestAnimFrame = foundRequestAnimationFrame;
}());

const pathHistory = [],
  container = document.getElementById('app'),
  context = {
    onSetTitle: value => document.title = value,
    onSetMeta: (name, content) => {
      // Remove and create a new <meta /> tag in order to make it work
      // with bookmarks in Safari
      let elements = document.getElementsByTagName('meta');
      [].slice.call(elements).forEach((element) => {
        if (element.getAttribute('name') === name) {
          element.parentNode.removeChild(element);
        }
      });
      let meta = document.createElement('meta');
      meta.setAttribute('name', name);
      meta.setAttribute('content', content);
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  };

// Run the application when both DOM is ready
// and page content is loaded
new Promise(resolve => {
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', resolve);
    window.addEventListener('popstate', handlePopState);
  } else {
    window.attachEvent('onload', resolve);
    window.attachEvent('popstate', handlePopState);
  }
}).then(() => FastClick.attach(document.body)).then(run);

function run() {
  router.dispatch({
    path: window.location.pathname,
    context
  }, (state, component) => {
    ReactDOM.render(component, container, () => {
      let css = document.getElementById('css');
      css.parentNode.removeChild(css);
    });
  });

  Dispatcher.register(action => {
    if (action.type === ActionTypes.CHANGE_LOCATION) {
      pathHistory.push(curPath);

      goWestYoungMan(action);

      curPath = action.path;
    }

    if (action.type === ActionTypes.BACK_LOCATION) {
      var pathPrev = pathHistory.pop();
      if (pathPrev)
        goWestYoungMan({
          type: ActionTypes.CHANGE_LOCATION,
          path: pathPrev
        });
      curPath = pathPrev;
    }

    function goWestYoungMan(action) {
      router.dispatch({
        path: action.path,
        context
      }, (state, component) => {
        ReactDOM.render(component, container);
      });
    }
  });
}

function handlePopState(event) {
  Dispatcher.dispatch({
    type: ActionTypes.BACK_LOCATION
  });

  Location.navigateTo(window.location.pathname, {
    replace: !!event.state
  });
}