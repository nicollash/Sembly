import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { whileStatement } from '@babel/types';
import { SemblyButton } from '../components';


const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  email: {
    color: '#C7CAD1',
    fontSize: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
    alignSelf: 'auto',
  },
  emailInput: {
    width: '100%',
    paddingTop: 15,
    fontSize: 18,
    color: '#C7CAD1',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
    alignSelf: 'center',
  },
  password: {
    fontSize: 14,
    paddingTop: 30,
    color: '#C7CAD1',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
  },
  passwordInput: {
    width: '100%',
    fontSize: 18,
    paddingTop: 15,
    color: '#C7CAD1',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
    alignSelf: 'center',
    marginBottom: 22,
  },
  button: {
    width: '120%',
    alignSelf: 'center',
  },
};

class LoginForm extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>

        <Text style={styles.email}>EMAIL</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="your@email.com"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.password}>PASSWORD</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="**********"
          returnKeyType="done"
          secureTextEntry
          ref={(input) => this.passwordInput = input}
        />

        <View style={styles.button}>
          <SemblyButton label={this.props.actionLabel} onPress={this.props.actionOnPress} />
        </View>

      </KeyboardAvoidingView>
    );
  }
}

LoginForm.defaultProps = {
  actionLabel: 'Login',
  actionOnPress: null,
};

export default LoginForm;
