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
const SPARKS = 60,
      WIDTH = 800,             // Width of canvas
      HEIGHT = 600;            // Height of canvas

/*============================================
 * The demo JSX component
 *============================================*/
@withStyles(demoStyles)
class SparkDemo extends DemoBase {
  constructor(props) {
    super(props);

    this.lastTime = 0;
    this.gravity = new paper.Point(0, 980);

    this.sparkSource = new paper.Point(WIDTH / 2, HEIGHT / 5);
  }

  pathRedraw(spark, path, ratio) {
    ratio = 1 - ratio;

    paper.project.activeLayer.addChild(path);

    path.strokeColor = spark.options.color.clone();
    path.strokeColor.alpha = ratio;
    path.strokeWidth = 2 * ratio;
    path.strokeCap = 'butt';
  }

  componentDidMount() {
    super.componentDidMount();

    this.canvas = document.getElementById('sparkCanvas');

    paper.setup(this.canvas);

    this.background = new paper.Path.Rectangle(paper.view.bounds);
    this.background.fillColor = new paper.Color(0,0,0);

    this.sparks = [];

    for (var i = 0; i < SPARKS; i++)
      this.sparks.push(new Spark({
          color: new paper.Color(Math.random(), Math.random(), Math.random(), 1),
          pathRedraw: this.pathRedraw,
          sparkResolution: 8
        }));

    paper.view.onFrame = (event) => {
      if (!this.lastTime)
      {
        this.lastTime = new Date().getTime();
        this.elapsed = 0.01;
      }
      else
      {
        this.elapsed = (new Date().getTime() - this.lastTime) / 1000;
      }

      this.sparks.forEach(spark => {
        if (!spark.sparking)
        {
          this.startSpark(spark);
        }

        this.sparkOnFrame.call(spark, this);
        spark.onFrame(event);
      });

      this.lastTime = new Date().getTime();

      paper.view.draw();
    }
  };

  startSpark(spark) {
    var ranAngle = (Math.random() * 3) - 1.5 - (Math.PI / 2);

    spark.spark({
      type: 2,
      position: this.sparkSource,
      velocity: new paper.Point(Math.cos(ranAngle), Math.sin(ranAngle)).multiply(Math.random() * 400 + 100)
    });
  }

  // 'this' will be the Spark object itself.
  sparkOnFrame(demo) {
    this.options.velocity = this.options.velocity.add(demo.gravity.multiply(demo.elapsed));
    var nextPos = this.options.velocity.multiply(demo.elapsed).add(this.position);
    this.next(nextPos);

    if (nextPos.y > HEIGHT + 50)
    {
      this.reset();
    }
  }

  onMouseMoveHandler(event) {
    var rect = this.canvas.getBoundingClientRect();

    this.sparkSource = new paper.Point(event.clientX - rect.left, event.clientY - rect.top);
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