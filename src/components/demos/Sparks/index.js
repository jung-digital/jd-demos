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
    paper.project.activeLayer.addChild(path);

    path.strokeColor = spark.options.color.clone();
    path.strokeColor.alpha = ratio * 0.5;
    path.strokeWidth = 6 * ratio;
    path.strokeCap = 'butt';
  }

  componentDidMount() {
    super.componentDidMount();

    var canvas = document.getElementById('sparkCanvas');

    paper.setup(canvas);

    this.background = new paper.Path.Rectangle(paper.view.bounds);
    this.background.fillColor = new paper.Color(0,0,0);

    this.sparks = [];

    for (var i = 0; i < SPARKS; i++)
      this.sparks.push(new Spark({
          color: new paper.Color(Math.random(), Math.random(), Math.random(), 1),
          pathRedraw: this.pathRedraw,
          sparkResolution: 10
        }));

    paper.view.onFrame = (event) => {
      this.sparks.forEach(spark => {
        if (!spark.sparking)
        {
          this.startSpark(spark);
        }
        
        spark.onFrame(event);
      });

      paper.view.draw();
    }
  };

  startSpark(spark) {
    spark.spark({
      type: 2,
      onFrameCallback: this.sparkOnFrame,
      position: new paper.Point(WIDTH / 2, HEIGHT / 2)
    });
  }

  // 'this' will be the Spark object itself.
  sparkOnFrame() {
    this.next(new paper.Point(Math.random() * 800, Math.random() * 600));
  }

  render() {

    return <div className="Spark">
        <div className="demo-container">
          {this.getBackButton()}
          <div className="title">Spark</div>
          <div className="description"></div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Sparks/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, Paper.js, React.js, Gravity</div>
          {this.getCanvasContainer(WIDTH, HEIGHT, 'sparkCanvas')}
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