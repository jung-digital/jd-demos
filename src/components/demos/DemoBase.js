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

  getBackButton() {
    return <a href="#">
            <div className="back">
               <i className="fa fa-arrow-left"></i>
               &nbsp;Back
            </div>
          </a>;
  }

  componentDidMount() {
    console.log('DemoBase: componentDidMount()');
    window.addEventListener('resize', this.resizeHandler.bind(this));
    this.resizeHandler(null);
  }
}

export default DemoBase;