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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  textbox: {
    flex: 0.285,
    top: '2.5%',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headline: {
    marginBottom: 7,
    marginTop: 25,
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  caret: {
    marginLeft: 30,
    marginRight: 25,
  },
  title: {
    flex: 1,
    fontSize: 35,
    color: '#26315F',
    fontFamily: Theme.fonts.black,
  },
  desc: {
    textAlign: 'center',
    lineHeight: 25,
    marginHorizontal: 20,
    color: '#96969A',
    fontSize: 18,
    fontFamily: Theme.fonts.bold,
  },
  form: {
    flex: 0.475,
    top: '2%',
    alignSelf: 'center',
    width: '85%',
    justifyContent: 'flex-end',
  },
  footer: {
    top: '12%',
    height: '20%',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};


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
            style={styles.whiteContainer}
          >
            <View style={{
              flex: 0.012,
            }}
            />
            <View style={styles.textbox}>

              <View style={{
                flex: 0.24,
              }}
              />

              <View style={styles.headline}>
                <View style={styles.caret}>
                  <SemblyBackCaret onPress={() => this.props.navigation.goBack()} />
                </View>

                <Text style={styles.title}>Welcome aboard.</Text>
              </View>

              <Text style={styles.desc}>
                  Fill-in the informations below and you'll 
                {'\n'}
                  be ready to explore your city in a second.
              </Text>
            </View>

            <View
              accessibilityIgnoresInvertColors
              style={styles.form}
            >
              <LoginForm
                actionLabel="Signup" 
                actionOnPress={() => this.props.navigation.navigate('Onboarding')} 
                emailChanged={(value) => this.setEmail(value)}
                passwordChanged={(value) => this.setPassword(value)}
              />
            </View>

            <View style={styles.footer}>
              <Text style={{
                // flex: 0.25,
                color: '#96969A',
                fontSize: 14,
                fontFamily: Theme.fonts.bold,
              }}
              >
                - or -
              </Text>

              <TouchableOpacity>
                <Image source={require('../../../assets/images/FacebookButton.png')} />
              </TouchableOpacity>
            </View>

          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}

// this.props.navigation.navigate('Onboarding')

SignupView.defaultProps = {
  onPress: null,
};

SignupView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SignupView;
