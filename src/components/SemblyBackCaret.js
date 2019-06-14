import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

const styles = {
};

class SemblyBackCaret extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <TouchableOpacity
        accessibilityIgnoresInvertColors
        onPress={this.props.onPress}
      >
        <Image source={require('../../assets/images/backCaret.png')} />
      </TouchableOpacity>
    );
  }
}

SemblyBackCaret.defaultProps = {
  onPress: null,
};

export default SemblyBackCaret;
