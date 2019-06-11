import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Text,
} from 'react-native';

const styles = {
  container: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#F7567C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  }
};

class SemblyButton extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <TouchableOpacity accessibilityIgnoresInvertColors style={styles.container} onPress={this.props.onPress}>
        <Text style={styles.text}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

SemblyButton.defaultProps = {
    label: 'Button',
    onPress: null,
};

SemblyButton.propTypes = {
    
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyButton;
