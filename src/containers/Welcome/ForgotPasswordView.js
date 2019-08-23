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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isIphoneX } from '../../styles/iphoneModelCheck';

import {
  SemblyButton,
  LoginForm,
  SemblyInput,
} from '../../components';

import Theme from '../../styles/theme';
import SemblyBackCaret from '../../components/SemblyBackCaret';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  contentContainer: {
    alignItems: 'center',
  },
  whiteContainer: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  title: {
    marginTop: isIphoneX() ? hp(3.5) : hp(2.5),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  caret: {
    marginRight: 25,
    marginLeft: 35,
  },
  lostSomething: {
    fontSize: wp(8),
    color: '#26315F',
    fontFamily: Theme.fonts.black,
  },
  description: {
    top: '7%',
    textAlign: 'center',
    lineHeight: wp(6),
    marginHorizontal: 20,
    color: '#96969A',
    fontSize: wp(4.4),
    fontFamily: Theme.fonts.bold,
  },
  form: {
    marginTop: hp(3),
    alignSelf: 'center',
    width: '86.5%',
    justifyContent: 'flex-start',
  },
  emailInput: {
    paddingHorizontal: '4%',
    paddingTop: '10%',
    paddingBottom: '1.5%',
  },
  greenMsg: {
    color: '#188A0D',
    fontSize: wp(4),
    fontFamily: Theme.fonts.bold,
  },
  checkmark: {
    marginLeft: 7,
  },
};

const logo = require('../../../assets/images/sembly.png');
const backgroundPhoto = require('../../../assets/images/loginViewBackground.png');
const greenCheckmark = require('../../../assets/images/GreenCheckmark.png');

class ForgotPasswordView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      isHidden: false,
      email: '',
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    const { submitted, isHidden } = this.state;

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
                <Text style={styles.lostSomething}>
                  Lost Something?
                </Text>
              </View>
              <Text style={styles.description}>
                Did you forget your password? Enter
                {'\n'}
                your registration email and we’ll send you
                {'\n'}
                a link to set a new one.
              </Text>
            </View>
            <View style={styles.form}>
              {!isHidden
                && (
                  <View
                    accessibilityIgnoresInvertColors
                  >
                    <SemblyInput
                      label="EMAIL"
                      returnKey="done"
                      valueChanged={value => this.setState({ email: value })}
                      keyboardType="email-address"
                      placeholder="your@email.com"
                    />
                  </View>
                )}
              {isHidden
                && (
                  <View
                    accessibilityIgnoresInvertColors
                    style={styles.emailInput}
                  />
                )}
            </View>
            <View>
              <View style={{ marginTop: hp(6) }}>
                {!submitted
                && (
                  <SemblyButton
                    label="Submit"
                    width={isIphoneX() ? wp(76) : wp(69)}
                    onPress={() => this.setState({ submitted: true, isHidden: true })}
                  />
                )}
                {submitted
                && (
                  <View style={{ flexDirection: 'row', alignSelf: 'center', position: 'absolute', top: hp(6) }}>
                    <Text style={styles.greenMsg}>
                      Check your emails for reset instructions
                    </Text>
                    <Image
                      style={styles.checkmark}
                      source={greenCheckmark}
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

// this.props.navigation.navigate('Onboarding')

ForgotPasswordView.defaultProps = {
  onPress: null,
};

ForgotPasswordView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default ForgotPasswordView;
