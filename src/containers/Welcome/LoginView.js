import React, { Component } from 'react';

import { StyleSheet, 
         View, 
         Image,
         TextInput, 
         TouchableOpacity, 
         Text, 
         fontSize,
         fontFamily,
         KeyboardAvoidingView
        } from 'react-native';

import { connect } from 'react-redux';

import Theme from '../../styles/theme';

import { 
    SemblyButton,
    LoginForm
} from '../../components';


const styles = {
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoContainer: {
  },
  logo: {
  },
  title: {
    marginTop: 35,
    fontSize: 35,
    color: '#26315F',
    fontFamily: Theme.fonts.black,
  },
  sub: {
    textAlign: 'center',
    marginTop: 15,
    marginRight: 20,
    fontSize: 18,
    color: '#96969A',
    fontFamily: Theme.fonts.bold,
  }
};


class LoginView extends React.Component {
  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
    return (
        <KeyboardAvoidingView behavior="padding" accessibilityIgnoresInvertColors style={styles.container}>
          <View style={styles.logoContainer}>
            <Image 
              style={styles.logo}
              source={require('../../../assets/images/loginViewBackground.png')}
              />    
          </View>
          <View>
            <Text style={styles.title}>Discover your city</Text>
          </View>
          <View>
            <Text style={styles.sub}>
              Sembly is a crowdsourced city discovery platform.
            </Text>
          </View>
          <View style={{marginTop: 5}}>
            <LoginForm />
          </View>
        </KeyboardAvoidingView>
    );
  }
}


LoginView.defaultProps = {
};

LoginView.propTypes = {
};


const mapStateToProps = (state, ownProps) => {
};

const mapDispatchToProps = dispatch => ({

});


export default LoginView;