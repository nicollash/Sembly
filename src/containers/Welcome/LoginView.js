import React, { Component } from "react";

import { connect } from "react-redux";

import { View, Image, StatusBar, Text, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import { SemblyButton, LoginForm } from "../../components";

import Theme from "../../styles/theme";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const styles = {
  container: {
    height: hp(100),
    width: wp(100),
    backgroundColor: '#D8C34A',
    alignItems: 'center',
  },
  backgroundContainer: {
    backgroundColor: '#FFF9BB',
    height: isIphoneX() ? hp(44) : hp(46),
    alignItems: 'center',
    marginTop: !isIphoneX() ? hp(-3) : 0,
    width: wp(100),
  },
  mainContainer: {
    height: isIphoneX() ? hp(56) : hp(54),
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderTopRightRadius: hp(2),
    borderTopLeftRadius: hp(2),
  },
  discoverCity: {
    marginTop: isIphoneX() ? hp(3.5) : hp(2.5),
    width: '100%',
    fontSize: wp(8),
    color: '#26315F',
    textAlign: 'center',
    fontFamily: Theme.fonts.black,
  },
  semblyIs: {
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#96969A',
    fontSize: wp(4.4),
    fontFamily: Theme.fonts.bold,
    marginTop: hp(1),
    width: '80%',
    alignSelf: 'center',
  },
  form: {
    marginTop: isIphoneX() ? hp(-1) : hp(-3),
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: 'green',
  },
  forgotPassword: {
    marginTop: hp(3),
  },
  signup: {
    marginTop: hp(4.5),
  },
};

const logo = require('../../../assets/images/sembly.png');
const backgroundPhoto = require('../../../assets/images/loginViewBackground.png');

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.backgroundContainer}>
          <Image
            source={backgroundPhoto}
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
              position: 'absolute',
              marginTop: isIphoneX() ? hp(10) : hp(9),
            }}
          />
          <Image
            source={logo}
            style={{
              position: 'absolute',
              marginTop: isIphoneX() ? hp(13) : hp(14),
            }}
          />
        </View>
        <KeyboardAwareScrollView style={styles.mainContainer}>
          <View>
            <Text style={styles.discoverCity}>
              Discover your city
            </Text>
            <Text style={styles.semblyIs}>
              Sembly is a crowdsourced city discovery platform.
            </Text>
          </View>
          <View accessibilityIgnoresInvertColors style={styles.form}>
            <LoginForm
              emailChanged={value => this.setState({ email: value })}
              passwordChanged={value => this.setState({ password: value })}
            />
          </View>
          <View style={{ marginTop: isIphoneX() ? hp(2) : hp(2) }}>
            <SemblyButton
              label="Login"
              onPress={() => this.props.navigation.navigate('MainApp')}
              width={isIphoneX() ? wp(75) : wp(69)}
            />
          </View>
          <View>
            <TouchableOpacity
              accessibilityIgnoresInvertColors
              onPress={() => this.props.navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
            >
              <Text
                style={{
                  color: '#97979B',
                  textAlign: 'center',
                  fontSize: wp(4.2),
                  fontFamily: Theme.fonts.bold,
                }}
              >
                Forgot your password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityIgnoresInvertColors
              onPress={() => this.props.navigation.navigate('Signup')}
              style={styles.signup}
            >
              <Text
                style={{
                  color: '#26315F',
                  textAlign: 'center',
                  alignSelf: 'center',
                  fontSize: wp(4.4),
                  fontFamily: Theme.fonts.bold,
                }}
              >
                Don't have an account?
                <Text style={{ color: '#F93963' }}>
                  {' '}
                  Sign up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

LoginView.defaultProps = {};

LoginView.propTypes = {};

const mapStateToProps = (state, ownProps) => {};

const mapDispatchToProps = dispatch => ({});

export default LoginView;
