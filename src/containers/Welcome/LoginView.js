import React, { Component } from 'react';

import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  TextInput,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  fontSize,
  fontFamily,
  KeyboardAvoidingView,
} from 'react-native';

import {
  SemblyButton,
  LoginForm,
} from '../../components';

import Theme from '../../styles/theme';
import { ScrollView } from 'react-native-gesture-handler';

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'blue',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#FFF9BB',
    flex: 0.425,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    alignSelf: 'stretch',
    order: 2,
    flex: 0.9,
  },
  underwhite: {
    backgroundColor: '#D8C34A',
    flex: 0.575,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  textbox: {
    flex: 0.25,
    justifyContent: 'flex-end',
    headline: {
      alignSelf: 'center',
      width: '90%',
      flex: 0.4,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      width: '100%',
      fontSize: 35,
      color: '#26315F',
      textAlign: 'center',
      alignSelf: 'center',
      fontFamily: Theme.fonts.black,
    },
    desc: {
      textAlign: 'center',
      lineHeight: 25,
      flex: 0.4,
      marginHorizontal: 20,
      color: '#96969A',
      fontSize: 18,
      fontFamily: Theme.fonts.bold,
    },
  },
  form: {
    flex: 0.425,
    width: '80%',
    justifyContent: 'flex-end',
  },
  footer: {
    flex: 0.3,
    justifyContent: 'flex-start',
    foothead: {
      flex: 0.4,
    },
    footline: {
      flex: 0.4,
    },
  },
};


class LoginView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar barStyle="dark-content" />

        <View style={styles.headerContainer}>

          <View style={{
            order: 1,
            backgroundColor: '#FFF9BB',
            flex: 0.1,
            alignSelf: 'stretch',
          }}
          />

          <View style={styles.image}>
            <Image source={require('../../../assets/images/loginViewBackground.png')} />
          </View>

        </View>

        <View style={styles.underwhite}>
          <KeyboardAvoidingView style={styles.whiteContainer}>
            <View style={styles.textbox}>
              <View style={{
                backgroundColor: 'white',
                alignSelf: 'stretch',
                flex: 0.175,
              }}
              />
 
              <View style={styles.textbox.headline}>
                <View>
                  <Text style={styles.textbox.title}>Discover your city</Text>
                </View>
              </View>

              <Text style={styles.textbox.desc}>
                  Sembly is a crowdsourced city discovery platform.
              </Text>
            </View>

            <KeyboardAvoidingView
              behavior="padding"
              accessibilityIgnoresInvertColors
              style={styles.form}
            >
              <LoginForm actionOnPress={() => this.props.navigation.navigate('MainApp')} actionLabel="Login" />
            </KeyboardAvoidingView>
            
            <View style={styles.footer}>
              <View style={{
                backgroundColor: 'white',
                flex: 0.7,
              }}
              />
              <View>
                <TouchableOpacity 
                  accessibilityIgnoresInvertColors 
                  onPress={() => this.props.navigation.navigate('ForgotPassword')}
                  style={styles.footer.foothead}
                >
                  <Text style={{
                    color: '#97979B',
                    textAlign: 'center',
                    fontSize: 18,
                    fontFamily: Theme.fonts.bold,
                  }}
                  >
              Forgot your password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity 
                  accessibilityIgnoresInvertColors 
                  onPress={() => this.props.navigation.navigate('Signup')}
                  style={styles.footer.footline}
                >
                  <Text style={{
                    color: '#26315F',
                    textAlign: 'center',
                    alignSelf: 'flex-end',
                    fontSize: 18,
                    fontFamily: Theme.fonts.bold,
                  }}
                  >
                  Don't have an account?
                    <Text style={{ color: '#F93963' }}> Sign up</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}

LoginView.defaultProps = {
};

LoginView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default LoginView;
