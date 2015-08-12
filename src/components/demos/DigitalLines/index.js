/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';



class DigitalLines {

  static propTypes = {
  };

  canvasRender() {

  };

  componentDidMount() {
    // Get a reference to the canvas object
    var canvas = document.getElementById('digitalLinesCanvas');

    // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    // Create a Paper.js Path to draw a line into it:
    var path = new paper.Path();

    // Give the stroke a color
    path.strokeColor = 'black';
    var start = new paper.Point(100, 100);

    // Move to start and draw a line from there
    path.moveTo(start);

    // Note that the plus operator on Point objects does not work
    // in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([ 200, -50 ]));

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