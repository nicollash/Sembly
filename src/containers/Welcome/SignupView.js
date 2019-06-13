import React from 'react';

import { connect } from 'react-redux';

import {
  View,
  StyleSheet,
  TextInput,
  Image,
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

const styles = {
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFF9BB',
    alignSelf: 'stretch',
    flex: 0.05,
    justifyContent: 'flex-end',
  },
  whiteContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textbox: {
    flex: 0.97,
    justifyContent: 'flex-start',

  },
  title: {
    fontSize: 35,
    color: '#26315F',
    textAlign: 'center',
    fontFamily: Theme.fonts.black,
  },
  desc: {
    justifyContent: 'flex-end',
    textAlign: 'center',
    marginHorizontal: 20,
    color: '#96969A',
    fontSize: 18,
    fontFamily: Theme.fonts.bold,
  },
};


class SignupView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" accessibilityIgnoresInvertColors style={styles.container}>

        <View style={styles.header} />

        <View>
          <Image source={require('../../../assets/images/loginViewBackground.png')}/>
        </View>

        <View style={styles.whiteContainer}>

          <View style={styles.textbox}>

            <Text style={styles.title}>
              Welcome aboard.
            </Text>

            <View style={{ backgroundColor: 'white', flex: 0.05 }} />

            <Text style={styles.desc}>
                Fill-in the informations below and you'll be ready to explore your city in a second.
            </Text>
            
            <View style={{ marginTop: 5 }}>
              <LoginForm actionOnPress={() => this.props.navigation.navigate('MainApp')} />
            </View>

          </View>

 


        </View>

      </KeyboardAvoidingView>
    );
  }
}

// this.props.navigation.navigate('Onboarding')

SignupView.defaultProps = {
};

SignupView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});

export default SignupView;
