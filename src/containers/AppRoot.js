import React from 'react';
import { StatusBar, Platform, Text } from 'react-native';
import _ from 'underscore';

import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';

import ThemeContainer from '../styles/themeContainer';

import { LoginView, SignupView } from './Welcome';

// Main application navigation
const WelcomeStack = createStackNavigator({
  Main: { 
    screen: LoginView,
    navigationOptions: { header: null }
  },
  Signup: {
    screen: SignupView,
    navigationOptions: { header: null }
  }
}, {
  headerMode: 'none',
});

// Switches between the Login, Onboarding & Main Application


const RootSwitchNavigation = createSwitchNavigator ({
  Root: WelcomeStack,
});

/*
* Root of the Application
*/

class AppRoot extends React.PureComponent {
  componentWillMount() {
    
  }

  render() {
    return (
        <ThemeContainer theme={'default'}>
          <StatusBar barStyle={'default'} />   
          <RootSwitchNavigation ref={nav => { this.navigator = nav; }} />
        </ThemeContainer>
    );
  }
}

AppRoot.propTypes = {

};

AppRoot.defaultProps = {

};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = dispatch => ({
});
/*
export default class LoginView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
        </View>

      </View>
    );
  }
}
*/
export default connect(mapStateToProps, mapDispatchToProps)(createAppContainer(RootSwitchNavigation));
