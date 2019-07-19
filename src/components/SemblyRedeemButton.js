import React from 'react';

import { connect } from 'react-redux';

import Theme from '../styles/theme';

import {
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';

const styles = {
  button: {
    borderRadius: 25,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: Theme.fonts.bold,
    top: '1%',
  },
};

class SemblyRedeemButton extends React.Component {
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
          { top: this.props.onTop },
          { backgroundColor: this.props.backgroundColor }]}
        onPress={this.props.onPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ width: '3%' }} />
          <View style={{
            borderRadius: 50,
            height: 17,
            width: 17,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Image
              source={require('../../assets/images/RedeemButtonB.png')}
            />
          </View>
          <View style={{ width: '10%'}} />
          <Text style={styles.text}>{this.props.label}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SemblyRedeemButton.defaultProps = {
  label: 'Redeem',
  onPress: null,
  width: 75,
  height: 21,
  backgroundColor: '#D6CEAE',
  onTop: 0,
};

SemblyRedeemButton.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyRedeemButton;
