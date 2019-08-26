import React from 'react';

import {
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../styles/iphoneModelCheck';
import SemblyLabel from './SemblyLabel';

const styles = StyleSheet.create({
  text: {
    color: '#26315F',
    fontSize: wp(4.5),
    paddingHorizontal: '4%',
    paddingBottom: '1.5%',
    paddingTop: isIphoneX() ? '4%' : '2%',
    borderBottomWidth: hp(0.05),
    borderBottomColor: '#D8D8D8',
  },
});


class SemblyInput extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <SemblyLabel
          label={this.props.label} 
          secondLabel={this.props.secondLabel}
          fontSize= {this.props.onFontSize}
          secondFontSize= {this.props.onSecondFontSize}
        />
        <TextInput
          style={styles.text}
          placeholder={this.props.placeholder}
          placeholderTextColor="#C7CAD1"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={this.props.secured}
          onChangeText={(str) => this.props.valueChanged(str)}
          returnKeyType={this.props.returnKey}
          ref={(input) => this.props.nextInput = input}
        />
      </View>
    );
  }
}

SemblyInput.defaultProps = {
  label: null,
  onFontSize: 14,
  onSecondFontSize: 10,
};

SemblyInput.propTypes = {

};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyInput;
