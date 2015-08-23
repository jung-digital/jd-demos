import Dispatcher from '../../core/Dispatcher';
import ActionTypes from '../../constants/ActionTypes';
import React, { PropTypes } from 'react';

class DemoBase {
  back_onClickHandler(event) {
    Dispatcher.dispatch({type: ActionTypes.BACK_LOCATION});
  }

  getBackButton() {
    return <div className="back" onClick={this.back_onClickHandler.bind(this)}><i className="fa fa-arrow-left"></i>&nbsp;Back</div>;
  }
}

export default DemoBase;