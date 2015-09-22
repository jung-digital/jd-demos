/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import Spark from '../shared/spark';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';
import util from '../shared/util/util';
import Dispatcher from '../../../core/Dispatcher';
import DemoBase from '../DemoBase';
import Wind from '../shared/wind';

/*============================================
 * The demo JSX component
 *============================================*/
@withStyles(demoStyles)
class FireworkGL extends DemoBase {
  constructor(props) {
    super(props);

    this.sparkSource = new PIXI.Point(this.state.canvasTargetWidth / 2, this.state.canvasTargetHeight / 5);

    this.wind = new Wind({
      currentCount: 20,
      generalWindAngle: -Math.PI / 2,
      maxWindAngleDeviation: Math.PI/4,
      maxWindStrength: 800,
      minWindStrength: 200,
      viewWidth: this.state.WIDTH,
      viewHeight: this.state.HEIGHT,
      minRadius: 100,
      maxRadius: 900,
      wrap: true
    });
  }

  pathRedraw(spark, path, ratio) {
    ratio = 1 - ratio;

    //paper.project.activeLayer.addChild(path);

    // path.strokeColor = spark.options.color.clone();
    // path.strokeColor.alpha = ratio;
    // path.strokeWidth = spark.options.size * ratio;
    // path.strokeCap = 'butt';
  }

  componentDidMount() {
    super.componentDidMount();

    this.canvas = document.getElementById('fireworkCanvas');

    this.stage = new PIXI.Stage(0x0);
    this.renderer = PIXI.autoDetectRenderer(this.state.WIDTH, this.state.HEIGHT, {
      view: this.canvas
    });

    this.gameContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.gameContainer);

    this.sparks = [];

    for (var i = 0; i < 10; i++)
      this.sparks.push(new Spark({
          pathRedraw: this.pathRedraw,
          sparkResolution: 4
        }));

    requestAnimFrame(this.onFrame.bind(this));
  };

  onFrame() {
    super.onFrame();

    if (this.state.wind)
    {
      this.wind.onFrame(this.elapsed);
    }

    this.hue += this.elapsed * 20;

    this.sparks.forEach(spark => {
      if (!spark.sparking)
      {
        this.startSpark(spark);
      }

      this.sparkOnFrame.call(spark, this);
      spark.onFrame(event);
    });

    this.lastTime = new Date().getTime();

    this.renderer.render(this.stage);

    requestAnimFrame(this.onFrame.bind(this));
  }

  startSpark(spark) {
    var ranAngle = (Math.random() * 2) - 1 - (Math.PI / 2),
        rgb = util.hsvToRgb(this.hue, 1, 0.8);

    spark.spark({
      type: 2,
      size: (Math.random() * 2) + 1,
      color: rgb,
      position: this.sparkSource,
      velocity: new PIXI.Point(Math.cos(ranAngle), Math.sin(ranAngle)).multiply(Math.random() * 100 + 20)
    });
  }

  // 'this' will be the Spark object itself.
  sparkOnFrame(demo) {
    if (demo.state.gravity)
    {
      this.options.velocity = this.options.velocity.add(demo.gravity.multiply(demo.elapsed));
    }

    if (demo.state.wind)
    {
      var windForce = demo.wind.getForceAt(this.position).multiply(demo.elapsed);
      this.options.velocity = this.options.velocity.add(windForce);
    }

    var nextPos = this.options.velocity.multiply(demo.elapsed).add(this.position);
    this.next(nextPos);

    if (nextPos.y > this.state.HEIGHT + 50 || nextPos.x < -50 || nextPos.y < -50 || nextPos.x > this.state.WIDTH + 50)
    {
      this.reset();
    }
  }

  onMouseMoveHandler(event) {
    var rect = this.canvas.getBoundingClientRect(),
        scale = this.state.WIDTH / this.state.canvasTargetWidth;

    this.sparkSource = new PIXI.Point((event.clientX - rect.left) * scale, (event.clientY - rect.top) * scale);
  }

  onTouchMoveHandler(event) {
    event.preventDefault();

    var rect = this.canvas.getBoundingClientRect(),
        scale = this.state.WIDTH / this.state.canvasTargetWidth;

    this.sparkSource = new PIXI.Point((event.touches[0].clientX - rect.left) * scale, (event.touches[0].clientY - rect.top) * scale);
  }

  windChangeHandler(event) {
    this.setState({wind: event.target.checked});
  }

  gravityChangeHandler(event) {
    this.setState({gravity: event.target.checked});
  }

  render() {
    return <div className="Spark">
        <div className="demo-container">
          {this.getBackButton()}
          <div className="title">Spark</div>
          <div className="description">Move your mouse around to change the source of the sparks.</div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Sparks/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, Paper.js, React.js, Gravity</div>
          <div className="controls">
            Wind: <input type="checkbox" checked={this.state.wind} onChange={this.windChangeHandler.bind(this)} />
            Gravity: <input type="checkbox" checked={this.state.gravity} onChange={this.gravityChangeHandler.bind(this)} />
          </div>
          {this.getCanvasContainer(this.state.WIDTH, this.state.HEIGHT, 'fireworkCanvas')}
        </div>
      </div>;
  }
}

export default {
  name: 'Fireworks',
  key: 'fireworks',
  author: 'Josh',
  technologies: [],
  image: 'sparks.png',
  description: 'temp',
  component: FireworkGL
};