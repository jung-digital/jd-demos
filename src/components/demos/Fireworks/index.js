/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';
import Dispatcher from '../../../core/Dispatcher';
import DemoBase from '../DemoBase';

/*============================================
 * The demo JSX component
 *============================================*/
@withStyles(demoStyles)
class FireworksDemo extends DemoBase {
  constructor(props) {
    super(props);

    this.canvasContainerClass = 'canvas-container-sky';
  }

  componentDidMount() {
    super.componentDidMount();

    this.canvas = document.getElementById('fireworkCanvas');
  };

  render() {
    return <div>
        <div className="demo-container">
          {this.getBackButton()}
          <div className="title">Fireworks</div>
          <div className="description">Click around to launch fireworks!</div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Sparks/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, Paper.js, React.js, Gravity</div>
          {this.getFillCanvasContainer(this.state.WIDTH, this.state.HEIGHT, 'fireworkCanvas')}
        </div>
      </div>;
  }

  jungleLoadedHandler() {
    this.renderer = new Jungle.GraphicRenderer(this.canvas, {
      debug: true,
      mouseEnabled: true,
      resizeToCanvas: true
    });

    this.starField = new Starfield({
      starDensity: 2
    }, 'starfield');

    this.renderer.addChild(this.starField);

    this.fireworks = new window.Fireworks({
    }, 'fireworks');

    this.renderer.addChild(this.fireworks);
  }
}

export default {
  name: 'Fireworks',
  key: 'fireworks',
  author: 'Josh',
  technologies: [],
  image: 'fireworks.png',
  description: 'Launch fireworks in your browser',
  component: FireworksDemo
};
