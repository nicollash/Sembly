import React, { Component } from 'react';

import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  View,
  Image,
  StatusBar,
  Text,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
 handleLogin, updateLocation, clearLoginErrors, clearSignupErrors 
} from '../../actions';
import { isIphoneX } from '../../styles/iphoneModelCheck';
import { SemblyButton, LoginForm } from '../../components';
import Theme from '../../styles/theme';

const imageHeight = 44;
const styles = {
  container: {
    height: hp(110),
    width: wp(100),
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    backgroundColor: '#FFF9BB',
    height: isIphoneX() ? hp(imageHeight) : hp(imageHeight + 2),
    alignItems: 'center',
    marginTop: !isIphoneX() ? hp(-3) : 0,
    width: '100%',
  },
  mainContainer: {
    height: isIphoneX() ? hp(100 - imageHeight) : hp(100 - (imageHeight - 2)),
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
    marginLeft: 30,
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'center',
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
      spinnerActive: false,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.clearSignupErrors();
    this.props.clearLoginErrors();

    this.setState({ email: '', password: '' });
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.props.navigation.navigate('MainApp');
  //     } return;
  //   });
  // }

  handleSpinner = () => {
    this.setState({ spinnerActive: true });
    setTimeout(() => {
      this.setState({ spinnerActive: false });
    }, 2000);
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.container} enableOnAndroid>
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
        <View style={styles.mainContainer}>
          <Text style={styles.discoverCity}>
            Discover your city
          </Text>
          <Text style={styles.semblyIs}>
            Sembly is a crowdsourced city discovery platform.
          </Text>
          {this.props.loginError !== undefined && (
            <Text style={{
              color: '#ff0000', alignSelf: 'center', marginTop: 10, textAlign: 'center',
            }}
            >
              {this.props.loginError}
            </Text>
          )}
          <View accessibilityIgnoresInvertColors style={styles.form}>
            <LoginForm
              emailChanged={value => this.setState({ email: value })}
              passwordChanged={value => this.setState({ password: value })}
            />
          </View>
          <View style={{ marginTop: isIphoneX() ? hp(2) : hp(2) }}>
            <SemblyButton
              label="Login"
              onPress={() => {
                this.props.handleLogin(this.state.email, this.state.password);
                this.handleSpinner();
              }}
              width={isIphoneX() ? wp(75) : wp(69)}
              height={wp(13)}
              loading={this.state.spinnerActive}
            />
          </View>
          <TouchableOpacity
            accessibilityIgnoresInvertColors
            onPress={() => this.props.navigation.navigate('ForgotPassword')}
            style={{ marginTop: hp(3) }}
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
            style={{ marginTop: hp(4.5) }}
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
              Don
              {'\''}
              t have an account?
              <Text style={{ color: '#F93963' }}>
                {' '}
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

LoginView.defaultProps = {};

LoginView.propTypes = {};

const mapStateToProps = (state, ownProps) => ({
  loginError: state.user.loginError,
});

const mapDispatchToProps = dispatch => ({
  handleLogin: (a, b) => dispatch(handleLogin(a, b)),
  clearLoginErrors: () => dispatch(clearLoginErrors()),
  clearSignupErrors: () => dispatch(clearSignupErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
