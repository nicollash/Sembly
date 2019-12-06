import React from 'react';

import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../styles/iphoneModelCheck';
import SemblyLabel from './SemblyLabel';

const styles = StyleSheet.create({
  input: {
    color: '#26315F',
    fontSize: wp(4.5),
    paddingBottom: 5,
    paddingTop: isIphoneX() ? 7 : 5,
    borderBottomWidth: hp(0.05),
    borderBottomColor: '#D8D8D8',
  },
});

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


class SemblyInput extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <DismissKeyboard>
        <View>
          <SemblyLabel
            label={this.props.label}
            secondLabel={this.props.secondLabel}
            fontSize={this.props.onFontSize}
            secondFontSize={this.props.onSecondFontSize}
            marginLeft={this.props.marginLeft}
          />
          <View style={{ height: this.props.spacing}} />
          <TextInput
            ref={this.props.ref}
            maxLength={this.props.maxLength}
            multiline={this.props.multiline}
            textContentType={this.props.type}
            style={styles.input}
            placeholder={this.props.placeholder}
            placeholderTextColor="#C7CAD1"
            autoCapitalize="none"
            autoCorrect={this.props.autoCorrect}
            secureTextEntry={this.props.secured}
            onChangeText={str => this.props.valueChanged(str)}
            returnKeyType={this.props.returnKey}
            secured={this.props.secured}
            onSubmitEditing={this.props.onSubmit}
          />
        </View>
      </DismissKeyboard>
    );
  }
}

SemblyInput.defaultProps = {
  label: null,
  type: undefined,
  autoCorrect: false,
  onFontSize: 14,
  onSecondFontSize: 10,
  multiline: true,
  secured: false,
  spacing: 0,
  maxLength: 300,
};

SemblyInput.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SemblyInput;
