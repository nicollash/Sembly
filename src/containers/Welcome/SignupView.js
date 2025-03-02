import React from 'react';

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
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import firebase from 'react-native-firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import {
  SemblyButton,
  LoginForm,
} from '../../components';

import Theme from '../../styles/theme';
import SemblyBackCaret from '../../components/SemblyBackCaret';
import { handleSignup, clearLoginErrors, clearSignupErrors, setPreviousScreen, facebookLogin } from '../../actions';

console.disableYellowBox = true;

const imageHeight = 44;
const styles = {
  container: {
    height: hp(100),
    width: wp(100),
    backgroundColor: '#fff',
  },
  backgroundContainer: {
    backgroundColor: '#FFF9BB',
    height: isIphoneX() ? hp(imageHeight) : hp(imageHeight + 2),
    alignItems: 'center',
    marginTop: !isIphoneX() ? hp(-3) : 0,
    width: wp(100),
  },
  mainContainer: {
    height: isIphoneX() ? hp(100 - imageHeight) : hp(100 - (imageHeight - 2)),
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderTopRightRadius: hp(2),
    borderTopLeftRadius: hp(2),
  },
  title: {
    marginBottom: 7,
    marginTop: isIphoneX() ? hp(3.5) : hp(2.5),
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  caret: {
    marginLeft: 30,
    marginRight: 25,
  },
  welcome: {
    fontSize: wp(8),
    color: '#26315F',
    fontFamily: Theme.fonts.black,
  },
  description: {
    textAlign: 'center',
    lineHeight: wp(6),
    marginHorizontal: 20,
    color: '#96969A',
    fontSize: wp(4.5),
    fontFamily: Theme.fonts.bold,
    alignSelf: 'center',
  },
  form: {
    marginTop: !isIphoneX() ? hp(-2) : 0,
    marginLeft: 26,
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'flex-end',
  },
  footer: {
    marginTop: hp(1),
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spinnerContainer: {
    paddingVertical: hp(1.55),
    borderRadius: hp(4),
    alignSelf: 'center',
    width: isIphoneX() ? wp(76) : wp(69),
    backgroundColor: '#F7567C',
  },
};

const logo = require('../../../assets/images/sembly.png');
const backgroundPhoto = require('../../../assets/images/loginViewBackground.png');
const fbConnect = require('../../../assets/images/FacebookButton.png');

class SignupView extends React.Component {
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
    this.props.clearLoginErrors();
    this.props.clearSignupErrors();
    this.props.setPreviousScreen('SignupView');
    
    this.setState({ email: '', password: '' });
  }

  componentWillUnmount() {
    this.props.setPreviousScreen(undefined);
  }

  handleSpinner = () => {
    this.setState({ spinnerActive: true });
    setTimeout(() => {
      this.setState({ spinnerActive: false });
    }, 4000);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ alignItems: 'center', paddingBottom: this.props.signupError ? 40 : 0 }}
        style={styles.container}
        enableOnAndroid
      >
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
          <View>
            <View>
              <View style={styles.title}>
                <View style={styles.caret}>
                  <SemblyBackCaret onPress={() => this.props.navigation.goBack()} />
                </View>
                <Text style={styles.welcome}>
                  Welcome aboard.
                </Text>
              </View>
              <Text style={styles.description}>
                Fill-in the informations below and you'll
                {'\n'}
                be ready to explore your city in a second.
              </Text>
            </View>
            {this.props.signupError !== undefined && (
              <Text style={{ color: '#ff0000', alignSelf: 'center', marginTop: 10, textAlign: 'center' }}>
                {this.props.signupError}
              </Text>
            )}
            <View
              accessibilityIgnoresInvertColors
              style={styles.form}
            >
              <LoginForm
                emailChanged={value => this.setState({ email: value })}
                passwordChanged={value => this.setState({ password: value })}
              />
            </View>
            <View style={{ marginTop: isIphoneX() ? hp(2) : hp(2) }}>
              <SemblyButton
                width={isIphoneX() ? wp(76) : wp(69)}
                onPress={() => {
                  this.props.handleSignup(this.state.email, this.state.password);
                  this.handleSpinner();
                  setTimeout(() => {
                    this.props.signupError
                      ? this.setState({ spinnerActive: false }) && this.props.clearSignupErrors
                      : this.props.navigation.navigate('Profile');
                  }, 1000);
                }}
                label="Signup"
                loading={this.state.spinnerActive}
              />
            </View>
            <View style={styles.footer}>
              <Text style={{
                color: '#96969A',
                fontSize: wp(3.4),
                fontFamily: Theme.fonts.bold,
              }}
              >
                - or -
              </Text>
              <TouchableOpacity
                style={{ marginTop: hp(1) }}
                onPress={() => this.props.facebookLogin()}
              >
                <Image source={fbConnect} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

SignupView.defaultProps = {
  onPress: null,
};

SignupView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  signupError: state.user.signupError,
});

const mapDispatchToProps = dispatch => ({
  handleSignup: (_email, _password) => dispatch(handleSignup({ _email, _password })),
  clearLoginErrors: () => dispatch(clearLoginErrors()),
  clearSignupErrors: () => dispatch(clearSignupErrors()),
  setPreviousScreen: screen => dispatch(setPreviousScreen(screen)),
  facebookLogin: () => dispatch(facebookLogin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupView);
 