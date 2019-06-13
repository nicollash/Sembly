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
  header: {
    backgroundColor: '#FFF9BB',
    alignSelf: 'stretch',
    flex: 1
  },
  container: {
    backgroundColor: '#D8C34A',
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
  },
  whiteContainer: {
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50
  },
  title: {
    marginTop: 10,
    fontSize: 35,
    color: '#26315F',
    fontFamily: Theme.fonts.black,
  },
  desc: {
    textAlign: 'center',
    marginTop: 15,
    marginHorizontal: 20,
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

        <View style={styles.header} />

        <View>
          <Image source={require('../../../assets/images/loginViewBackground.png')}/>
        </View>

        <View style={styles.whiteContainer}>

          <View>
            <Text style={styles.title}>Discover your city</Text>
          </View>

          <View>
            <Text style={styles.desc}>
                Sembly is a crowdsourced city discovery platform.
            </Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <LoginForm actionOnPress={() => this.props.navigation.navigate('MainApp')} />
          </View>

          <TouchableOpacity>
            <Text style={{
              color: '#97979B',
              marginTop: 30,
              textAlign: 'center',
              fontFamily: Theme.fonts.bold,
            }}
            >
            Forgot your password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity accessibilityIgnoresInvertColors onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={{
              color: '#26315F',
              alignItems: 'baseline',
              marginTop: 40,
              textAlign: 'center',
              fontFamily: Theme.fonts.bold,
            }}
            >
            Don't have an account?
              <Text style={{ color: '#F93963' }}> Sign up</Text>
            </Text>
          </TouchableOpacity>

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