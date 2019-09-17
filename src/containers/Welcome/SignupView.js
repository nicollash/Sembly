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
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'react-native-firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import {
  SemblyButton,
  LoginForm,
} from '../../components';

import Theme from '../../styles/theme';
import SemblyBackCaret from '../../components/SemblyBackCaret';
import { handleSignup, clearLoginErrors, clearSignupErrors } from '../../actions';

console.disableYellowBox = true;

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
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.props.clearLoginErrors();
    this.props.clearSignupErrors();
    
    this.setState({ email: '', password: '' });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.currentUser !== undefined && prevProps.currentUser === undefined) {
  //     this.props.navigation.navigate('Onboarding');
  //   }
  // }

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
            <View style={{ marginTop: hp(2) }}>
              <SemblyButton
                width={isIphoneX() ? wp(76) : wp(69)}
                onPress={() => {
                  this.props.handleSignup(this.state.email, this.state.password, this.state.password.split('@')[0]);
                  this.props.navigation.navigate('Onboarding');
                }}
                label="Signup"
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
              <TouchableOpacity style={{ marginTop: hp(1) }}>
                <Image source={fbConnect} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

SignupView.defaultProps = {
  onPress: null,
};

SignupView.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
  currentUser: state.user.currentUser,
  signupError: state.user.signupError,
});

const mapDispatchToProps = dispatch => ({
  handleSignup: (a, b, c) => dispatch(handleSignup(a, b, c)),
  clearLoginErrors: () => dispatch(clearLoginErrors()),
  clearSignupErrors: () => dispatch(clearSignupErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupView);
 