/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';
import util from '../shared/util/util';
import Dispatcher from '../../../core/Dispatcher';
import DemoBase from '../DemoBase';

/*============================================
 * The demo JSX component
 *============================================*/
@withStyles(demoStyles)
class EmberDemo extends DemoBase {
  constructor(props) {
    super(props);

    this.canvasContainerClass = 'canvas-container-sky';
  }

  componentDidMount() {
    super.componentDidMount();

    this.canvas = document.getElementById('sparkCanvas');
  };

  render() {
    return <div className="Spark">
        <div className="demo-container">
          {this.getBackButton()}
          <div className="title">Ember</div>
          <div className="description">Move your mouse around to change the source of the burning embers.</div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Embers/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, React.js, native Canvas</div>
          <div className="controls"></div>
          {this.getFillCanvasContainer(800, 800 / 1.61, 'sparkCanvas')}
        </div>
      </div>;
  }

  jungleLoadedHandler() {
    this.renderer = new Jungle.GraphicRenderer(this.canvas, {
      debug: true,
      canvasAutoClear: true,
      resizeToCanvas: true
    });

    this.starField = new Starfield({
      starDensity: 1
    }, 'starfield');

    this.renderer.addChild(this.starField);

    this.embers = new Embers({
      sparkCount: 150,
      maxSparkSize: 2.5,
      minSparkSize: 1.0,
      maxSparkVelocity: 110,
      minSparkVelocity: 30,
      maxSparkLife: 25,
      maxTailLength: 22
    });

    this.renderer.addChild(this.embers);
  }
}

export default {
  name: 'Embers',
  key: 'embers',
  author: 'Thomas',
  technologies: [],
  image: 'embers.png',
  description: 'Ember particle effect, customizable to any physics engine',
  component: EmberDemo
};
