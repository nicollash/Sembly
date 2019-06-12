// import liraries
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, StatusBar } from 'react-native';
import { whileStatement } from '@babel/types';
import { SemblyButton } from '../components';


// define your styles
const styles = StyleSheet.create({
  container: {
  },
  input: {
    height: 40,
    width: 332,
    backgroundColor: 'white',
    marginBottom: 20,
    color: '#C7CAD1',
    borderBottomWidth: 0.5,
    borderBottomColor: '#D8D8D8',
  },
});

// create a component
class LoginForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <Text style={{ color: '#C7CAD1', textAlign: 'left' }}>EMAIL</Text>
        <TextInput
          placeholder="your@email.com"
          returnKeyType="next"
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <Text style={{ color: '#C7CAD1' }}>PASSWORD</Text>
        <TextInput
          placeholder="**********"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={(input) => this.passwordInput = input}
        />

        <View>
          <SemblyButton label="Login" onPress={this.props.actionOnPress} />
        </View>

      </View>
    );
  }
}

// make this component available to the app
export default LoginForm;
