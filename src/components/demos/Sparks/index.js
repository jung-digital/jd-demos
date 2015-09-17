/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import Spark from '../shared/spark';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';
import util from '../shared/util/util';
import Dispatcher from '../../../core/Dispatcher';
import DemoBase from '../DemoBase';

/*============================================
 * Constants
 *============================================*/
const SPARKS = 100,
      WIDTH = 800,             // Width of canvas
      HEIGHT = 600;            // Height of canvas

/*============================================
 * The demo JSX component
 *============================================*/
@withStyles(demoStyles)
class SparkDemo extends DemoBase {
  pathRedraw(spark, path, ratio) {
    ratio = (1.0 - (Math.abs(ratio - 0.5) * 2)) * 0.5;

    paper.project.activeLayer.addChild(path);

    path.strokeColor = spark.options.color.clone();
    path.strokeColor.alpha = ratio * 0.5;
    path.strokeWidth = 6 * ratio;
    path.strokeCap = 'butt';
  }

  componentDidMount() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('sparkCanvas');

    this.sparks = [];

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    for (var i = 0; i < SPARKS; i++)
      this.sparks.push(new Spark({
          color: new paper.Color(Math.random(), Math.random(), Math.random(), 1),
          pathRedraw: this.pathRedraw,
          sparkLength: Math.random() * 500 + 300,
          sparkResolution: 10
        }));

    paper.view.onFrame = (event) => {
      this.onFrame(event);
      this.sparks.forEach(s => s.onFrame(event));

      paper.view.draw();
    }
  };

  render() {

    return <div className="Spark">
        <div className="demo-container">
          {this.getBackButton()}
          <div className="title">Spark</div>
          <div className="description"></div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Sparks/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, Paper.js, React.js, Gravity</div>
          <div className="canvas-container">
            <canvas className="demo-canvas" style={{width:WIDTH, height:HEIGHT}} id="sparkCanvas" />
          </div>
        </div>
      </div>;
  }
}

export default {
  name: 'Sparks',
  key: 'sparks',
  author: 'Josh',
  technologies: [],
  image: 'digitalspark.png',
  description: 'Spark particle effect, customizable to any physics engine',
  component: SparkDemo
};