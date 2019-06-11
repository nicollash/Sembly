//import liraries
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, StatusBar } from 'react-native';
import { whileStatement } from '@babel/types';
import { SemblyButton } from '../components';

// create a component
class LoginForm extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                  barStyle="dark-content"
                  />
                <Text style={{color: '#C7CAD1'}}>EMAIL</Text>
                <TextInput 
                  placeholder="your@email.com"
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  />
                <Text style={{color: '#C7CAD1'}}>PASSWORD</Text>
                <TextInput 
                  placeholder="**********"
                  returnKeyType="go"
                  secureTextEntry
                  style={styles.input}
                  ref={(input) => this.passwordInput = input}
                  />

                <View>
                  <SemblyButton label="Login"/>
                </View>

                <TouchableOpacity>
                    <Text style={{color: '#97979B',
                                  marginTop: 20,
                                  textAlign: 'center'}}>
                    Forgot your password?</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={{color: '#26315F',
                                  alignItems: 'baseline',
                                  marginTop: 95,
                                  textAlign: 'center'}}>
                        Don't have an account?
                      <Text style={{color: '#F93963'}}> Sign up</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        marginBottom: 20,
        color: 'black'
    }
});

//make this component available to the app
export default LoginForm;
