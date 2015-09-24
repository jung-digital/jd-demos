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
const SPARKS = 500,
      WIDTH = 800,             // Width of canvas
      HEIGHT = 800 / 1.61;     // Height of canvas

/*============================================
 * The demo JSX component
 *============================================*/
@withStyles(demoStyles)
class EmberDemo extends DemoBase {
  constructor(props) {
    super(props);

    this.hue = 0;

    this.sparkSource = new gl.vec2.fromValues(WIDTH / 2, HEIGHT / 5);
  }

  pathRedraw(spark, start, end, ratio, elapsed, context) {
    ratio = 1 - ratio;

    context.strokeStyle = 'rgb(' + ~~(spark.options.color.r * 256) + ',' + ~~(spark.options.color.g * 256) + ',' + ~~(spark.options.color.b) * 256 + ')';
    context.lineWidth = spark.options.size * ratio;

    context.beginPath();
    context.moveTo(start[0], start[1]);
    context.lineTo(end[0], end[1]);
    context.stroke();
  }

  componentDidMount() {
    super.componentDidMount();

    this.canvas = document.getElementById('sparkCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, WIDTH, HEIGHT);

    this.sparks = [];

    for (var i = 0; i < SPARKS; i++)
      this.sparks.push(new Spark({
          pathRedraw: this.pathRedraw,
          sparkResolution: 4
        }));
    
    window.requestAnimationFrame(this.onFrameFirst.bind(this));
  };

  onFrameFirst(timestamp) {
    this.lastTime = timestamp;
    window.requestAnimationFrame(this.onFrame.bind(this));
  }

  onFrame(timestamp) {
    this.ctx.clearRect(0,0, this.state.WIDTH, this.state.HEIGHT);
    this.elapsed = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    this.hue = Math.random() * Math.random() * 60;

    this.sparks.forEach(spark => {
      if (!spark.sparking)
      {
        this.startSpark(spark);
      }

      this.sparkOnFrame.call(spark, this);

      spark.onFrame(this.elapsed, this.ctx);
    });

    window.requestAnimationFrame(this.onFrame.bind(this));
  }

  startSpark(spark) {
    var ranAngle = Math.random() - .5 - (Math.PI / 2) ,
        rgb = util.hsvToRgb(this.hue, 1, 0.8);

    spark.spark({
      type: 2,
      size: (Math.random() * 2) + 1,
      color: rgb,
      position: this.sparkSource,
      velocity: gl.vec2.scale(gl.vec2.create(), gl.vec2.fromValues(Math.cos(ranAngle), Math.sin(ranAngle)), Math.random() * 150 + 20),
      heatCurrent: 0,
      life: (Math.random() * 4 + 2)
    });
  }

  // 'this' will be the Spark object itself.
  sparkOnFrame(demo) {

    var angle = (Math.random() * 20) - 10,
        matrix = gl.mat2.create();
    gl.mat2.rotate(matrix, matrix, angle);
    gl.vec2.transformMat2(this.options.velocity, this.options.velocity, matrix);

    this.options.heatCurrent += (Math.random());
    this.options.life -= demo.elapsed;

    var nextPos = gl.vec2.scaleAndAdd(gl.vec2.create(), this.position, this.options.velocity, demo.elapsed);
    this.next(nextPos);

    if (this.options.life < 0 || nextPos.y > HEIGHT + 50 || nextPos.x < -50 || nextPos.y < -50 || nextPos.x > WIDTH + 50)
    {
      this.reset();
    }
  }

  onMouseMoveHandler(event) {
    var rect = this.canvas.getBoundingClientRect(),
        scale = WIDTH / this.state.canvasTargetWidth;

    this.sparkSource = gl.vec2.fromValues((event.clientX - rect.left) * scale, (event.clientY - rect.top) * scale);
  }

  onTouchMoveHandler(event) {
    event.preventDefault();

    var rect = this.canvas.getBoundingClientRect(),
        scale = WIDTH / this.state.canvasTargetWidth;

    this.sparkSource = gl.vec2.fromValues((event.touches[0].clientX - rect.left) * scale, (event.touches[0].clientY - rect.top) * scale);
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