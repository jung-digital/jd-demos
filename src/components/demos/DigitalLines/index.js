/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import Wire from './wire';
import Spark from './spark';
import styles from './index.css';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';
import util from '../util/util';

const WIRES = 1,               // Total wires to generate for sparks to run along
      SPARKS = 1,              // Maximum sparks to run at a time
      SPARK_VEL = 500,          // Velocity of each spark
      SPARK_PROB_SECOND = 1.0, // Probability of a spark per second
      WIDTH = 800,             // Width of canvas
      HEIGHT = 600;            // Height of canvas

/*============================================
 * The actual demo JSX component
 *============================================*/
@withStyles(styles)
@withStyles(demoStyles)
class DigitalSparkDemo {

  static propTypes = {
  };

  onFrame(event) {
    this.sparks.forEach(s => {
      if (s.sparking) return;

      var prob = SPARK_PROB_SECOND * event.delta,
          shouldSpark = Math.random() < prob;

      if (shouldSpark)
      {
        var wire = util.ranItem(this.wires);
        s.spark(wire.path, SPARK_VEL);
      }
    })
  };

  canvasRender() {

  };

  pathCallback(position, history, cachedPath) {
    var path = cachedPath || new paper.Path();

    path.removeSegments();

    path.add(history[history.length-1]);
    path.add(history[history.length-2]);

    path.strokeColor = 'green';
    path.strokeWidth = 5;

    return path;
  }

  componentDidMount() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('digitalLinesCanvas');

    this.wires = [];
    this.sparks = [];

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    for (var i = 0; i < WIRES; i++)
      this.wires.push(new Wire({
          bounds: {left: 0, right: WIDTH, top: 0, bottom: HEIGHT},
          path: new paper.Path({
            strokeColor: 'blue',
            strokeWidth: 1
          }),
          autoGen: true
        }));

    for (var i = 0; i < SPARKS; i++)
      this.sparks.push(new Spark({pathCallback: this.pathCallback}));

    paper.view.onFrame = (event) => {
      this.onFrame(event);
      this.sparks.forEach(s => s.onFrame(event));

      paper.view.draw();
    }
  };

  render() {

    return <div className="DigitalLines">
        <div className="demo-container">
          <div className="title">Digital Spark Demo</div>
          <div className="description">Position your mouse to create a gravitational field to affect the comet trajectory.</div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Comet/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, Paper.js, React.js, Law of Universal Gravitation</div>
          <div className="canvas-container">
            <canvas className="demo-canvas" style={{width:WIDTH, height:HEIGHT}} id="digitalLinesCanvas" />
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