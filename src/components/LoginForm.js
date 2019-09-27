import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import SemblyInput from './SemblyInput';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../styles/iphoneModelCheck';



const styles = {
  container: {
    width: '100%',
    alignSelf: 'center',
  },
};

class LoginForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 25 }}>
          <SemblyInput
            label="EMAIL"
            placeholder="your@email.com"
            returnKey="next"
            valueChanged={str => this.props.emailChanged(str)}
            multiline={false}
          />
        </View>
        <View style={{ marginTop: 15 }}>
          <SemblyInput
            label="PASSWORD"
            placeholder="***************"
            returnKey="done"
            valueChanged={(str) => this.props.passwordChanged(str)}
            ref={input => this.props.nextInput = input}
            secured={true}
            multiline={false}
          />
        </View>
      </View>
    );
  }
}

LoginForm.defaultProps = {
  actionLabel: 'Login',
  actionOnPress: null,
};

export default LoginForm;
