import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const styles = {
  button: {
    borderRadius: 25,
    padding: 16,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
};

class SemblyButton extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <TouchableOpacity
          
        accessibilityIgnoresInvertColors
        style={[styles.button, { width: this.props.width }, 
          { backgroundColor: this.props.backgroundColor }]}
        onPress={this.props.onPress}
      >
        <Text style={styles.text}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

SemblyButton.defaultProps = {
  label: 'Button',
  onPress: null,
  width: '80%',
  backgroundColor: '#F7567C',
};

SemblyButton.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyButton;
