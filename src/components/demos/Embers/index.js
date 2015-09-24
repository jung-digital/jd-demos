/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import Spark from '../shared/spark_raw';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';
import util from '../shared/util/util';
import Dispatcher from '../../../core/Dispatcher';
import DemoBase from '../DemoBase';

/*============================================
 * Constants
 *============================================*/
const SPARKS = 40,
      WIDTH = 800,             // Width of canvas
      HEIGHT = 800 / 1.61;     // Height of canvas

/*============================================
 * The demo JSX component
 *============================================*/
@withStyles(demoStyles)
class EmberDemo extends DemoBase {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.lastTime = 0;
    this.hue = 0;

    this.sparkSource = new paper.Point(WIDTH / 2, HEIGHT / 5);

  }

  pathRedraw(spark, path, ratio) {
    ratio = 1 - ratio;

    paper.project.activeLayer.addChild(path);

    path.strokeColor = spark.options.color.clone();
    path.strokeColor.alpha = ratio;
    path.strokeWidth = spark.options.size * ratio;
    path.strokeCap = 'butt';
  }

  componentDidMount() {
    super.componentDidMount();

    this.canvas = document.getElementById('sparkCanvas');
    // paper.setup(this.canvas);
    console.log(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillRect(0,0,WIDTH, HEIGHT);

    // this.background = new paper.Path.Rectangle(paper.view.bounds);
    // this.background.fillColor = new paper.Color(0,0,0);

    this.sparks = [];

    for (var i = 0; i < SPARKS; i++)
      this.sparks.push(new Spark({
          pathRedraw: this.pathRedraw,
          sparkResolution: 4
        }));

    this.onFrame = (timestamp) => {
      // console.log(timestamp);
      // console.log(new Date().getTime());
      // if (!this.lastTime)
      // {
      //   this.lastTime = new Date().getTime();
      //   this.elapsed = 0.01;
      // }
      // else
      // {
      //   this.elapsed = (new Date().getTime() - this.lastTime) / 1000;
      // }
      this.elapsed = timestamp / 1000;

      this.hue = Math.random()*Math.random()*60;

      this.sparks.forEach(spark => {
        if (!spark.sparking)
        {
          this.startSpark(spark);
        }

        this.sparkOnFrame.call(spark, this);
        spark.onFrame(timestamp);
      });

      this.lastTime = new Date().getTime();

      //paper.view.draw();
      window.requestAnimationFrame(this.onFrame);
    };
      window.requestAnimationFrame(this.onFrame);
  };

  startSpark(spark) {
    var ranAngle = Math.random() - .5 - (Math.PI / 2) ,
        rgb = util.hsvToRgb(this.hue, 1, 0.8);

    spark.spark({
      type: 2,
      size: (Math.random() * 2) + 1,
      color: new paper.Color(rgb.r, rgb.g, rgb.b, 1),
      position: this.sparkSource,
      velocity: new paper.Point(Math.cos(ranAngle), Math.sin(ranAngle)).multiply(Math.random() * 150 + 20),
      heatCurrent: 0,
      life: (Math.random() * 4 + 2)
    });
  }

  // 'this' will be the Spark object itself.
  sparkOnFrame(demo) {

    this.velocity.angle += (Math.random() * 20) - 10;
    this.options.heatCurrent += (Math.random());
    this.options.life -= demo.elapsed;

    var nextPos = this.options.velocity.multiply(demo.elapsed).add(this.position);
    this.next(nextPos);

    if (this.options.life < 0 || nextPos.y > HEIGHT + 50 || nextPos.x < -50 || nextPos.y < -50 || nextPos.x > WIDTH + 50)
    {
      this.reset();
    }
  }

  onMouseMoveHandler(event) {
    var rect = this.canvas.getBoundingClientRect(),
        scale = WIDTH / this.state.canvasTargetWidth;

    this.sparkSource = new paper.Point((event.clientX - rect.left) * scale, (event.clientY - rect.top) * scale);
  }

  onTouchMoveHandler(event) {
    event.preventDefault();

    var rect = this.canvas.getBoundingClientRect(),
        scale = WIDTH / this.state.canvasTargetWidth;

    this.sparkSource = new paper.Point((event.touches[0].clientX - rect.left) * scale, (event.touches[0].clientY - rect.top) * scale);
  }

  render() {
    return <div className="Spark">
        <div className="demo-container">
          {this.getBackButton()}
          <div className="title">Ember</div>
          <div className="description">Move your mouse around to change the source of the sparks.</div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Embers/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, Paper.js, React.js</div>
          <div className="controls">
            
          </div>
          {this.getCanvasContainer(WIDTH, HEIGHT, 'sparkCanvas')}
        </div>
      </div>;
  }
}

export default {
  name: 'Embers',
  key: 'embers',
  author: 'Thomas',
  technologies: [],
  image: 'under-construction.svg',
  description: 'Ember particle effect, customizable to any physics engine',
  component: EmberDemo
};