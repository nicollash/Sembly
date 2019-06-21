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
} from '../../components';

import Theme from '../../styles/theme';
import SemblyBackCaret from '../../components/SemblyBackCaret';

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
  whiteContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  textbox: {
    flex: 0.35,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    headline: {
      // border: 1, borderWidth: 2, borderColor: 'black',
      // alignSelf: 'center',
      width: '100%',
      // flex: 1,
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      // flexWrap: 'wrap',
      caret: {
        // border: 1, borderWidth: 2, borderColor: 'red',
        marginRight: 25,
        marginLeft: 35,
        // alignSelf: 'center',
      },
      title: {
        // border: 1, borderWidth: 2, borderColor: 'purple',
        fontSize: 35,
        color: '#26315F',
        fontFamily: Theme.fonts.black,
      },
    },
    desc: {
      textAlign: 'center',
      lineHeight: 25,
      flex: 0.7,
      marginHorizontal: 20,
      color: '#96969A',
      fontSize: 18,
      fontFamily: Theme.fonts.bold,
    },
  },
  form: {
    flex: 0.15,
    marginTop: 10,
    alignSelf: 'center',
    width: '80%',
    justifyContent: 'flex-start',
    email: {
      color: '#C7CAD1',
      fontSize: 14,
      borderBottomWidth: 0.5,
      borderBottomColor: '#D8D8D8',
      alignSelf: 'auto',
    },
    emailInput: {
      width: '100%',
      paddingTop: 15,
      fontSize: 18,
      color: '#C7CAD1',
      borderBottomWidth: 0.5,
      borderBottomColor: '#D8D8D8',
      alignSelf: 'center',
    },
  },
  footer: {
    flex: 0.5,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 22,
  },
  footline: {
    flex: 0.22,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bottomline: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
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

  handleClick = () => {
    this.setState({
      submitted: true,
      isHidden: true,
    });
  }

  setInput = (txt) => {
    this.setState({
      email: {txt},
    });
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
          <View style={styles.whiteContainer}>
            <View style={styles.textbox}>
              <View style={{
                flex: 0.285,
              }}
              />
              <View style={styles.textbox.headline}>
                <View style={styles.textbox.headline.caret}> 
                  <SemblyBackCaret onPress={() => this.props.navigation.goBack()} />
                </View>

                <View style={{
                  flex: 0.05,
                }}
                />

                <Text style={styles.textbox.headline.title}>Lost Something?</Text>
              </View>

              <View style={{
                flex: 0.075,
              }}
              />

              <Text style={styles.textbox.desc}>
                Did you forget your password? Enter
                {'\n'}
                your registration email and we’ll send you
                {'\n'}
                a link to set a new one.
              </Text>
            </View>


            <View style={{
              flex: 0.02,
            }}
            />
            <View style={styles.form}>
              {!this.state.isHidden 
                && (
                  <KeyboardAvoidingView
                    hide="true"
                    behavior="padding"
                    accessibilityIgnoresInvertColors
                    // style={styles.form}
                  >
                    <Text style={styles.form.email}>EMAIL</Text>
                    <TextInput
                      style={styles.form.emailInput}
                      placeholder="your@email.com"
                      returnKeyType="next"
                      onSubmitEditing={() => this.passwordInput.focus()}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </KeyboardAvoidingView>
                )}
            </View>
            <View style={styles.footer}>

              <View style={{
                flex: 0.07,
              }}
              />

              <View style={styles.footline}>
                {!this.state.submitted
                && (
                  <SemblyButton
                    label="Submit"
                    onPress={() => this.handleClick()}
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
          </View>
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
