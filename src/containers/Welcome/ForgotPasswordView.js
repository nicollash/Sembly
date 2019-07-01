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
    flex: 1,
    backgroundColor: 'blue',
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
    order: 2,
    flex: 0.9,
  },
  underwhite: {
    backgroundColor: '#D8C34A',
    flex: 0.575,
    alignSelf: 'stretch',
  },
  contentContainer: {
    alignItems: 'center',
  },
  whiteContainer: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  textbox: {
    marginTop: '7.5%',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headline: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  caret: {
    marginRight: 25,
    marginLeft: 35,
  },
  title: {
    fontSize: 35,
    color: '#26315F',
    fontFamily: Theme.fonts.black,
  },
  desc: {
    top: '7%',
    textAlign: 'center',
    lineHeight: 25,
    marginHorizontal: 20,
    color: '#96969A',
    fontSize: 18,
    fontFamily: Theme.fonts.bold,
  },
  form: {
    top: '5%',
    alignSelf: 'center',
    width: '86.5%',
    justifyContent: 'flex-start',
  },
  emailInput: {
    paddingHorizontal: '4%',
    paddingTop: '10%',
    paddingBottom: '1.5%',
  },
  footer: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  footline: {
    top: '122%',
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomline: {
    top: '20%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenMsg: {
    color: '#188A0D',
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
  },
  checkmark: {
    marginLeft: 7,
  },
};


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

  setEmail = (email) => {
    this.setState({ email });
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
            style={styles.whiteContainer}
          >
            <View style={styles.textbox}>
              <View style={styles.headline}>
                <View style={styles.caret}>
                  <SemblyBackCaret onPress={() => this.props.navigation.goBack()} />
                </View>
                <Text style={styles.title}>Lost Something?</Text>
              </View>
              <Text style={styles.desc}>
                Did you forget your password? Enter
                {'\n'}
                your registration email and we’ll send you
                {'\n'}
                a link to set a new one.
              </Text>
            </View>
            <View style={styles.form}>
              {!this.state.isHidden 
                && (
                  <View
                    accessibilityIgnoresInvertColors
                  >
                    <SemblyInput
                      label="EMAIL"
                      returnKey="done"
                      valueChanged={(str) => this.setEmail(str)}
                      keyboardType="email-address"
                      placeholder="your@email.com"
                    />
                  </View>
                )}
              {this.state.isHidden 
                && (
                  <View
                    accessibilityIgnoresInvertColors
                    style={styles.emailInput}
                  />
                )}
            </View>
            <View style={styles.footer}>

              <View style={styles.footline}>
                {!this.state.submitted
                && (
                  <SemblyButton
                    label="Submit"
                    onPress={() => this.setState({submitted: true, isHidden: true})}
                  />
                )}
                {this.state.submitted
                && (
                  <View style={styles.bottomline}>
                    <Text style={styles.greenMsg}>
                      Check your emails for reset instructions
                    </Text>
                    <Image style={styles.checkmark} 
                      source={require('../../../assets/images/GreenCheckmark.png')} />
                  </View>
                )}
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
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
