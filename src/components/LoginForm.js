import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { whileStatement } from '@babel/types';
import { SemblyButton } from '../components';
import SemblyInput from './SemblyInput';


const styles = {
  container: {
    width: '100%',
    alignSelf: 'center'
    // justifyContent: 'flex-end',
    // alignItems: 'flex-start',
  },
  button: {
    marginTop: 15,
    width: '120%',
    height:50,
    alignSelf: 'center'
  },
};

class LoginForm extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <SemblyInput
          label="EMAIL"
          placeholder="your@email.com"
          returnKey="next"
          valueChanged={(str) => this.props.emailChanged(str)}
          secured={false}
        />
        <SemblyInput
          label="PASSWORD"
          placeholder="**********"
          returnKey="done"
          valueChanged={(str) => this.props.passwordChanged(str)}
          ref={(input) => this.props.nextInput = input}
          secured
        />

        <View style={styles.button}>
          <SemblyButton label={this.props.actionLabel} onPress={this.props.actionOnPress} />
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
