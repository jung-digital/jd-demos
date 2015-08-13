/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';

class Line {
  constructor() {
    try {
      this.path = new paper.Path();
      this.path.fillColor = undefined;
      this.path.strokeColor = 'green';
      this.path.strokeWidth = 2;

      // Left side
      var cur = new paper.Point(0, Math.random() * 500);
      this.path.moveTo(cur);

      while (cur.x < 800)
      {
        cur = cur.add(new paper.Point(Math.random() * 50 + 25, Math.random() * 50 - 25));
        this.path.lineTo(cur);
      }

      this.path.smooth();
    }catch (e) {
      console.log(e);
    };
  }
};

class DigitalLines {

  static propTypes = {
  };

  canvasRender() {

  };

  componentDidMount() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('digitalLinesCanvas'),
        lines = [];

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    for (var i = 0; i < 10; i++)
      lines.push(new Line());

    

    path.view.onFrame = function (event) {

    };

    // Draw the view now:
    paper.view.draw();
  };

  componentWillUpdate() {

  };

  render() {
    return (
      <div className="DigitalLines">
        Hello World!
        <canvas width="800" height="400" id="digitalLinesCanvas" />
      </div>
    );
  }
}

export default {
  name: 'Digital Lines',
  key: 'digitalLines',
  author: 'Josh',
  technologies: [],
  component: DigitalLines
};