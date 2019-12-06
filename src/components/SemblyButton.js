import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../styles/iphoneModelCheck';

const styles = {
  button: {
    borderRadius: hp(4),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp(4),
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
          { height: this.props.height },
          { backgroundColor: this.props.backgroundColor }]}
        onPress={this.props.onPress}
      >
        {this.props.loading && (
          <ActivityIndicator color="#fff" />
        )}
        {!this.props.loading && (
          <Text style={styles.text}>
            {this.props.label}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

SemblyButton.defaultProps = {
  label: 'Button',
  width: null,
  onPress: null,
  height: 50,
  backgroundColor: '#F7567C',
  loading: false,
};

SemblyButton.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyButton;
