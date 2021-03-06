import React, { PropTypes } from 'react';
import styles from './index.css';
import demoStyles from '../demo.css';
import withStyles from '../../../decorators/withStyles';
import Comet from './comet.js';
import Dispatcher from '../../../core/Dispatcher';
import DemoBase from '../DemoBase';

const WIDTH = 800,          // Width of canvas
      HEIGHT = 800 / 1.61,         // Height of canvas
      MAX_FORCE = 500,      // Maximum force that can be given to a comet (to keep from flinging into the abyss)
      TAIL_LENGTH = 40,     // Tail length, in segments
      NUM_COMETS = 17,      // Number of comets on the screen
      STARS = 1000;

/*============================================
 * The actual demo JSX component
 *============================================*/
@withStyles(styles)
@withStyles(demoStyles)
class CometDemo extends DemoBase {

  constructor(props) {
    super(props);
  }

  onMouseMoveHandler(event) {
    var rect = this.canvas.getBoundingClientRect(),
        scale = WIDTH / this.state.canvasTargetWidth;;

    this.comets.forEach(comet => comet.setDest(new paper.Point((event.clientX - rect.left) * scale,
                                                               (event.clientY - rect.top) * scale), 10000));
  };

  onMouseOutHandler(event) {
    this.comets.forEach(comet => comet.setDest());
  }

  onTouchStartHandler(event) {
    event.stopPropagation();
  }

  onTouchMoveHandler(event) {
    if (event.touches)
    {
      var rect = this.canvas.getBoundingClientRect(),
          scale = WIDTH / this.state.canvasTargetWidth;;

      this.comets.forEach(comet => comet.setDest(new paper.Point((event.touches[0].clientX - rect.left) * scale,
                                                                 (event.touches[0].clientY - rect.top) * scale), 10000));

      event.stopPropagation();
    }
  }

  componentDidMount() {
    super.componentDidMount();

    this.canvas = document.getElementById('cometCanvas');
    paper.setup(this.canvas);

    this.background = new paper.Path.Rectangle(paper.view.bounds);
    this.background.fillColor = new paper.Color(0,0,0);

    this.rasterBackground = this.background.rasterize();

    for (var i = 0; i < STARS; i++){
      this.rasterBackground.setPixel(
        new paper.Point(Math.random() * this.rasterBackground.width, Math.random() * this.rasterBackground.height),
        new paper.Color(Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.5));
    }

    this.comets = [];

    for (var i = 0; i < NUM_COMETS; i++)
      this.comets.push(new Comet(i,
                        new paper.Color(Math.random(), Math.random(), Math.random()),
                        new paper.Point(Math.random() * WIDTH, Math.random() * HEIGHT),
                        new paper.Point(Math.random() * WIDTH, Math.random() * HEIGHT),
                        new paper.Point(Math.random() * 100 - 50, Math.random() * 100 - 50),
                        TAIL_LENGTH,
                        Math.random() * 100 + 100,
                        [WIDTH, HEIGHT]));

    paper.view.onFrame = () => paper.view.draw();
  };

  render() {
    return (
      <div className="CometDemo">
        <div className="demo-container">
          {this.getBackButton()}
          <div className="title">Comet Demo</div>
          <div className="description">Tap your mouse or finger to create a gravitational field to affect the comet trajectory.</div>
          <div className="source"><a target="_blank" href="https://github.com/jung-digital/jd-demos/blob/master/src/components/demos/Comet/index.js">Source</a></div>
          <div className="technologies">Uses: React Starter Kit, EcmaScript 7, WebPack, Paper.js, React.js, Law of Universal Gravitation</div>
          {this.getCanvasContainer(WIDTH, HEIGHT, 'cometCanvas')}
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
  image: 'comet.png',
  description: 'Your Mouse is a Planet',
  component: CometDemo
};