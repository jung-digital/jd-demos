import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';
import React, { PropTypes } from 'react';
import Const from './shared/const';

class DemoBase extends React.Component {
  constructor(props) {
    super(props);

    this.lastTime = 0;

    this.state = {
      canvasTargetWidth: Const.WIDTH,
      canvasTargetHeight: Const.HEIGHT,
      WIDTH: Const.WIDTH,
      HEIGHT: Const.HEIGHT
    }
  }

  resizeHandler(event) {
    var i =  Math.min(800, window.innerWidth);

    console.log(this);

    this.setState({
      canvasTargetWidth:  i,
      canvasTargetHeight: i / 1.618
    });

    this.resize();
  }

  resize() {
    console.log('Resized!', this.state.canvasTargetWidth, this.state.canvasTargetHeight);
  }

  back_onClickHandler(event) {
    Dispatcher.dispatch({type: ActionTypes.BACK_LOCATION});
  }

  onMouseMoveHandler() {
    // noop
  }

  onMouseOutHandler() {
    // noop 
  }

  onTouchStartHandler() {
    // noop 
  }

  onTouchMoveHandler() {
    // noop 
  }

  getBackButton() {
    return <a href="/" className="back">
             <div>
               <i className="fa fa-arrow-left"></i>
               <span>&nbsp;Back</span>
             </div>
           </a>;
  }

  getCanvasContainer(width, height, canvasID) {
    return <div className="canvas-container">
             <canvas className="demo-canvas" width={width} height={height} style={{width: this.state.canvasTargetWidth, height: this.state.canvasTargetHeight}} id={canvasID}
                onMouseMove={this.onMouseMoveHandler.bind(this)}
                onMouseOut={this.onMouseOutHandler.bind(this)}
                onTouchStart={this.onTouchStartHandler.bind(this)}
                onTouchMove={this.onTouchMoveHandler.bind(this)} />
            </div>;
  }

  componentDidMount() {
    console.log('DemoBase: componentDidMount()');
    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.resizeHandler(null);
  }

  onFrame() {
    if (!this.lastTime)
    {
      this.lastTime = new Date().getTime();
      this.elapsed = 0.01;
    }
    else
    {
      this.elapsed = (new Date().getTime() - this.lastTime) / 1000;
    }
  }
}

export default DemoBase;