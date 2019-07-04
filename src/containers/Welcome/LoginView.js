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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#FFF9BB',
    flex: 0.425,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    alignSelf: 'stretch',
    flex: 0.9,
  },
  underwhite: {
    backgroundColor: '#D8C34A',
    flex: 0.575,
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    alignItems: 'center',
  },
  whiteContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  textbox: {
    top: '10%',
    flex: 0.25,
    justifyContent: 'flex-start',
  },
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
    top: '9%',
    textAlign: 'center',
    lineHeight: 25,
    flex: 0.4,
    marginHorizontal: 20,
    color: '#96969A',
    fontSize: 18,
    fontFamily: Theme.fonts.bold,
  },
  form: {
    // flex: 0.425,
    alignSelf: 'center',
    top: '7.5%',
    width: '85%',
    justifyContent: 'flex-end',
  },
  footer: {
    top: '20%',
    flex: 0.3,
    justifyContent: 'flex-start',
  },
  foothead: {
    top: '38%',
    flex: 0.4,
  },
  footline: {
    top: '150%',
    flex: 0.4,
  },
};


class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  setEmail = (email) => {
    this.setState({email});
  }

  setPassword = (password) => {
    this.setState({password});

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
          <KeyboardAwareScrollView 
            contentContainerStyle={styles.contentContainer}
            style={styles.whiteContainer}>
            <View style={styles.textbox}>
              <View style={{
                backgroundColor: 'white',
                alignSelf: 'stretch',
                flex: 0.175,
              }}
              />
 
              <View style={styles.headline}>
                <View>
                  <Text style={styles.title}>Discover your city</Text>
                </View>
              </View>

              <Text style={styles.desc}>
                  Sembly is a crowdsourced city discovery platform.
              </Text>
            </View>

            <View
              accessibilityIgnoresInvertColors
              style={styles.form}
            >
              <LoginForm
                actionOnPress={() => this.props.navigation.navigate('MainApp')} 
                actionLabel="Login"
                emailChanged={(value) => this.setEmail(value)}
                passwordChanged={(value) => this.setPassword(value)}
              />
            </View>
            
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
                  style={styles.foothead}
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
                  style={styles.footline}
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
          </KeyboardAwareScrollView>
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
