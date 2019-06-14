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
    flex: 0.4,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    alignSelf: 'stretch',
    order: 2,
    flex: 0.95,
  },
  underwhite: {
    border: 1, borderWidth: 2, borderColor: 'blue',
    backgroundColor: '#D8C34A',
    flex: 0.6,
    alignSelf: 'stretch',
  },
  whiteContainer: {
    border: 1, borderWidth: 2, borderColor: 'yellow',
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderRadius: 10,
  },
  textbox: {
    border: 1, borderWidth: 2, borderColor: 'red',
    flex: 0.25,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-start',
    headline: {
      border: 1, borderWidth: 2, borderColor: 'blue',
      alignSelf: 'center',
      width: '90%',
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
    border: 1, borderWidth: 2, borderColor: 'green',
    flex: 0.5,
    alignSelf: 'center',
    width: '90%',
    justifyContent: 'flex-end',
  },
  footer: {
    border: 1, borderWidth: 2, borderColor: 'violet',
    flex: 0.25,
    alignSelf: 'stretch',
  },
};


class SignupView extends React.Component {
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
            flex: 0.05,
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

                <Text style={styles.textbox.headline.title}>Welcome aboard.</Text>
              </View>

              <Text style={styles.textbox.desc}>
                  Fill-in the informations below and you'll 
                {'\n'}
                  be ready to explore your city in a second.
              </Text>
            </View>

            <KeyboardAvoidingView
              behavior="padding"
              accessibilityIgnoresInvertColors
              style={styles.form}
            >
              <LoginForm actionLabel="Signup" actionOnPress={() => this.props.navigation.navigate('Onboarding')} />
            </KeyboardAvoidingView>

            <View style={styles.footer}>

            </View>

          </View>
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
