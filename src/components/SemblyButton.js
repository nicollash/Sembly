import React from 'react';

import { connect } from 'react-redux';

import {
  TouchableOpacity,
  Text,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../styles/iphoneModelCheck';

const styles = {
  button: {
    borderRadius: hp(4),
    alignSelf: 'center',
    paddingVertical: hp(1.7),
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
          { backgroundColor: this.props.backgroundColor }]}
        onPress={this.props.onPress}
      >
        <Text style={styles.text}>
          {this.props.label}
        </Text>
      </TouchableOpacity>
    );
  }
}

SemblyButton.defaultProps = {
  label: 'Button',
  width: null,
  onPress: null,
  backgroundColor: '#F7567C',
};

SemblyButton.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyButton;
