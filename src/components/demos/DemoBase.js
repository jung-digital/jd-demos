import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';
import React, { PropTypes } from 'react';

class DemoBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      canvasTargetWidth: 800,
      canvasTargetHeight: 800 / 1.618
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
}

export default DemoBase;