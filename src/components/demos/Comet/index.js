/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './index.css';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';

const WIDTH = 800;
const HEIGHT = 600;
const MAX_FORCE = 500;

/**
 * A comet that moves toward this.m, which is designed to be the mouse.
 *
 * The comet trail fans outward from its current location through all the points it has traveled
 * between (one historical point every 1/resolution s.)
 */
class Comet {

  setDest(point, mass) {
    this.dest = point;
    this.destMass = mass;
  }

  wrap() {
    var reset = false;

    if (this.pos.x < 0) {reset = true; this.pos.x = WIDTH};
    if (this.pos.x > WIDTH) {reset = true; this.pos.x = 0};
    if (this.pos.y < 0) {reset = true; this.pos.y = HEIGHT};
    if (this.pos.y > HEIGHT) {reset = true; this.pos.y = 0};

    if (reset)
    {
      this.hist = [];
      this.paths.forEach(path => path.removeSegments());
    }
  }

  onFrame(event) {
    var G = 1,              // Gravity constant
        m1 = this.mass,     // Mass of comet
        m2 = this.destMass; // Mass of mouse (planet)

    // Accelerate toward the destination point.

    // r is vector from comet to the planet
    var r = this.dest.subtract(this.pos),
        dist = r.length,
        rLengthSquared = dist * dist;

    if (rLengthSquared != 0 && m2)
    {
      var F = (G * m1 * m2) / rLengthSquared,
          F = Math.min(F, 1000),
          gravity = r.normalize(F);

      this.vel = this.vel.add(gravity.multiply(event.delta));

      var next = this.pos.add(this.vel.multiply(event.delta));

      //this.hist.push(this.pos);

      this.pos = next;
      this.wrap();

      this.hist.push(next);

      if (this.hist.length >= this.resolution)
        this.hist.shift(); // Remove the first segment, to make a trail

      // The base *glow* of the entire comet
      //   Min: 0.2
      //   Max: 1.0
      // Glow is inversely proportional to distance.
      var alphaBase = Math.max(0.4, Math.min(Math.abs(100/dist), 1));

      // Now we create the actual paths that taper and fade
      for (var i = this.hist.length-1; i > 1; i--)
      {
        var p = this.paths[i];

        p.removeSegments();

        var alpha = ((i+1) / this.resolution) * alphaBase;
        p.strokeColor = new paper.Color(this.color.red, this.color.green, this.color.blue, alpha);
        this.circle.fillColor.alpha = alphaBase;

        p.add(this.hist[i]);
        p.add(this.hist[i-1]);
      }

      this.circle.position = next;
    }
  }

  constructor(id, color, startPoint, destPoint, vel, resolution, mass) {
    this.color = color;
    this.id = id;
    this.mass = mass;
    this.resolution = resolution;

    this.vel = vel;
    this.pos = startPoint;
    this.dest = destPoint;

    this.hist = [];
    this.paths = [];

    var diameter = (mass / 200) * 10;

    this.circle = new paper.Path.Circle(new paper.Point(0,0), diameter / 2);
    this.circle.position = startPoint;
    this.circle.fillColor = color;

    for (var i = 0; i < this.resolution; i++)
    {
      var path = new paper.Path();
      
      path.strokeColor = new paper.Color(color.red, color.green, color.blue, (i+1) / resolution);
      path.strokeWidth = diameter - ((resolution - i+1) / resolution) * diameter;

      this.paths.push(path);
    }

    this.paths[0].onFrame = this.onFrame.bind(this);
  }
}

@withStyles(styles)
@withStyles(demoStyles)
class CometDemo {

  onMouseMoveHandler(event) {
    var rect = this.canvas.getBoundingClientRect();

    this.comets.forEach(comet => comet.setDest(new paper.Point(event.clientX - rect.left,
                                                               event.clientY - rect.top), 10000));
  };

  componentDidMount() {
    var self = this;

    this.canvas = document.getElementById('cometDemo');
    paper.setup(this.canvas);

    this.background = new paper.Path.Rectangle(paper.view.bounds);
    this.background.fillColor = new paper.Color(0,0,0);

    this.rasterBackground = this.background.rasterize();

    for (var i = 0; i < 1000; i++){
      this.rasterBackground.setPixel(
        new paper.Point(Math.random() * this.rasterBackground.width, Math.random() * this.rasterBackground.height),
        new paper.Color(Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.5));
    }

    this.comets = [];

    for (var i = 0; i < 10; i++)
      this.comets.push(new Comet(i,
                        new paper.Color(Math.random(), Math.random(), Math.random()),
                        new paper.Point(Math.random() * WIDTH, Math.random() * HEIGHT),
                        new paper.Point(Math.random() * WIDTH, Math.random() * HEIGHT),
                        new paper.Point(Math.random() * 100 - 50, Math.random() * 100 - 50),
                        50,
                        Math.random() * 100 + 100));

    paper.view.onFrame = function (event) {
      paper.view.draw();
    };
  };

  componentWillUpdate() {

  };

  render() {
    return (
      <div className="CometDemo">
        <div className="demo-container">
          <div className="title">Comet Demo</div>
          <div className="description">Position your mouse to create a gravitational field to affect the comet trajectory.</div>
          <div className="technologies">Uses Paper.js, React.js</div>
          <div className="canvas-container">
            <canvas className="demo-canvas" width={WIDTH} height={HEIGHT} id="cometDemo" onMouseMove={this.onMouseMoveHandler.bind(this)} />
          </div>
        </div>
      </div>
    );
  }
}

export default {
  name: 'Comet',
  key: 'comet',
  author: 'Josh',
  technologies: [],
  component: CometDemo
};