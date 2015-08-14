/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import Wire from './wire';
import styles from './index.css';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';

const WIRES = 10,
      WIDTH = 800,          // Width of canvas
      HEIGHT = 600;         // Height of canvas

/*============================================
 * The actual demo JSX component
 *============================================*/
@withStyles(styles)
@withStyles(demoStyles)
class DigitalSparkDemo {

  static propTypes = {
  };

  onFrame(event) {

  };

  canvasRender() {

  };

  componentDidMount() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('digitalLinesCanvas'),
        wires = [];

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    for (var i = 0; i < WIRES; i++)
      wires.push(new Wire(1, {left: 0, right: WIDTH, top: 0, bottom: HEIGHT}, new paper.Path({strokeColor: 'blue', strokeWidth: 1}), true ));

    paper.view.onFrame = () => paper.view.draw();
  };

  render() {

    return <div className="DigitalLines">
        <div className="demo-container">
          <div className="title">Digital Spark Demo</div>
          <div className="description">Position your mouse to create a gravitational field to affect the comet trajectory.</div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Comet/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, Paper.js, React.js, Law of Universal Gravitation</div>
          <div className="canvas-container">
            <canvas className="demo-canvas" width={WIDTH} height={HEIGHT} id="digitalLinesCanvas" />
          </div>
        </div>
      </div>;
  }
}

export default {
  name: 'Digital Spark',
  key: 'digitalSparks',
  author: 'Josh',
  technologies: [],
  component: DigitalSparkDemo
};