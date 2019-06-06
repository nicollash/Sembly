import React, { Component } from 'react';
import themable from './themable';

class ThemeContainer extends Component {
  render() {
    return this.props.children;
  }
}

export default themable(ThemeContainer);
