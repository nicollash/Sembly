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
    border: 1, borderWidth: 5, borderColor: 'blue',
    flex: 0.3,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    headline: {
      alignSelf: 'center',
      width: '85%',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      caret: {
      },
      title: {
        fontSize: 35,
        color: '#26315F',
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: Theme.fonts.black,
      },
    },
    desc: {
      textAlign: 'center',
      flex: 1,
      marginHorizontal: 20,
      color: '#96969A',
      fontSize: 18,
      fontFamily: Theme.fonts.bold,
    },
  },
  form: {
    flex: 0.35,
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
    flex: 0.3,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 22,
  },
  submit: {
  },
};


class ForgotPasswordView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar barStyle="dark-content" />

        <View style={styles.headerContainer}>

          {/* blank bar to add spacing */}
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

              <View style={styles.textbox.headline}>
                <View>
                  <SemblyBackCaret style={styles.textbox.headline.caret} onPress={() => this.props.navigation.goBack()} />
                </View>

                {/* Blank white block to add spacing */}
                <View style={{
                  backgroundColor: 'white',
                  flex: 0.35,
                }}
                />

                <Text style={styles.textbox.headline.title}>Lost Something?</Text>
              </View>

              <Text style={styles.textbox.desc}>
                Did you forget your password? Enter
                {'\n'}
                your registration email and we’ll send you
                {'\n'}
                a link to set a new one.
              </Text>
            </View>

            <KeyboardAvoidingView
              behavior="padding"
              accessibilityIgnoresInvertColors
              style={styles.form}
            >
              {/* cache submit button et remplace par text vert (comme dans sketch) */}
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

            <View style={styles.footer}>
             

              <TouchableOpacity style={styles.submit}>
              </TouchableOpacity>
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
