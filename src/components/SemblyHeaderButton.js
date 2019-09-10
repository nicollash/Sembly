import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import theme from '../styles/theme';

const styles = {
  container: {
    marginHorizontal: 15,
  },
  text: {
    color: '#26315F',
    fontSize: 18,
    textAlign: 'center',
  },
  red: {
    color: '#F93963',
    fontFamily: theme.fonts.bold,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
};

class SemblyHeaderButton extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <TouchableOpacity
        accessibilityIgnoresInvertColors
        onPress={this.props.onPress}
        style={styles.container}
      >
        {this.props.red
        && <Text style={styles.red}>{this.props.label}</Text>
        }
        {!this.props.red
        && <Text style={styles.text}>{this.props.label}</Text>
        }
      </TouchableOpacity>
    );
  }
}

SemblyHeaderButton.defaultProps = {
  label: 'Button',
  onPress: null,
};

SemblyHeaderButton.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyHeaderButton;
